# Mission Section — Requirements

**Status:** In Review (v2) — Offeni Punkte — Erstellt: 15. Juni 2026 — Überarbeitet: 16. Juni 2026

## Ziel

Neui Sektion **«Mission»**: kommuniziert in eimere einzige, kraftvolle Aussage, **warum** das Portfolio existiert und **für wen** es gebaut isch — Schweizer Early-Stage-Startups. Kei Feature-Liste, kei Ablauf — nur Absicht.

Zielgruppe: Gründer vo Schweizer Early-Stage-Startups, wo sich frage, ob ich dr richtig Entwickler für sie bin.

Umsetzung: `Mission.astro`, iigbunde in `index.astro` am Ende — nach `<Faq />`, vor em bestehende Inline-Abschnitt (dä wird dure `Mission.astro` ersetzt).

---

## Sektions-Header

- **Label:** `07 — Mission`  *(font-mono, uppercase, slate-400, xs)*
- **Unterschrift:** «Warum habe ich dieses Portfolio aufgebaut.»  *(h2, elegant serif, gross)*

---

## Visuelle Identität

### Farbpalette

Numme bestehendi Farbe us `global.css` verwände:

| Token | Wert | Verwendig |
|-------|------|-----------|
| `--color-brand` | `#026766` | Hintergrund-Basis, Akzente |
| `--color-brand-hover` | `#015352` | Tieferi Töne im Gradient |
| `#1ccdb9` | *(gleich wie Impact Aurora)* | Helling Highlight im Gradient |
| `#014b4a` | *(gleich wie Impact Aurora)* | Dunkle Töne |
| `white / white/90` | — | Text |
| `white/20` | — | Subtili Elemente (Linie, Badge) |

### Typografie

**Kei neue externe Schrift.** Alli Texte verwände d bestehende Schrifte us em Projekt:

- **Mission-Satz:** `font-sans` (Inter) — `text-3xl` → `md:text-4xl` → `lg:text-5xl`, `font-light`, `text-white/95`
- **Label (`07 — Mission`):** `font-mono` (JetBrains Mono) — `text-xs`, uppercase, `text-white/50`
- **Unterschrift:** `font-sans` (Inter) — `text-sm`/`text-base`, `text-white/70`
- **Badge:** `font-mono` — `text-xs`, uppercase, `tracking-[0.16em]`

> Kei Google Fonts, kei neui `@font-face`, kei zusätzlichi `<link>`-Tags im `<head>`.

---

## Hintergrund-Animation

### Konzept: «Interactive Shader Wallpaper»

Dr Hintergrund isch en **interaktiver WebGL-Shader** — rendert uf emem `<canvas>`-Element, wo d ganzi Sektion ausfüllt. Dr Shader reagiert uf:

- **Mausbewegig** — d visuelle Strömig/Welle folgt em Cursor
- **Klick** — löst en kurze, sichtbare Impulswelle (Ripple/Burst) us

Feeling: interaktiv, technisch, verspielt — passend für e Software-Entwickler-Portfolio.

### Basis-Hintergrundfarb

```css
background-color: var(--color-brand); /* #026766 */
```
Dr Shader überlagert dä Farbton und verwendet usseschliesslich Farbe us dr bestehende Palette.

### Farbpalette im Shader

Dr Shader darf **nur** folgende Farbe verwände (kei neue Werte):

| Token | Wert | Rolle im Shader |
|-------|------|-----------------|
| `--color-brand` | `#026766` | Basis-/Hintergrundton |
| `--color-brand-hover` | `#015352` | Dunkle Stellen, Tiefe |
| `#1ccdb9` | — | Helli Akzent-Highlights |
| `#014b4a` | — | Dunkle Tieftöne |
| `white/5`–`white/15` | — | Subtili Glanzlichter |

### Canvas-Aufbau

```html
<canvas id="mission-shader" aria-hidden="true"></canvas>
```

- `position: absolute; inset: 0; width: 100%; height: 100%`
- `pointer-events: none` — Canvas empfangt kein Input direkt; Events laufe über d Section
- Z-Index unter em Text-Container

