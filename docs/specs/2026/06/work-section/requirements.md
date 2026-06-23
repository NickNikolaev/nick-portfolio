# Work Section — Requirements

**Status:** v2 — Implementiert

## Ziel

Neui Sektion **«Mini Arbeit bi Alignment.io»** uf de Startsite: zeigt, **welchi Features und Prozäss** Nick bi Alignment.io entwicklet het — d Firma sälber blibt i **02 — Erfahrung**.

Zielgruppe: Recruiter und Gründer vo Early-Stage-Startups.

`Experience.astro` verlinkt uf `#work` — die Sektion erfüllt die Erwartig.

Umsetzig: `Work.astro`, iigbunde in `index.astro` zwüsche Experience und FAQ.

---

## Was sich geändert het (v1 → v2)

### 1. Onscroll-Effekt — Tailwind `data-[in]:` Variante

Jede Karte (`.js-card`) startet unsichtbar. De `IntersectionObserver` setzt `data-in` als Attribut — Tailwind-Klassen reagieren daruf:

```
opacity-0 translate-y-[18px] transition-[opacity,transform] duration-500 ease-out
data-[in]:opacity-100 data-[in]:translate-y-0
motion-reduce:opacity-100 motion-reduce:translate-y-0 motion-reduce:transition-none
```

IntersectionObserver-Konfig: `threshold: 0.2`, `rootMargin: '0px 0px -12% 0px'`, one-shot via `io.unobserve`.

### 2. Kein Bild (`<img>`) mehr — inline Demo-Panel

Jede Karte hat ein `<div aria-hidden="true" class="js-demo">` oben. Das Panel kriegt `scale(0.95) → scale(1)` als Entrance via:

```
opacity-0 scale-95 transition-[opacity,transform] duration-500 ease-out
data-[in]:opacity-100 data-[in]:scale-100
```

### 3. Kein custom CSS — nur Tailwind

Kein `<style>`-Block. Alli Animationszustände via Tailwind-Klassen + `data-[in]:` + `motion-reduce:` Variante.

---

## Inhalt + Animations-Design

### 1. Dashboard (Feature)

**Struktur:** `flex flex-col` Container — Header-Row + 4 Daten-Rows.

**Header-Row:** `flex` mit `flex-1` pro Spalte, `bg-[#F9FAFC]` als einziger Wrapper (kein Durchscheinen).

**Spalten:**
- `Teams` — immer sichtbar
- `SWOT` — `hidden md:block` (ab `md:` sichtbar)
- `OKR Score` — immer sichtbar
- `Top 6` — `hidden md:flex` (ab `md:` sichtbar)

**Mobile:** nur Teams + OKR Score sichtbar.

**Animationsschritte (via `playDemo`):**
1. Zeilen erscheinen gestaffelt (stagger 80 ms, `data-[in]:opacity-100 data-[in]:translate-y-0`)
2. OKR-Balken füllen sich (`width: 0 → var(--w)`, `transition-[width] duration-1000`)
3. Prozentzahlen zählen von 0 auf Zielwert hoch (rAF-Counter)
4. Mini-Bar-Charts wachsen (`height: 0 → var(--h)`, stagger 40 ms)

JS-Klassen: `.js-fill`, `.js-num`, `.js-bar`

**SWOT-Chips:** 2 Reihen, 5 Farbtöne (Strengths grau · Weaknesses amber · Opportunities emerald · Threats rose · n/a border)

### 2. Authentifizierung (Feature)

Zentriertes Login-Panel (max-w-xs):
- Alignment-Logo (`/assets/logos/alignment.png`) + Name oben
- «Sign in with Google» + «Sign in with Apple» Buttons (zentriert)
- SAML SSO Button (dunkel)
- «✓ Authenticated» Badge (emerald, `scale(0.8)→1`)

Animationsschritte: Logo → Buttons gestaffelt (stagger 120 ms) → SAML → Success-Badge (delay 700 ms)

JS-Klasse: `.js-auth-el`, `.js-auth-success`

### 3. RBAC (Feature)

Members-Panel mit Header + 3 User-Zeilen + Toggle:
- Nick Nikolaev (project owner · brand)
- AI Assistant (full access · violet)
- Sara M. (view only · slate)
- Shareable-Link-Toggle OFF → ON (brand, `translateX(16px)`)

Animationsschritte: Header → User-Zeilen gestaffelt (stagger 110 ms, von links) → Badges locken → Toggle flippt (delay 900 ms)

### 4. Suche (Feature)

