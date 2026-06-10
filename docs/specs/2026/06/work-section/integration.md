# 03 — Arbeit (Work.astro) — Integration in dein Astro-Repo

Reines **Tailwind v4**, keine neuen Dependencies. Eine neue Komponente plus drei
Mini-Edits. Die Sektion wird **zwischen `<Experience />` und `<Faq />`** eingehängt.

## Dateien

| Datei (hier) | Ziel in deinem Repo | Aktion |
|---|---|---|
| `Work.astro` | `src/components/Work.astro` | **NEU** anlegen |
| — | `src/pages/index.astro` | 2 Zeilen ergänzen |
| — | `src/components/Faq.astro` | 1 Label ändern |
| — | `src/components/Nav.astro` | 1 Link ergänzen |

---

## 1. `src/components/Work.astro` — NEU

Datei 1:1 kopieren. Datengetrieben: `features[]` und `techStack[]` oben im
Frontmatter; das Markup mappt darüber. Inhalt ist final, nur **Bilder fehlen noch**.

**Screenshots einsetzen** (sobald Nick die Pfade liefert): pro Feature `image`
(+ optional `alt`) setzen, dann rendert die Karte automatisch ein `<img>` statt
des Streifen-Platzhalters:

```ts
{ title: 'Dashboard', text: '…', image: '/assets/images/work/dashboard.png', alt: 'Dashboard' },
```

**Echte Tech-Logos** (optional): `logo`-Pfad pro Eintrag setzen, dann ersetzt das
SVG das Monogramm (grayscale → Hover volle Farbe ist schon verdrahtet):

```ts
{ label: 'Node.js', mono: 'N', logo: '/assets/logos/tech/nodejs.svg' },
```

---

## 2. `src/pages/index.astro` — `<Work />` einhängen

Import oben ergänzen:

```diff
  import Experience from '../components/Experience.astro';
+ import Work from '../components/Work.astro';
  import Faq from '../components/Faq.astro';
```

Komponente zwischen Erfahrung und FAQ platzieren:

```diff
    <Experience />

+   <Work />
+
    <Faq />
```

---

## 3. `src/components/Faq.astro` — Label auf `04` umstellen

Arbeit ist jetzt `03`, FAQ rückt auf `04`:

```diff
-   <span class="font-mono text-xs uppercase tracking-[0.18em] text-slate-400">03 — FAQ</span>
+   <span class="font-mono text-xs uppercase tracking-[0.18em] text-slate-400">04 — FAQ</span>
```

---

## 4. `src/components/Nav.astro` — Link „Arbeit" ergänzen

Im `links`-Array einen Eintrag nach „Erfahrung" einfügen (greift automatisch für
Desktop- **und** Mobile-Menü, da beide über `links` mappen):

```diff
    { href: '/#experience', key: 'nav.exp',      label: 'Erfahrung' },
+   { href: '/#work',       key: 'nav.work',     label: 'Arbeit' },
    { href: '/#auswirkungen', key: 'nav.impact', label: 'Auswirkungen' },
```

> Falls du das `data-i18n`/DE-EN-System nutzt: `nav.work` noch im `I18N`-Objekt in
> `Base.astro` ergänzen (z. B. EN: „Work"). Ohne Eintrag bleibt einfach das
> `label` stehen — nichts bricht.

---

## Erledigt-wenn (aus den Requirements)

- [x] Sektion mit `id="work"` + eigene `Work.astro`-Komponente
- [x] Sektionslabel `03 — Arbeit`; FAQ wird `04`
- [x] Nav-Link `/#work`
- [x] Bestehender Link „Mehr zu meiner Arbeit →" (`href="#work"` in `Experience.astro`) scrollt korrekt hierher (`scroll-mt-16` ist gesetzt)
- [x] Jedes Feature hat eigene Beschreibung + Bild-Slot
- [x] Mobile-first, gestapelte Karten, `max-w-3xl` wie die übrigen Sektionen

## Anker-Check

`Experience.astro` verlinkt bereits mit `<a href="#work">Mehr zu meiner Arbeit →</a>`
— sobald `Work.astro` mit `id="work"` auf der Seite ist, springt der Link sauber
(dank `scroll-mt-16` ohne Verdeckung durch die sticky Nav).