### Shader-Varianten (einer davon umsetze)

Fünf mögliche Shader-Konzepte — implementier **einen** davon, wo am bischte uf d Farbpalette passt:

#### Option A — «Fluid Noise»
Fragment-Shader mit **Simplex/Value Noise**, wo sich uf dr Mausposition verschiebt. Dr Noisefield fließt organisch — biim Klick entsteht e kurze Welle (Ripple-Uniform).

#### Option B — «Wave Grid»
E fines Raster us sinoidale Wellen. Mausposition verändert d Amplitude und Phase lokal — Klick erzeugt e radiale Störung, wo sich us em Klickpunkt usbreitet.

#### Option C — «Voronoi Cells»
Voronoi-Muster wo sich uf dr Mausposition ausrichtet. Zellegrösse und Helligkeit reagiere uf Nähe zum Cursor. Klick splittert di nächste Zellen kurz auf.

#### Option D — «Caustics / Light Refraction»
Simuliert Lichtbrechig unter Wasser. Mausbewegig verschiebt d Lichtquelle. Klick erzeugt e kurze Wellenstörig.

#### Option E — «Particle Flow Field»
Vectorfeld us Noise — vieli kleini Partikel fliesse entlang. Mausbewegig verändert d Feldrichtung lokal. Klick erzeugt en Repuls-Burst.

### Umsetzigs-Anforderige

- **Kei externe Library** (Three.js, GSAP, etc.) — pures WebGL (oder `canvas` 2D falls Shader zu komplex)
- Canvas-Grösse passt sich dynamisch an (`ResizeObserver`)
- Maus-Koordinate werden als `uniform vec2 uMouse` (normalisiert 0–1) an de Shader übergä
- Zeit wird als `uniform float uTime` übergä (requestAnimationFrame loop)
- Klick-Event setzt `uniform vec2 uClick` + `uniform float uClickTime` — Shader berechnet Ripple-Distanz selbst
- Shader lauft mit ~60 fps uf modärne Hardware — kei komplexi Raymarching nötig
- Fallback: wenn WebGL nöd verfügbar, zeigt d Sektion nur d Basis-Hintergrundfarb `#026766`

### `prefers-reduced-motion`

```javascript
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  // Canvas Animation pausiere — nur statische Basis-Hintergrundfarb zeige
  cancelAnimationFrame(animationId);
}
```

---

## Layout

- **Breite:** `max-w-3xl mx-auto` für de Text-Container — konsistent mit anderne Sektione
- **Ausrichtung:** zentriert (Text + Label + Unterschrift alle centered)
- **Padding:** `py-28 md:py-36` — grosszügig, da dä Abschnitt wiä en emotionale Schlusspunkt wirkt
- **Trennlinie über dr Sektion:** e subtili horizontali Linie (`border-t border-white/10`) trennt d Mission vo dr FAQ
- Mobile: 1 Spalte, volle Breite, gleichi Schrifthierarchie

### Innere Struktur (top → bottom, zentriert)

```
[07 — Mission]             ← font-mono, xs, uppercase, white/50
[Unterschrift h2]          ← font-sans, sm/base, white/70, mt-3
[Trennlinie]               ← w-12, border-white/20, my-8
[Mission-Satz]             ← font-sans (Inter), font-light, 3xl→5xl, white/95
[Badge]                    ← optional, mt-10 (sieh unten)
```

### Badge — Zielgruppen-Signal

Direkt under em Mission-Satz: e kleines Pill-Badge, wo d Zielgruppe explizit nennt.

```
🇨🇭 Schweizer Early-Stage-Startups
```

- Stil: `inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/8 px-4 py-1.5 text-xs font-mono uppercase tracking-[0.16em] text-white/60`
- Kei Hover-Effekt, kei Link — pur informativer Hinweis
- D Flagge isch e Unicode-Emoji (🇨🇭) — kei extra Asset nötig

---

## Inhalt

### Label
```
07 — Mission
```

### Unterschrift (h2)
```
Warum habe ich dieses Portfolio aufgebaut.
```

