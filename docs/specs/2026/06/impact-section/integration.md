# 04 — Auswirkungen (Impact.astro) — Integration in dein Astro-Repo

Reines **Tailwind v4** + scoped `<style>` in der Komponente, keine neuen Dependencies.
Eine neue Komponente plus drei Mini-Edits. Die Sektion kommt **zwischen `<Work />`
und `<Faq />`**. (Setzt die Work-Sektion voraus — Work = `03`, FAQ rückt auf `05`.)

## Dateien

| Datei (hier) | Ziel in deinem Repo | Aktion |
|---|---|---|
| `Impact.astro` | `src/components/Impact.astro` | **NEU** anlegen |
| — | `src/pages/index.astro` | 2 Zeilen ergänzen |
| — | `src/components/Faq.astro` | 1 Label ändern |
| — | `src/components/Nav.astro` | 1 href ändern |

---

## 1. `src/components/Impact.astro` — NEU

Datei 1:1 kopieren. Datengetrieben über das `kpis[]`-Array im Frontmatter — Zahl +
Subtitel anpassbar an einer Stelle. Der **Aurora-Gradient** läuft als scoped CSS
(`.tile::before`, 10 s, konstante Bewegung) und respektiert `prefers-reduced-motion`.

> Brand-Farbe steckt als `#026766` direkt im scoped `<style>` (scoped Styles sehen
> den Tailwind-Token nicht). Wenn du magst, kannst du sie auf eine CSS-Variable
> umstellen — funktional ist es identisch.

---

## 2. `src/pages/index.astro` — `<Impact />` einhängen

Import oben ergänzen:

```diff
  import Work from '../components/Work.astro';
+ import Impact from '../components/Impact.astro';
  import Faq from '../components/Faq.astro';
```

Komponente zwischen Work und FAQ platzieren:

```diff
    <Work />

+   <Impact />
+
    <Faq />
```

---

## 3. `src/components/Faq.astro` — Label auf `05` umstellen

Auswirkungen ist jetzt `04`, FAQ rückt auf `05`:

```diff
-   <span class="font-mono text-xs uppercase tracking-[0.18em] text-slate-400">04 — FAQ</span>
+   <span class="font-mono text-xs uppercase tracking-[0.18em] text-slate-400">05 — FAQ</span>
```

---

## 4. `src/components/Nav.astro` — Anker auf `/#impact`

Der bestehende „Auswirkungen"-Link zeigt neu auf die KPI-Sektion:

```diff
-   { href: '/#auswirkungen', key: 'nav.impact', label: 'Auswirkungen' },
+   { href: '/#impact',       key: 'nav.impact', label: 'Auswirkungen' },
```

> Label und `key` bleiben gleich — nur das Sprungziel ändert sich. Greift automatisch
> für Desktop- und Mobile-Menü, da beide über `links` mappen.

---

## Erledigt-wenn (aus den Requirements)

- [x] Sektion mit `id="impact"` + eigene `Impact.astro`-Komponente
- [x] Nav-Link `/#impact` scrollt korrekt (`scroll-mt-16` gesetzt)
- [x] Label `04 — AUSWIRKUNGEN`; FAQ wird `05`
- [x] 4 Karten: Zahl + Subtitel, Grid 2×2 / Mobile 1 Spalte, keine Beschreibung
- [x] Aurora-Gradient-Animation; `prefers-reduced-motion` respektiert
- [x] Lesbar auf Mobile, `max-w-3xl` wie die übrigen Sektionen

## Reihenfolge auf der Seite (nach diesem Schritt)

Hero · 01 Intro → 02 Erfahrung → **03 Arbeit** → **04 Auswirkungen** → **05 FAQ** → Mission
