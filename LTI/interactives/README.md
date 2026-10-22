# Course interactives

Chapter Markdown includes `runtime.html` once per page, followed by a chapter-local activity fragment using MyST `{raw} html` with `:file:`. The runtime supplies scoped styling, JSXGraph helpers, a shared loader, and mathematical models; no framework or Jupyter kernel is required in the browser. The reviewed microphone activity remains self-contained in `frequency-response.html`.

| Chapter | Activity source | Original inspected |
| --- | --- | --- |
| `LTI/impulse_response.md` | `convolution.html` | phiresky convolution demo |
| `LTI/wave_in_a_room.md` | `room-reflections.html` | GeoGebra `uxfzrrp5` |
| `RLC/RC_intro.md` | `RLC/interactives/rc-filter.html` | GeoGebra `ta47hhwh` |
| `RLC/RLC_intro.md` | `RLC/interactives/rlc-filter.html` | GeoGebra `fsmc5gwz` |
| `RLC/power_on_load.md` | `RLC/interactives/impedance-matching.html` | GeoGebra `qpb4yvjq` |
| `noise/random_signals.md` | `noise/interactives/gaussian-density.html` | GeoGebra `mb5n2gph` |
| `noise/random_signals.md` | `noise/interactives/telegraph-correlation.html` | GeoGebra `entghwt6` |

Paths in this table are relative to the repository root except the three local LTI HTML filenames. Keep the runtime include outside collapsible directives. When including an activity inside a backtick-fenced admonition, use a longer outer fence so the raw directive stays nested.

All plots use fixed viewing windows, transparent MathJax labels, Hebrew controls and LTR mathematical notation. Units are explicit: RC uses milliseconds and thousands of radians per second; RLC uses milliohms, nanohenries, nanofarads and hundreds of millions of radians per second. Room plots use the chapter's symmetric Fourier normalization. Impedance-matching power is scaled by the source-voltage amplitude squared, as in the original activity.

The RC width marker retains the original half-amplitude definition; the RLC width uses half power. Convolution uses numerical quadrature on a fixed grid, with explicitly labelled finite Gaussian approximations for impulses and a finite seven-pulse train. Playback reuses the output curve until a signal parameter changes. Extreme parameter combinations can exceed the fixed viewing window.

JSXGraph is pinned to version 1.14.0 on jsDelivr. MathJax is supplied by the course. If loading fails, the activity offers the original external activity as a fallback link.

Run the mathematical invariants and inline-script syntax checks from the repository root:

```powershell
node --test LTI/interactives/tests/models.test.cjs
```

For browser verification, build the affected chapters with notebook execution disabled in a separate preview configuration. Inspect dropdowns after opening, presets, slider extremes, playback, fixed scales and phone width. A fresh build or touching the containing Markdown ensures edited raw HTML includes are re-read by incremental page builds.
