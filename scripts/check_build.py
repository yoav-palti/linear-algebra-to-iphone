"""Check the built course's local files, anchors, images and executed notebooks.

Browser checks remain necessary; see BUILD_CHECKLIST.md.
"""

import argparse
import hashlib
import json
import re
import shutil
import subprocess
import xml.etree.ElementTree as ET
from pathlib import Path
from urllib.parse import unquote, urlsplit

import yaml
from bs4 import BeautifulSoup
from PIL import Image


def source_manifest(source):
    toc = yaml.safe_load((source / "_toc.yml").read_text(encoding="utf-8"))
    names = [toc["root"]] + [c["file"] for part in toc["parts"] for c in part["chapters"]]
    paths = {source / p for p in ("_config.yml", "_toc.yml", "requirements.txt")}
    paths.update((source / "_ext").glob("*.py"))
    paths.update(p for p in (source / "_static").rglob("*") if p.is_file())
    for name in names:
        paths.update(p for suffix in (".md", ".ipynb") if (p := source / (name + suffix)).is_file())
    pending = list(paths)
    while pending:
        path = pending.pop()
        if path.suffix not in (".md", ".html"):
            continue
        for name in re.findall(r"^:file:\s*(.+)$", path.read_text(encoding="utf-8"), re.MULTILINE):
            included = (path.parent / name.strip()).resolve()
            if included not in paths:
                paths.add(included)
                pending.append(included)
    return {p.relative_to(source).as_posix(): hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted(paths)}


