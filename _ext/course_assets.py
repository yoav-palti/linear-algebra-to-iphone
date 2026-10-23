"""Avoid duplicate Thebe declarations in Jupyter Book 1 / Sphinx 7 HTML."""


def deduplicate_thebe_config(app, pagename, templatename, context, doctree):
    scripts = context.get("script_files", [])
    seen = set()
    filtered = []
    for script in scripts:
        body = getattr(script, "attributes", {}).get("body", "")
        if not getattr(script, "filename", None) and body.startswith("const THEBE_JS_URL"):
            if body in seen:
                continue
            seen.add(body)
        filtered.append(script)
    scripts[:] = filtered


def setup(app):
    app.connect("html-page-context", deduplicate_thebe_config, priority=999)
    return {"parallel_read_safe": True, "parallel_write_safe": True}
