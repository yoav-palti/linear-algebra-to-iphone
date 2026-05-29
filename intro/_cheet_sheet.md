# ⚡ Electrical Engineering 101 – Student Cheat Sheet

---

## 📊 Signals & Systems (LTI)

**Key Ideas**

* **Linear**: scaling & adding inputs → scaling & adding outputs.
* **Time-invariant**: system response does not change over time.
* **Impulse response** `h(t)` = full system description.

**Formulas**

* Convolution:
  `y(t) = (x * h)(t) = ∫ x(τ) h(t−τ) dτ`
* Frequency response:
  `H(ω) = ∫ h(t) e^(−jωt) dt`

**Visual**
x(t) → \[ System h(t) ] → y(t)

---

## 🔋 RC & RLC Circuits

**Impedances**

* R = `R`
* C = `1 / jωC`
* L = `jωL`

**RC Filter Behavior**

| Output node | Low freq | High freq | Name |
| ----------- | -------- | --------- | ---- |
| Capacitor   | Pass     | Block     | LPF  |
| Resistor    | Block    | Pass      | HPF  |

**RLC Resonance**

* `ω₀ = 1 / √LC`
* Q-factor: `Q = ω₀ / Δω` → sharpness of resonance.
* At resonance: L & C cancel, only R remains.

**Visual**
Resonance: energy oscillates between L & C
\[ L ↔ C ] damped by R

---

## 📡 Analog Communication

**AM (Amplitude Modulation)**

* Spectrum: Carrier ± message band
* Bandwidth = `2 f_max`

\|---|===|---|
fc-fm fc fc+fm

**FM/PM**

* FM: frequency wiggles with message → noise-resistant.
* PM: phase wiggles with message → constant power.

**Receivers**

* **Envelope detector**: simple AM demod.
* **Superheterodyne**: mix → IF → filter → demod.

---

## 💻 Digital Communication

**Schemes**

| Modulation | What changes? | Visual Idea        |
| ---------- | ------------- | ------------------ |
| ASK        | Amplitude     | • o O OO           |
| PSK        | Phase         | ↗ ↘ ↙ ↖            |
| QAM        | Amp + Phase   | Constellation grid |

**Constellation Diagrams**
BPSK:  o        o
QPSK:  o    o
o    o
16-QAM: grid of 16 points

**Challenges**

* ISI (echoes blur symbols) → equalization.
* Phase sync → DPSK / pilot signals.
* Multiple access → orthogonality (CDMA).

---

## 🖥️ Digitization & Reconstruction

**Steps**

1. Sampling → discretize **time**.
2. Quantization → discretize **amplitude**.

**Sampling**

* Nyquist: `f_s ≥ 2 f_max`
* Aliasing = overlap in spectrum

Too slow sampling → wagon wheel illusion

**Interpolation**

* Zero-order: hold last value.
* Linear: connect dots.
* Ideal: sinc (impractical).

**Quantization**

* Rounding error = quantization noise.
* SNR ≈ `6 dB × (bits per sample)`.

---

## 🔊 Noise

**Sources**

* Thermal noise ∝ temperature, resistor value.
* Shot noise ∝ current (electron discreteness).
* Environmental: fans, buses, interference.

**Key Tools**

* PSD (Power Spectral Density) = power vs. frequency.
* Matched filter: maximize SNR for known signal.
* Wiener filter: pass bands where SNR is high, suppress low-SNR bands.

**Detection**

* Thresholding → Pd (detection prob) vs PFA (false alarms).
* ROC curve = Pd vs PFA tradeoff.

ROC curve:
Pd ↑
│     o better detector
│   o
│ o
└─────────→ PFA

---

## 🧮 DSP (DFT/FFT)

**DFT**

* Breaks N-sample signal into N frequency bins.
* Assumes signal is **periodic** with period N.
* Resolution = 1/N.

**FFT**

* Fast algorithm for DFT → O(N log N).

**Pitfalls**

* Leakage: non-integer cycles spread energy.
* Windowing reduces leakage (Hamming, Hann).
* Zero-padding interpolates spectrum, doesn’t increase resolution.

---

## ℹ️ Information Theory

**Entropy**

* `H(X) = − Σ p log₂ p`
* Max for uniform distribution.
* Units = bits per symbol.

**Typical Sequences (AEP)**

* Long sequences concentrate near `2^(−NH)`.
* Source coding theorem: can compress to H bits/symbol.

**Channel Capacity**

* AWGN channel:
  `C = Δf log₂(1 + SNR)` bits/sec
* Shannon’s limit: can approach but never exceed.

**Visual**
Capacity ↑ with SNR (logarithmically)
Capacity ↑ linearly with bandwidth
