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

Every local JSXGraph plot has four compact tools through `CourseInteractives.navigation`: magnifier (drag a rectangle to zoom), hand (left-drag to pan, right-drag to scale), home, and undo. Undo reverses one completed view gesture (including Home), independently for each graph, without changing signal parameters. In hand mode, rightward/upward right-button movement zooms in along x/y respectively; leftward/downward movement zooms out. Scaling is anchored at the pressed point and follows Matplotlib's exponential linear-axis rule (one plot width/height changes the span tenfold). Pointer capture lets a drag finish outside the plot. Rectangle selection, left-button pan and wheel/pinch zoom use JSXGraph's built-in interactions. Escape returns to pan mode. Shift + wheel zooms without taking over ordinary page scrolling. Touch uses two-finger panning/pinch zoom. Home restores the original limits; parameter changes preserve the user's current view. The microphone fragment includes the shared runtime for the same controls.

The RC width marker retains the original half-amplitude definition; the RLC width uses half power. Convolution uses numerical quadrature on a fixed grid, with explicitly labelled finite Gaussian approximations for impulses and a finite seven-pulse train. Playback reuses the output curve until a signal parameter changes. Extreme parameter combinations can exceed the fixed viewing window.

JSXGraph is pinned to version 1.14.0 on jsDelivr. MathJax is supplied by the course. If loading fails, the activity offers the original external activity as a fallback link.

Run the mathematical invariants and inline-script syntax checks from the repository root:

```powershell
node --test LTI/interactives/tests/models.test.cjs
node --test LTI/interactives/tests/navigation.test.cjs
```

For browser verification, build the affected chapters with notebook execution disabled in a separate preview configuration. Inspect dropdowns after opening, presets, slider extremes, playback, fixed scales and phone width. A fresh build or touching the containing Markdown ensures edited raw HTML includes are re-read by incremental page builds.

## Clickable process diagrams

The coherent AM receiver remains the original reference. Six additional explorations share `process-models.html` (pure numerical models) and `process-lab.html` (accessible SVG components, coordinated JSXGraph plots, MathJax, legend and playback). Include those two fragments after `runtime.html`, once per page, before the chapter-local fragments.

| Chapter | Chapter-local fragment | Main comparison |
| --- | --- | --- |
| AM | `analog_communication/interactives/envelope-detector.html` | Diode, RC peak tracking, DC removal; ripple versus envelope distortion |
| AM | `analog_communication/interactives/heterodyne.html` | Two stations, tunable LO, fixed IF, ideal envelope detection |
| PM/FM | `analog_communication/interactives/fm-detector.html` | Explicitly scaled differentiation, ideal envelope, calibrated message recovery |
| Linear modulations | `digital_communication/interactives/iq-receiver.html` | Parallel I/Q mixers and filters, LO quadrature, phase crosstalk |
| Interpolation | `digitation_and_reconstruction/interactives/sampling-process.html` | Antialias filtering, discrete samples, sinc/hold/linear reconstruction |
| Detection | `noise/interactives/matched-detector.html` | Seeded sampled Gaussian noise, causal energy-normalized matched filter, threshold |

Models return named real signals with `values`, `rate`, and `periodic`. `discrete` enables sample markers and a continuous periodic DTFT, including spectral replicas. Other spectra use a zero-padded FFT of the same Hann-windowed time segment, divided by the window area. This shared scale preserves amplitude differences; it is not the chapter's unwindowed symmetric Fourier transform. The sampling demo uses the exact infinite-sinc result for sinusoidal inputs, computed by folding each frequency into the Nyquist interval. Sample playback uses a zero-order hold. Audio in the communication and sampling demos uses fixed gain 0.12; the detection demo has no audio.

The RC detector uses a discrete peak/decay recurrence with periodic warm-up, not the analytic-envelope model used in the IF and FM explorations. The matched filter uses a 160-sample real template at 8 kHz and explicitly accounts for its 159-sample causal delay. Changing its threshold does not generate a new noise realization.

```powershell
node --test LTI/interactives/tests/processes.test.cjs analog_communication/interactives/tests/coherent-am.test.cjs
```

Selected process filters use `CourseInteractives.filterOverlay`: translucent passbands with dashed edges (in kHz), or a dashed magnitude response at a fixed reference height. The caption distinguishes filter gain from the signal amplitude axis. Bounds follow filter parameters; selection and curve visibility do not change the physical signal scale. Ideal RF models explicitly show unity across the displayed range, without inventing a bandwidth. Nonlinear diode/RC envelope detection has no LTI response overlay.

The two heterodyne stations carry five-digit DTMF-inspired sequences (12345 and 86420), using artificial low-frequency row/column pairs on the existing 6.25 Hz grid. Carrier frequencies, plot limits, and 4,096-sample buffers remain unchanged. Each digit is a stationary pair; Play assembles five short segments with fades and gaps, advances the selected digit and plots, and stops on manual selection/parameter changes. Only the five small models for the current LO/bandwidth are cached. These are illustrative pairs, not standard telephone DTMF frequencies.

The heterodyne `frequencyReference` keeps the downstream IF passband visible in RF, mixer, VCO, and prefilter checkpoint views. The reference retains the IF output color and fixed ±1.2 kHz center; only bandwidth changes its edges. Its caption identifies it as a downstream reference rather than a filter already applied at the displayed point.

The microphone fragment also contains an analytic single/three-tone probe. It shares the existing mass, damping and stiffness parameters. Exactly two plots are visible: magnitude, plus either steady-state input/output or phase. Tone frequencies, gain/phase markers, component inclusion, and component/sum views preserve physical amplitude and viewport limits. No FFT, numerical ODE, audio or long buffers are used. `tests/tone-probe.test.cjs` verifies the microphone equation and superposition at parameter extremes.
