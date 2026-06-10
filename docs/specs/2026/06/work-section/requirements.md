# Work Section — Requirements

**Status:** Umgesetzt (v1)

## Ziel

Neui Sektion **«Mini Arbeit bi Alignment.io»** uf de Startsite: zeigt, **welchi Features und Prozäss** Nick bi Alignment.io entwicklet het — d Firma sälber blibt i **02 — Erfahrung**.

Zielgruppe: Recruiter und Gründer vo Early-Stage-Startups.

`Experience.astro` verlinkt uf `#work` — die Sektion erfüllt die Erwartig.

Umsetzig: `Work.astro`, iigbunde in `index.astro` zwüsche Experience und FAQ.

## Inhalt

**v1: nur Alignment.io — 5 Features + 1 Prozess**

### 1. Dashboard (Feature)
- **Bild:** `/assets/images/work/dashboard.png`
- **Beschribig:** Dashboard-Arbeitsbereich workspace-wide vo Figma-Design bis zum fertige Feature — für vierteljährigs Alignment-Tracking.

### 2. Authentifizierig (Feature)
- **Bild:** `/assets/images/work/authentication.png`
- **Beschribig:** Authentifizierigs-Flows umgesetzt: SAML SSO, Google OAuth und Apple OAuth.

### 3. RBAC (Feature)
- **Bild:** `/assets/images/work/rbac.png`
- **Beschribig:** Zugriffssteuerig workspace-wide, team-wide und project-wide.

### 4. Sueche (Feature)
- **Bild:** `/assets/images/work/search.png`
- **Beschribig:** Globali Sueche powered by ElasticSearch für alli Nachrichte, Items und Projekt.

### 5. Release-Verwaltig (Prozess)
- **Bild:** `/assets/images/work/kanban.png`
- **Beschribig:** QA- und Release-Prozäss; 5-köpfigs Team i eme Agile-Umfeld gleitet.

### 6. KI-Chat-System (Feature)
- **Bild:** `/assets/images/work/chat.png`
- **Beschribig:** Plattformwiiti sicheri Zämearbeit — Echtziit-AI-Chat-System entwicklet; Entwicklig vo ere Mobile-App unterstützt und koordiniert.

Weiteri Projekt, EN-Übersetzig: **später**, nöd i v1.

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

*Nicht i v1:* Postgres, MSSQL, Snowflake, SQL — bewusst weggloh.

## Fertig wenn

- [x] Sektion uf `index.astro` mit `id="work"` + `Work.astro`-Komponente
- [x] Überschrift «Mini Arbeit bi Alignment.io»; Untertitel Features + Prozäss
- [x] Sektionslabel: `03 — ARBEIT`; FAQ wird `04`
- [x] Nav-Link zu `/#work` in `Nav.astro`
- [x] Link «Mehr zu meiner Arbeit →» scrollt korrekt
- [x] Jedes Feature/Prozess het e eigeni Beschribig + Bild
- [x] Jede Tech-Stack-Eintrag het sis Logo
- [x] Release-Verwaltig als «Prozess» markiert, Rest als «Feature»
- [x] Läsebar uf Mobile, Ton wie Rest vom Portfolio