Suchfeld + Tabs + Ergebnis-Zeile:
- Typewriter: «exec» (90 ms/Zeichen, Caret blinkt)
- Tabs: All / Projects / Messages / Items (stagger 60 ms)
- Ergebnis: «Exec | Q2 2026 OKR Apple» + «Is the software stable and predictable? Who tested it?»
- Match-Highlight: «Exec» leuchtet auf (brand/18 background, delay 950 ms)

### 5. Release-Verwaltung (Prozess)

3 Kanban-Spalten: TODO (slate) · QA (sky) · DONE (white):
- Spalten erscheinen gestaffelt (stagger 100 ms)
- Karten erscheinen gestaffelt (stagger 80 ms)
- Karte #3 wandert sichtbar von QA → DONE (translateX-Animation, delay 600 ms)
- DONE-Spalte bekommt grünen Flush (`rgba(16,185,129,.12)`, delay 760 ms)

### 6. KI-Chat-System (Feature)

Split-Layout: linkes OKR-Panel + rechter Chat-Sidebar:
- Links: «Apple OKR · Q2» mit 3 Fortschrittsbalken (79 / 82 / 85%)
- Rechts: User-Frage «How are we tracking on the Apple OKR this quarter?» → Typing-Indicator → AI-Antwort gestaffelt
- Chat-Reply: «3 of 4 KRs on track» · «Risk: QA sign-off pending» · «Next: lock SSO rollout»

Animationsschritte: linkes Panel (scale) → Sidebar von rechts → User-Frage → Typing (bouncing dots) → Antwort-Zeilen gestaffelt (stagger 80 ms)

---

## Layout

| Aspekt | v1 | v2 |
|--------|----|----|
| Bild | `<img>` seitlich | kein Bild |
| Demo-Panel | — | `aria-hidden`, oben in der Karte |
| Karten-Layout | `sm:flex-row` | `flex-col` |
| Scroll-Reveal | keins | Tailwind `data-[in]:` via IntersectionObserver |
| CSS | — | reines Tailwind, kein `<style>`-Block |

---

## Tech Stack

Logos under `/assets/logos/tech/` (Simple Icons; AWS vo Devicon).

| Technologie | Logo |
|-------------|------|
| Node.js | `/assets/logos/tech/nodejs.svg` |
| MySQL | `/assets/logos/tech/mysql.svg` |
| AWS | `/assets/logos/tech/aws.svg` |
| Git | `/assets/logos/tech/git.svg` |
| Docker | `/assets/logos/tech/docker.svg` |
| JavaScript | `/assets/logos/tech/javascript.svg` |
| HTML | `/assets/logos/tech/html.svg` |
| CSS | `/assets/logos/tech/css.svg` |
| Tailwind | `/assets/logos/tech/tailwind.svg` |

*Nicht i v1/v2:* Postgres, MSSQL, Snowflake, SQL — bewusst weggloh.

---

## Fertig wenn

- [x] Sektion uf `index.astro` mit `id="work"` + `Work.astro`-Komponente
- [x] Überschrift «Mini Arbeit bi Alignment.io»; Untertitel Features + Prozäss
- [x] Sektionslabel: `03 — ARBEIT`; FAQ wird `04`
- [x] Nav-Link zu `/#work` in `Nav.astro`
- [x] Link «Mehr zu meiner Arbeit →» scrollt korrekt
- [x] Kein `<img>` mehr — jede Karte het e animiertes Demo-Panel (`aria-hidden`)
- [x] Scroll-Reveal via Tailwind `data-[in]:` + IntersectionObserver (one-shot)
- [x] Scale-Entrance fürs Demo-Panel (`scale-95 → scale-100`)
- [x] Dashboard: flex-Layout, Header `bg-[#F9FAFC]`, Zeilen-Stagger + Balken-Fill + Zahl-Counter + Bar-Charts
- [x] Dashboard Mobile: SWOT + Top 6 `hidden`, nur Teams + OKR Score sichtbar
- [x] Authentifizierung: echtes Alignment-Logo + OAuth-Buttons zentriert + SAML + Success-Badge
- [x] RBAC: User-Zeilen gestaffelt + Rollen-Lock + Toggle-Flip
- [x] Suche: Typewriter «exec» + Tabs + Ergebnis + Highlight
- [x] Release-Verwaltung: Kanban-Spalten + Karte wandert → Done
- [x] KI-Chat-System: Split-Panel + Apple-OKR-Kontext + Typing-Indicator + gestaffelte Antwort
- [x] Jede Tech-Stack-Eintrag het sis Logo (kompakt: `px-2.5 py-1.5 text-xs`)
- [x] Release-Verwaltig als «Prozess» markiert, Rest als «Feature»
- [x] Läsebar uf Mobile, Ton wie Rest vom Portfolio
- [x] `prefers-reduced-motion`: alli Animationen via `motion-reduce:` Tailwind-Variante deaktiviert
