# Project Instructions for Codex

## Project Shape

This repository is a Jupyter Book course website for an academic course in Hebrew about signals, systems, circuits, communication, digitization, noise, DSP, and information theory.

Most student-facing content lives in Markdown (`.md`) and notebooks (`.ipynb`). Treat `_build/` as generated output unless the user explicitly asks to inspect a built page.

## Course Voice

- Write student-facing explanations in Hebrew unless the surrounding section is intentionally in English.
- Keep the tone direct, clear, and course-like: intuition first, math second, summary last.
- Prefer short bridge sentences before dense derivations.
- Use `אמ;לק`, takeaway boxes, worked examples, and self-check questions to reduce cognitive load.
- Mark advanced derivations as optional or enrichment when they are not essential for first-pass understanding.

## Technical Style

- Preserve Jupyter Book/MyST syntax.
- Keep equations in LaTeX blocks and avoid changing notation unless there is a clear correctness issue.
- Use rendered LaTeX for mathematical expressions, including interactive graph labels. Write stacked fractions with `\frac` rather than slash division, and use proper subscripts, roots, and mathematical symbols.
- Keep code, paths, and generated assets relative to the current chapter folder.
- Do not edit `_toc.yml`, `_config.yml`, CSS, requirements, or generated files when the user asks for Markdown/notebook-only changes.
- Do not remove existing user content unless it is clearly scratch content that the user asked to clean up.

## Hebrew and RTL

- Assume the main prose is right-to-left Hebrew.
- Keep code snippets, Python, JavaScript, filenames, URLs, and equations left-to-right where appropriate.
- Use meaningful image alt text rather than filenames when adding new images.

## Interactive Demonstrations

### Scope and integration

- Inspect the existing activity itself before replacing it, including its controls, curves, measurements, and teaching purpose.
- JSXGraph is the preferred option for the mathematical interactives discussed here. An iframe is optional; direct embedding in the Jupyter Book page is welcome.
- Keep interactive source and assets in the relevant chapter folder, and preserve MyST/Jupyter Book compatibility. Scope styles to the interactive so they do not affect the rest of the course.
- Replace only the activities requested by the user. A successful prototype does not authorize replacing other animations or interactives.

### Visual design and interaction

- Use fixed axis limits with sensible, moderate ranges. Moving sliders or selecting presets must change the curves and measurements without changing the axis scales or normalizing away amplitude differences.
- Choose ranges that make the default state and representative presets easy to compare. Do not expand the axes automatically to fit extreme parameter values.
- Keep the interface compact and uncluttered. Prefer clear labels directly on the graph over paragraphs explaining which colored point or line represents each quantity.
- Avoid redundant instructions, repeated explanations, and controls or readouts that do not serve the teaching purpose.
- Give graph labels transparent backgrounds. Position them so they do not overlap curves, markers, tick labels, or one another; check this again after typesetting equations.
- Keep controls and explanations in Hebrew/RTL, with mathematical notation and axes in LTR. Adapt controls and plots to narrow screens without crowding labels.

### Mathematical notation and correctness

- Render all displayed mathematical expressions with LaTeX/MathJax, including graph annotations, plot titles, control symbols, and formulas beside numerical measurements. Use stacked fractions, proper subscripts, radicals, absolute-value bars, and mathematical operators rather than plain-text approximations.
- Include the defining equation beside an important derived frequency, rather than showing only its symbol and numerical value.
- In the microphone frequency-response demonstration, use the following agreed notation consistently in the plots and measurement cards:

  $$\omega_0=\sqrt{\frac{k}{m}}$$

  $$\omega_D=\sqrt{\frac{k}{m}-\frac{\gamma^2}{2m^2}}$$

  Here $\omega_0$ is the natural frequency and $\omega_D$ is the positive-frequency maximum of the displacement-response magnitude, when such a peak exists. Do not substitute the damped free-oscillation frequency for this maximum.
- Label the half-height level on the magnitude axis with $\frac{|\tilde{H}(\omega_D)|}{2}$ and mark the corresponding horizontal width with $\Delta\omega$. Keep half-amplitude width distinct from half-power bandwidth.
- Hide peak or bandwidth annotations when the corresponding quantity does not exist, and show a concise unavailable state in the numerical measurement. Do not display invalid square roots or misleading markers.
- Preserve transparent backgrounds and fixed scales when adding math rendering. Wait for MathJax to be ready before creating typeset graph labels.

### Verification

- Build the affected page and inspect the rendered interactive in the browser. Refresh the preview from the latest source rather than relying on a cached HTML include.
- Check representative presets and slider extremes, fixed scales, mathematical labels, and narrow-screen layout. Verify that labels follow the quantities they describe and disappear when those quantities are undefined.
- Keep verification focused on the changed interactive; avoid unrelated course edits or notebook re-execution.

## Notebooks

- Avoid adding large embedded outputs unless they are part of the learning experience.
- If a notebook must be edited, keep the change focused and preserve existing outputs unless the user asks to re-run or clear them.
- Prefer Markdown-only fixes when the issue is explanatory rather than computational.

## Before Finishing

- Check for broken local links when changing paths or adding images.
- Search for obvious scratch labels such as `בדיקת תוכן`, `TODO`, malformed links, and stray math delimiters.
- Mention any important changes that could not be made because they require non-Markdown files.