### Mission-Satz (Inter, font-light)
```
Hilf Schweizer Early-Stage-Startups dabei, meine Eignung als Softwareentwickler
mithilfe eines KI-gestützten Portfolios einzuschätzen.
```

### Badge
```
🇨🇭 Schweizer Early-Stage-Startups
```

---

## Scroll-Animazion

**Einmal biim Iiscrole — kei Loop.**

| Element | Animation | Verzögerig |
|---------|-----------|------------|
| Label + Unterschrift | `opacity: 0 → 1`, `translateY(12px → 0)` | 0ms |
| Trennlinie | `scaleX: 0 → 1` (transform-origin: left) | 150ms |
| Mission-Satz | `opacity: 0 → 1`, `translateY(20px → 0)` | 250ms |
| Badge | `opacity: 0 → 1`, `scale: 0.92 → 1` | 420ms |

Umsetzung: **CSS `@keyframes` + `IntersectionObserver`** (kei externe Library nötig).  
Klasse `is-visible` wird per JS uf de Container gsetzt — CSS-Transitions laufe einmalig.

`prefers-reduced-motion`: alli Transitions uf `0s` setze.

---

## Integration

| Was | Wert |
|-----|------|
| `id` | `mission` |
| Nav-Link | kei Nav-Link (Mission isch kei navigierbari Sektion, sondern en Abschluss) |
| Komponente | `Mission.astro` |
| Platzierung | **ersetzt** de bestehende Inline-`<section>` am Ende vo `index.astro` |
| Sektionslabel | `07 — Mission` |

---

## Nicht-Ziele (v2)

- Kei Nav-Link (Mission isch Abschluss, kei separate Destination)
- Kei animierti Buchstabe oder Typewriter (zu viel visuells Gewicht)
- Kei englischi Übersetzung
- Kei externe Animation- oder Grafik-Library (Framer Motion, GSAP, Three.js, etc.)
- Kei neue Schrift — alli Texte verwände Inter (`font-sans`) oder JetBrains Mono (`font-mono`)
- Kei Google Fonts Integration

---

## Fertig wenn

- [x] `Mission.astro` existiert mit `id="mission"`
- [x] Bestehende Inline-Sektion in `index.astro` isch dure `<Mission />` ersetzt
- [x] Mission-Satz erschint in Inter (`font-sans`), `font-light` — kei externe Schrift
- [x] Basis-Hintergrundfarb `var(--color-brand)` (`#026766`) isch gsetzt
- [x] `<canvas id="mission-shader">` isch als Hintergrund vorhande und füllt d ganze Sektion us
- [x] Shader reagiert uf Mausbewegig (uMouse uniform) — visuelle Strömig folgt em Cursor
- [x] Klick löst en sichtbari Impuls-/Ripple-Welle us (uClick + uClickTime uniforms)
- [x] Shader verwendet usseschliesslich Farbe us dr bestehende Palette (`#026766`, `#015352`, `#1ccdb9`, `#014b4a`)
- [x] WebGL-Fallback: bei fehlendem WebGL-Support zeigt d Sektion nur `background-color: #026766`
- [ ] `prefers-reduced-motion`: Canvas-Animation pausiert — nur statischi Hintergrundfarb <!-- ⚠ rAF wird gestoppt, aber es wird ein statische Shader-Frame grendert (single drawArrays), nöd nur d Basis-Hintergrundfarb -->
- [x] Canvas passt sich via `ResizeObserver` dynamisch an d Sektionsgrösse an
- [x] Kei neue externe Library
- [x] Badge `🇨🇭 Schweizer Early-Stage-Startups` isch sichtbar
- [x] Scroll-Animazion lauft einmalig biim Iiscrole (IntersectionObserver + `is-visible`)
- [x] Mobile: Text lesbar, Padding korrekt
- [x] `prefers-reduced-motion` für alli Transitions respektiert
- [x] rAF pausiert wenn d Sektion usem Viewport isch (IntersectionObserver-Throttle)
- [x] Maus-Lerp (gschmeidigs Nochfahre, kei instant Snap) — `mouse += (target - mouse) * 0.06`
