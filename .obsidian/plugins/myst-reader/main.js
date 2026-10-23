/* MyST Reader | MIT License | Source: src/ */
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => MySTReader
});
module.exports = __toCommonJS(main_exports);
var import_obsidian4 = require("obsidian");

// src/myst.ts
var admonitions = {
  admonition: "note",
  note: "note",
  tip: "tip",
  hint: "tip",
  important: "important",
  warning: "warning",
  caution: "warning",
  attention: "warning",
  danger: "danger",
  error: "failure",
  seealso: "info",
  todo: "todo",
  topic: "info",
  sidebar: "info"
};
var DIRECTIVES = [
  ...Object.keys(admonitions),
  "dropdown",
  "math",
  "image",
  "figure",
  "code-block",
  "code",
  "code-cell",
  "list-table",
  "table",
  "rubric",
  "epigraph",
  "pull-quote",
  "raw"
];
var opening = /^ {0,3}(`{3,}|:{3,})\{([a-zA-Z][\w-]*)\}(?:[ \t]+(.*))?[ \t]*$/;
var fence = /^ {0,3}(`{3,}|~{3,})(.*)$/;
var has = (object, key) => Object.prototype.hasOwnProperty.call(object, key);
function isClose(line, marker) {
  const match = /^ {0,3}(`{3,}|:{3,}|~{3,})[ \t]*$/.exec(line);
  return !!match && match[1][0] === marker[0] && match[1].length >= marker.length;
}
function codeEnd(lines, start, marker) {
  for (let i = start + 1; i < lines.length; i++) {
    if (isClose(lines[i], marker)) return i;
  }
  return lines.length - 1;
}
function directiveEnd(lines, start, marker, depth) {
  if (depth > 32) return -1;
  for (let i = start + 1; i < lines.length; i++) {
    const line = lines[i];
    if (isClose(line, marker)) return i;
    const child = opening.exec(line);
    if (child) {
      const end = directiveEnd(lines, i, child[1], depth + 1);
      if (end < 0) return -1;
      i = end;
    } else {
      const code = fence.exec(line);
      if (code) i = codeEnd(lines, i, code[1]);
    }
  }
  return -1;
}
function parseContent(source) {
  const lines = source.replace(/\r\n?/g, "\n").split("\n");
  const options = /* @__PURE__ */ Object.create(null);
  let index = 0;
  while (index < lines.length) {
    const option = /^\s*:([\w-]+):(?:[ \t]*(.*))?$/.exec(lines[index]);
    if (!option) break;
    options[option[1]] = option[2] ?? "";
    index++;
  }
  if (lines[index]?.trim() === "") index++;
  return { options, body: lines.slice(index).join("\n") };
}
function parseDocument(source) {
  const lines = source.replace(/\r\n?/g, "\n").split("\n");
  const blocks = [];
  let text = [];
  const flush = () => {
    if (text.length) blocks.push({ kind: "text", raw: text.join("\n") });
    text = [];
  };
  let start = 0;
  if (lines[0] === "---") {
    const end = lines.findIndex((line, index) => index > 0 && /^(---|\.\.\.)$/.test(line));
    if (end >= 0) {
      text.push(...lines.slice(0, end + 1));
      start = end + 1;
    }
  }
  for (let i = start; i < lines.length; i++) {
    const line = lines[i];
    const match = opening.exec(line);
    if (match) {
      const end = directiveEnd(lines, i, match[1], 0);
      if (end < 0) {
        text.push(...lines.slice(i));
        break;
      }
      flush();
      blocks.push({
        kind: "directive",
        name: match[2].toLowerCase(),
        argument: match[3]?.trim() ?? "",
        ...parseContent(lines.slice(i + 1, end).join("\n")),
        raw: lines.slice(i, end + 1).join("\n")
      });
      i = end;
    } else {
      const code = fence.exec(line);
      if (code) {
        const end = codeEnd(lines, i, code[1]);
        text.push(...lines.slice(i, end + 1));
        i = end;
      } else text.push(line);
    }
  }
  flush();
  return blocks;
}
function escapeText(text) {
  return text.replace(/[\\[\]<>]/g, "\\$&").replace(/[\r\n]+/g, " ");
}
function destination(value) {
  const clean = value.trim();
  if (!clean || /[\u0000-\u0020<>"\\]/.test(clean.replace(/ /g, ""))) return null;
  const scheme = /^([a-z][\w+.-]*):/i.exec(clean)?.[1]?.toLowerCase();
  if (scheme && scheme !== "http" && scheme !== "https") return null;
  if (clean.startsWith("//")) return null;
  return encodeURI(clean).replace(/[()]/g, (char) => "%" + char.charCodeAt(0).toString(16));
}
function codeBlock(body, language = "") {
  const longest = Math.max(2, ...Array.from(body.matchAll(/`+/g), (match) => match[0].length));
  const marker = "`".repeat(longest + 1);
  const safeLanguage = /^[\w+-]*$/.test(language) ? language : "";
  return `${marker}${safeLanguage}
${body}
${marker}`;
}
function quote(body) {
  return body.split("\n").map((line) => line ? `> ${line}` : ">").join("\n");
}
function transformRoles(source) {
  const parts = source.split(/(`+[^`]*`+)/g);
  for (let i = 1; i < parts.length; i += 2) {
    const before = parts[i - 1];
    const role = /\{([\w:-]+)\}$/.exec(before);
    const token = /^`([^`\n]+)`$/.exec(parts[i]);
    if (!role || !token) continue;
    const value = token[1];
    let rendered = null;
    switch (role[1]) {
      case "math":
      case "m":
        rendered = `$${value}$`;
        break;
      case "code":
      case "file":
      case "command":
      case "kbd":
      case "guilabel":
        rendered = "`" + value + "`";
        break;
      case "ref":
      case "eq":
      case "numref":
      case "doc": {
        const explicit = /^(.*?)\s*<([^<>]+)>$/.exec(value);
        const target = explicit?.[2] ?? value;
        const label = explicit?.[1] ?? value;
        const url = destination(role[1] === "doc" ? target : "#" + target);
        if (url) rendered = `[${escapeText(label)}](${url})`;
        break;
      }
    }
    if (rendered !== null) {
      parts[i - 1] = before.slice(0, -role[0].length);
      parts[i] = rendered;
    }
  }
  return parts.join("");
}
function transformText(source) {
  const lines = source.split("\n");
  const out = [];
  let start = 0;
  if (lines[0] === "---") {
    const end = lines.findIndex((line, index) => index > 0 && /^(---|\.\.\.)$/.test(line));
    if (end >= 0) {
      out.push(...lines.slice(0, end + 1));
      start = end + 1;
    }
  }
  for (let i = start; i < lines.length; i++) {
    const line = lines[i];
    const code = fence.exec(line);
    if (code) {
      const end = codeEnd(lines, i, code[1]);
      out.push(...lines.slice(i, end + 1));
      i = end;
    } else if (/^( {4}|\t)/.test(line)) out.push(line);
    else if (/^\([\w:.-]+\)=$/.test(line)) {
      out.push(`<span id="${line.slice(1, -2)}"></span>`);
    } else out.push(transformRoles(line));
  }
  return out.join("\n");
}
function listTable(body, headerRows) {
  const rows = [];
  for (const line of body.split("\n")) {
    const row = /^\s*\*\s+-\s+(.*)$/.exec(line);
    const cell = /^\s+-\s+(.*)$/.exec(line);
    if (row) rows.push([row[1]]);
    else if (cell && rows.length) rows[rows.length - 1].push(cell[1]);
    else if (line.trim()) return null;
  }
  const width = rows[0]?.length ?? 0;
  if (!width || rows.some((row) => row.length !== width) || headerRows > 1) return null;
  const result = rows.map((row) => "| " + row.map((cell) => transformRoles(cell).replace(/\|/g, "\\|")).join(" | ") + " |");
  const divider = "| " + Array(width).fill("---").join(" | ") + " |";
  if (headerRows === 1) result.splice(1, 0, divider);
  else result.unshift("| " + Array(width).fill(" ").join(" | ") + " |", divider);
  return result.join("\n");
}
function renderDirective(block, depth = 0) {
  if (depth > 32) return codeBlock(block.raw, "text");
  const { name, argument, options, body } = block;
  const content = () => transformMyST(body, depth + 1);
  const label = options.name ?? options.label;
  const anchor = label && /^[\w:.-]+$/.test(label) ? `<span id="${label}"></span>

` : "";
  if (has(admonitions, name) || name === "dropdown") {
    const classes = (options.class ?? "").split(/\s+/);
    const style = classes.find((value) => has(admonitions, value));
    const type = style ? admonitions[style] : admonitions[name] ?? "note";
    const fold = name === "dropdown" || classes.includes("dropdown") ? has(options, "open") ? "+" : "-" : "";
    return anchor + `> [!${type}]${fold} ${escapeText(argument || (name === "admonition" ? "Note" : name.charAt(0).toUpperCase() + name.slice(1)))}
` + quote(content());
  }
  if (name === "math") return anchor + `$$
${body.trim()}
$$`;
  if (name === "code-block" || name === "code" || name === "code-cell") return codeBlock(body, argument);
  if (name === "figure" || name === "image") {
    const url = destination(argument);
    if (!url) return codeBlock(block.raw, "text");
    const image = `![${escapeText(options.alt ?? "")}](${url})`;
    return anchor + image + (name === "figure" && body.trim() ? "\n\n" + content() : "");
  }
  if (name === "list-table") {
    const table = listTable(body, Number(options["header-rows"] ?? 0));
    if (table) return anchor + (argument ? `**${escapeText(argument)}**

` : "") + table;
  }
  if (name === "table") return anchor + (argument ? `**${escapeText(argument)}**

` : "") + content();
  if (name === "rubric") return `**${escapeText(argument)}**`;
  if (name === "epigraph" || name === "pull-quote") return quote(content() + (options.attribution ? `

\u2014 ${escapeText(options.attribution)}` : ""));
  return codeBlock(block.raw, "text");
}
function transformMyST(source, depth = 0) {
  const blocks = parseDocument(source);
  return blocks.map((block, index) => {
    const rendered = block.kind === "directive" ? renderDirective(block, depth) : transformText(block.raw);
    if (index === blocks.length - 1) return rendered;
    const next = blocks[index + 1];
    return rendered + (rendered.endsWith("\n") || next.raw.startsWith("\n") ? "\n" : "\n\n");
  }).join("");
}

// src/live-preview.ts
var import_state = require("@codemirror/state");
var import_view = require("@codemirror/view");
var import_obsidian3 = require("obsidian");

// src/render.ts
var import_obsidian2 = require("obsidian");

// src/raw-html.ts
var import_obsidian = require("obsidian");
function htmlFilePath(sourcePath, requested) {
  if (!requested || /[\\:\u0000-\u001f\u007f?#]/.test(requested) || requested.startsWith("/")) {
    throw new Error("Use a relative HTML file path inside this vault.");
  }
  const parts = sourcePath.split("/").slice(0, -1);
  for (const part of requested.split("/")) {
    if (part === "..") {
      if (!parts.length) throw new Error("The HTML file must stay inside this vault.");
      parts.pop();
    } else if (part && part !== ".") parts.push(part);
  }
  const path = parts.join("/");
  if (!/\.html?$/i.test(path)) throw new Error("The file must have an .html or .htm extension.");
  return path;
}
var measure = `<script>(()=>{
  let queued=false;
  const report=()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{
    queued=false;parent.postMessage({type:'myst-reader-height',height:Math.ceil(document.body.getBoundingClientRect().height)+24},'*');
  });};
  new ResizeObserver(report).observe(document.body);
  addEventListener('load',report);report();
})();<\/script>`;
async function renderRawHTML(app, block, target, sourcePath, component, changed) {
  const doc = target.ownerDocument;
  const win = doc.defaultView;
  let alive = true;
  let revision = 0;
  component.register(() => {
    alive = false;
    revision++;
  });
  let file;
  const requested = block.options.file;
  try {
    if (requested !== void 0) {
      const path = htmlFilePath(sourcePath, requested);
      const found = app.vault.getAbstractFileByPath(path);
      if (!(found instanceof import_obsidian.TFile)) throw new Error(`HTML file not found: ${path}`);
      file = found;
    }
  } catch (error) {
    const message = doc.createElement("p");
    message.className = "myst-reader-html-error";
    message.textContent = `MyST Reader: ${error instanceof Error ? error.message : String(error)}`;
    target.append(message);
    return;
  }
  const frame = doc.createElement("iframe");
  frame.className = "myst-reader-html";
  frame.title = requested ? `Interactive HTML: ${requested}` : "MyST interactive HTML";
  frame.setAttribute("sandbox", "allow-scripts");
  frame.referrerPolicy = "no-referrer";
  const resize = (event) => {
    if (!alive || event.source !== frame.contentWindow || event.data?.type !== "myst-reader-height") return;
    const height = event.data.height;
    if (typeof height !== "number" || !Number.isFinite(height)) return;
    const pixels = `${Math.max(160, Math.min(12e3, Math.ceil(height)))}px`;
    if (frame.style.height !== pixels) {
      frame.style.height = pixels;
      changed();
    }
  };
  win?.addEventListener("message", resize);
  component.register(() => {
    win?.removeEventListener("message", resize);
    frame.remove();
  });
  target.append(frame);
  const load = async () => {
    const current = ++revision;
    try {
      const html = file ? await app.vault.read(file) : block.body;
      if (!alive || current !== revision) return;
      const needsMath = /\bMathJax\b|\\\(|\\\[/.test(html);
      const hasMathLoader = /<script\b[^>]*\bsrc\s*=\s*["'][^"']*mathjax/i.test(html);
      const math = needsMath && !hasMathLoader ? '<script src="https://cdn.jsdelivr.net/npm/mathjax@3.2.2/es5/tex-svg-full.js" referrerpolicy="no-referrer"><\/script>' : "";
      frame.srcdoc = '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><style>html{background:transparent}body{margin:0;padding:8px;box-sizing:border-box;font-family:system-ui,sans-serif}</style>' + math + "</head><body>" + html + measure + "</body></html>";
      if (frame.parentElement !== target) target.replaceChildren(frame);
      changed();
    } catch (error) {
      if (!alive || current !== revision) return;
      const message = doc.createElement("p");
      message.className = "myst-reader-html-error";
      message.textContent = `MyST Reader: could not read HTML. ${String(error)}`;
      target.replaceChildren(message);
      changed();
    }
  };
  if (file) component.registerEvent(app.vault.on("modify", (modified) => {
    if (modified === file) void load();
  }));
  await load();
}

// src/render.ts
async function renderMySTDirective(app, block, target, path, component, changed = () => {
}) {
  if (block.name === "raw" && block.argument.toLowerCase() === "html") {
    await renderRawHTML(app, block, target, path, component, changed);
  } else await import_obsidian2.MarkdownRenderer.render(app, renderDirective(block), target, path, component);
}

// src/live-preview.ts
var DirectiveWidget = class extends import_view.WidgetType {
  constructor(owner, block, path, from) {
    super();
    this.owner = owner;
    this.block = block;
    this.path = path;
    this.from = from;
    this.components = /* @__PURE__ */ new WeakMap();
  }
  eq(other) {
    return this.block.raw === other.block.raw && this.path === other.path && this.from === other.from;
  }
  toDOM(view) {
    const doc = view.dom.ownerDocument;
    const wrapper = doc.createElement("div");
    wrapper.className = "myst-reader-widget";
    const edit = doc.createElement("button");
    edit.className = "myst-reader-edit";
    edit.textContent = "Edit";
    edit.setAttribute("aria-label", "Edit MyST source");
    edit.addEventListener("click", () => {
      view.dispatch({ selection: { anchor: this.from }, scrollIntoView: true });
      view.focus();
    });
    const content = doc.createElement("div");
    content.className = "markdown-rendered myst-reader-content";
    content.setAttribute("dir", "auto");
    wrapper.append(edit, content);
    const component = this.owner.addChild(new import_obsidian3.Component());
    this.components.set(wrapper, component);
    void renderMySTDirective(
      this.owner.app,
      this.block,
      content,
      this.path,
      component,
      () => {
        if (this.components.has(wrapper)) view.requestMeasure();
      }
    ).then(() => {
      if (this.components.has(wrapper)) view.requestMeasure();
    }).catch((error) => {
      if (!this.components.has(wrapper)) return;
      content.replaceChildren();
      const pre = doc.createElement("pre");
      pre.textContent = this.block.raw;
      content.append(pre);
      console.error("MyST Reader: Live Preview rendering failed", error);
      view.requestMeasure();
    });
    return wrapper;
  }
  destroy(dom) {
    const component = this.components.get(dom);
    if (component) this.owner.removeChild(component);
    this.components.delete(dom);
  }
  ignoreEvent() {
    return true;
  }
};
function decorations(state, owner) {
  if (!state.field(import_obsidian3.editorLivePreviewField, false)) return import_view.Decoration.none;
  const path = state.field(import_obsidian3.editorInfoField, false)?.file?.path ?? "";
  const ranges = [];
  let offset = 0;
  for (const block of parseDocument(state.doc.toString())) {
    const end = offset + block.raw.length;
    if (block.kind === "directive" && DIRECTIVES.includes(block.name)) {
      const editing = state.selection.ranges.some((range) => range.from <= end && range.to >= offset);
      if (!editing) ranges.push(import_view.Decoration.replace({
        block: true,
        widget: new DirectiveWidget(owner, block, path, offset)
      }).range(offset, end));
    }
    offset = end + 1;
  }
  return import_view.Decoration.set(ranges, true);
}
function livePreviewExtension(owner) {
  return import_state.StateField.define({
    create: (state) => decorations(state, owner),
    update: (value, transaction) => transaction.docChanged || transaction.selection || transaction.reconfigured || transaction.startState.field(import_obsidian3.editorLivePreviewField, false) !== transaction.state.field(import_obsidian3.editorLivePreviewField, false) ? decorations(transaction.state, owner) : value,
    provide: (field) => import_view.EditorView.decorations.from(field)
  });
}

// src/main.ts
function directiveFromProcessor(name, source, el, ctx) {
  const info = ctx.getSectionInfo(el);
  const lines = info?.text.split("\n").slice(info.lineStart, info.lineEnd + 1) ?? [];
  const start = lines.find((line) => new RegExp("^ {0,3}`{3,}\\{" + name + "\\}(?:[ \\t]|$)").test(line));
  const argument = start?.replace(/^ {0,3}`{3,}\{[^}]+\}\s*/, "").trim() ?? "";
  const body = source.replace(/\r\n?/g, "\n").replace(/\n$/, "");
  return { kind: "directive", name, argument, ...parseContent(body), raw: source };
}
var MySTReader = class extends import_obsidian4.Plugin {
  onload() {
    this.registerEditorExtension(livePreviewExtension(this));
    this.app.workspace.onLayoutReady(() => {
      void this.migrateLegacyPanes();
    });
    this.registerMarkdownPostProcessor(async (el, ctx) => {
      const blocks = el.tagName === "PRE" ? [el] : Array.from(el.querySelectorAll("pre"));
      for (const pre of blocks) {
        if (pre.dataset.mystReader) continue;
        const code = pre.querySelector("code");
        if (!code) continue;
        const language = Array.from(code.classList).find((value) => /^language-\{[\w-]+\}$/.test(value));
        const name = language?.slice("language-{".length, -1);
        if (!name || !DIRECTIVES.includes(name)) continue;
        pre.dataset.mystReader = "rendering";
        const block = directiveFromProcessor(name, code.textContent ?? "", pre, ctx);
        const container = pre.ownerDocument.createElement("div");
        container.className = "myst-reader-content";
        container.setAttribute("dir", "auto");
        pre.after(container);
        const child = new import_obsidian4.MarkdownRenderChild(container);
        ctx.addChild(child);
        try {
          await renderMySTDirective(this.app, block, container, ctx.sourcePath, child);
          pre.remove();
        } catch (error) {
          container.remove();
          child.unload();
          delete pre.dataset.mystReader;
          console.error("MyST Reader: directive rendering failed", error);
        }
      }
    });
  }
  async migrateLegacyPanes() {
    const workspace = this.app.workspace;
    for (const leaf of workspace.getLeavesOfType("myst-reader-preview")) {
      const path = leaf.getViewState().state?.file;
      const alreadyOpen = workspace.getLeavesOfType("markdown").some((normal) => normal.getViewState().state?.file === path);
      if (typeof path !== "string" || alreadyOpen || !(this.app.vault.getAbstractFileByPath(path) instanceof import_obsidian4.TFile)) {
        leaf.detach();
      } else {
        try {
          await leaf.setViewState({ type: "markdown", state: { file: path, mode: "preview" } });
        } catch (error) {
          console.error("MyST Reader: could not reopen the legacy pane as a note", error);
        }
      }
    }
  }
};