def check_build(root, source, check_js=False):
    toc = yaml.safe_load((source / "_toc.yml").read_text(encoding="utf-8"))
    chapters = [toc["root"]] + [
        chapter["file"] for part in toc["parts"] for chapter in part["chapters"]
    ]
    parsed = {}
    for page in root.rglob("*.html"):
        if not {"_static", "reports"}.intersection(page.relative_to(root).parts):
            parsed[page] = BeautifulSoup(page.read_text(encoding="utf-8"), "html.parser")

    failures, frames, notebooks = [], [], []
    javascript = {}
    images = set()
    reference_count = 0
    for name in chapters:
        page = root / (name + ".html")
        soup = parsed.get(page)
        if soup is None:
            failures.append(f"{name}: missing HTML page")
            continue
        if not soup.select_one("article h1"):
            failures.append(f"{name}: missing article heading")
        if len([s for s in soup.find_all("script") if "const THEBE_JS_URL" in s.text]) > 1:
            failures.append(f"{name}: duplicate Thebe configuration")
        if check_js:
            for number, script in enumerate(soup.find_all("script")):
                script_type = script.get("type", "")
                if script_type not in ("", "text/javascript", "application/javascript", "module"):
                    continue
                url = urlsplit(script.get("src", ""))
                if script.get("src"):
                    if url.scheme or url.netloc:
                        continue
                    path = (page.parent / unquote(url.path)).resolve()
                    if not path.is_file():
                        continue
                    body = path.read_text(encoding="utf-8")
                else:
                    body = script.string or script.get_text()
                javascript.setdefault((script_type == "module", body), f"{name}: script {number}")
        for element in soup.find_all(["a", "img", "script", "link", "iframe", "audio", "source", "video"]):
            value = element.get("href", element.get("src", ""))
            url = urlsplit(value)
            if element.name == "iframe":
                frames.append({"page": name, "url": value})
            if url.scheme or url.netloc:
                continue
            if not url.path:
                target = page
            elif url.path.startswith("/"):
                target = root / unquote(url.path).lstrip("/")
            else:
                target = (page.parent / unquote(url.path)).resolve()
            if url.path:
                reference_count += 1
                if not target.is_file():
                    failures.append(f"{name}: missing local file {value}")
                    continue
            if url.fragment and target.suffix == ".html":
                destination = parsed.get(target)
                fragment = unquote(url.fragment)
                if destination is not None and not (
                    destination.find(id=fragment) or destination.find(attrs={"name": fragment})
                ):
                    failures.append(f"{name}: missing anchor {value}")
            if element.name == "img" and url.path:
                images.add(target)
        if (source / (name + ".ipynb")).exists():
            executed = root.parent / "jupyter_execute" / (name + ".ipynb")
            if not executed.is_file():
                failures.append(f"{name}: missing executed notebook")
                continue
            notebook = json.loads(executed.read_text(encoding="utf-8"))
            cells = [c for c in notebook["cells"] if c["cell_type"] == "code" and "".join(c["source"]).strip()]
            errors = [o for c in cells for o in c.get("outputs", []) if o["output_type"] == "error"]
            unexecuted = [i for i, c in enumerate(cells) if c.get("execution_count") is None]
            notebooks.append({"page": name, "code_cells": len(cells), "errors": len(errors), "unexecuted": unexecuted})
            if errors or unexecuted:
                failures.append(f"{name}: notebook errors or unexecuted cells")

    for image in images:
        if not image.is_file():
            continue  # Already reported as a missing reference.
        try:
            if image.suffix.lower() == ".svg":
                ET.parse(image)
            else:
                with Image.open(image) as opened:
                    opened.verify()
        except (OSError, ET.ParseError) as error:
            failures.append(f"{image.relative_to(root)}: invalid image: {error}")
    if not (root / "index.html").is_file() or not (root / "searchindex.js").is_file():
        failures.append("Missing landing page or search index")
    if check_js:
        node = shutil.which("node")
        if node is None:
            failures.append("Node.js is required for --check-js")
        else:
            for (module, body), label in javascript.items():
                command = [node, "--check"] + (["--input-type=module"] if module else [])
                checked = subprocess.run(command, input=body, text=True, encoding="utf-8",
                                         capture_output=True, timeout=30)
                if checked.returncode:
                    failures.append(f"{label}: JavaScript syntax error: {checked.stderr.strip()}")
    return {"chapters": chapters, "local_references": reference_count, "images": len(images),
            "notebooks": notebooks, "iframes": frames, "javascript_checked": len(javascript), "failures": failures}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("html_root", nargs="?", type=Path)
    parser.add_argument("--report", type=Path)
    parser.add_argument("--check-js", action="store_true", help="Syntax-check generated JavaScript using Node.js")
    parser.add_argument("--snapshot-source", type=Path, help="Record chapter, include, configuration and static-file hashes before building")
    parser.add_argument("--source-manifest", type=Path, help="Fail if build inputs changed since a pre-build snapshot")
    args = parser.parse_args()
    source = Path(__file__).resolve().parents[1]
    if args.snapshot_source:
        manifest = source_manifest(source)
        args.snapshot_source.parent.mkdir(parents=True, exist_ok=True)
        args.snapshot_source.write_text(json.dumps(manifest, indent=2), encoding="utf-8")
        print(f"Recorded {len(manifest)} source hashes")
        return 0
    if args.html_root is None:
        parser.error("html_root is required unless using --snapshot-source")
    root = args.html_root.resolve()
    if not root.is_dir():
        parser.error(f"HTML output directory does not exist: {root}")
    report = check_build(root, source, args.check_js)
    if args.source_manifest:
        recorded = json.loads(args.source_manifest.read_text(encoding="utf-8"))
        current = source_manifest(source)
        # Check recorded entries as well as newly included source files.
        changed = sorted(p for p in recorded.keys() | current.keys() if recorded.get(p) != current.get(p))
        report["changed_build_inputs"] = changed
        report["failures"].extend(f"Build input changed since snapshot: {p}" for p in changed)
    if args.report:
        args.report.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"{len(report['chapters'])} chapters; {report['local_references']} local references; "
          f"{report['images']} images; {len(report['notebooks'])} notebooks; {report['javascript_checked']} scripts; "
          f"{len(report['failures'])} failures")
    for failure in report["failures"]:
        print(f"FAIL: {failure}")
    return bool(report["failures"])


if __name__ == "__main__":
    raise SystemExit(main())
