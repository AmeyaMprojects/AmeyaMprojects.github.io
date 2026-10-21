# Ameya Mhatre: design record

## Brief
- Subject: Ameya Mhatre, software engineer, B.Tech CS (Data Science) at MIT Bengaluru, from Mumbai.
  Builds multi-agent LLM pipelines, quantitative tools, and does security audits (NIST CSF, ISO 27001).
- Audience: recruiters and engineering leads hiring interns and new grads; collaborators.
- Job: get hired. Show three real projects with substance, the Mastek internship, the IEEE role.
- Source: the existing site at `../portfolio-website` (projects, timeline, skills, contact, Substack posts).
- Assets: three real app screenshots, résumé PDF, a portrait (unused: 224 px, too small for the system).

## Concepts

| | Idea | Anchor | Signature | O / F / Fe / P |
|---|---|---|---|---|
| A. Name | *Ameya* (Sanskrit अमेय) means "immeasurable". The site is a precision instrument that measures everything, and fails on exactly one thing: the name | the name's meaning, and that every project he built measures something (IPO value, contract surplus, risk to reward, compliance) | a live dimension line on the hero name, whose width never holds still, so the readout never settles; the same caliper measures whatever you point at | 5 / 5 / 4 / 1 |
| B. Material | The site is a LangGraph state graph: each section is a node, a state object passes through on scroll | multi-agent pipelines | nodes light up as the state reaches them | 3 / 4 / 4 / 4 |
| C. Place | Mumbai suburban railway: sections are stations on the Western line | Mumbai | a train passes on page transitions | 3 / 2 / 3 / 3 |

Pick A: the name, the work and the person agree; nobody else can carry it (swap "Ameya" out and the joke dies).
Steal from C: nothing. Steal from B for the case pages: "Craft" lists read like node outputs. (Not used: kept quiet.)

## Concept card
```
Idea:        Ameya means "immeasurable"; his work is measuring things. The site measures everything except him.
Metaphor:    a metrology bench: vernier caliper, dimension lines, inspection marks, drafting film.
Signature:   hero name in Archivo whose width axis drifts (time + pointer); a dimension line above reads its
             width live and never settles. One shared caliper overlay then travels to and brackets any primary
             target you point at, reading its width.
Emotion:     precise, dry, a little funny. "This person is exact, and knows it."
Motion verb: travel to the mark, then read. Movement decelerates hard onto a line (expo.out), then a number ticks.
Screenshot:  the giant name mid-stretch under a red dimension line reading "1 184.6 px", gloss beneath.
```

## System
**Palette** (drafting film, graphite, inspection red)
- ground `#E8EAE5` vellum (cool drafting film; not cream)
- ink `#121413` graphite
- muted `#555B57` (5.6:1 on ground)
- line `rgb(18 20 19 / 0.16)`
- accent `#B02D15` inspection red (5.0:1 on ground): dimension lines, readouts, focus ring. Never fills.
- curtain `#121413`

**Type**
- Archivo variable (wdth 62 to 125, wght 100 to 900): display (wght 800, wdth driven), headings (wdth 112), text (wdth 100, 400).
- IBM Plex Mono 400/500: rule, mono means *a measured value*: numbers with units, dates, counts. Never for plain labels.
- Display tracking -0.04em, leading 0.82. Body 17 px / 1.55.

**Grid**: 12 columns, gutter = outer margin. Three hanging lines: col 1, col 5, col 9. Section rhythm: hero full viewport, work normal, practice airy, record tight, writing normal, footer full.
**Shape**: radius 0 everywhere. Hairlines 1 px.
**Motion**: ease `expo.out` arrive, `expo.inOut` curtain. Hover 0.35 s, readout ticks 0.6 s.
Treatments: (1) primary targets: the caliper travels to them and reads; buttons additionally flood ink.
(2) nav: underline draws, current page keeps it. (3) inline links: underline at rest, rises.
(4) project rows: caliper + specimen preview. Utility (socials in footer small print): color only.

**Continuity**: loader is a ruler calibrating 000→100 on the same vellum; its baseline becomes the hero dimension line.
Page transition: an ink jaw slides across left to right with a tick scale on its leading edge (caliper jaw closing),
carrying the destination title in mono.

## Composition plan
```
HERO (poster)          [Ameya Mhatre]                       [Work About Writing Contact]
                       |<------------- 1 184.6 px ------------->|
                       A M E Y A   (mega, width drifting)
                       amēya, adj. (Sanskrit): that which cannot be measured.   [lead on cols 9-12]
                       [Software engineer, Mumbai and Bengaluru]             [Résumé PDF]
WORK (index list)      Work                          what it measures           reading
                       ───────────────────────────────────────────────────────────────
                       Indian IPO Analyzer           an IPO against its band     5 agents
                       NBA Contract Analyzer         pay against play            101 players
                       Swing screener                risk against reward         500 → 59
                                        (specimen preview follows pointer, desktop)
PRACTICE (statement)   big paragraph cols 1-10, then three tolerances hung on cols 1/5/9
RECORD (ruler)         horizontal time ruler 2024 ... 2028, spans as bars with measured durations
                       facts: 8.4 CGPA | 15+ members | 200+ attendees
WRITING (rows)         date | title | publication
FOOTER (finale)        "Email me" at xl, caliper on hover; links; colophon
CASE PAGE              title wide; meta grid; specimen screenshot w/ dimension annotations;
                       context / idea / craft / outcome on col 5 line; next project giant
404                    "Out of range." ruler reading "— px", way home
```

## Genericness test
- Mono-everything label chrome (a generic "tech precise" tell): restricted mono to measured values only.
- Eyebrow above every heading: removed; section headings are plain Archivo with a mono count only where real.
- Dark tech palette + green signal (what a generic model lands on for an engineer): replaced with vellum + inspection red.
- 01/02/03 on projects: not a sequence, no numbers. The timeline uses real dates instead.

## Idle
The hero name keeps drifting in width at rest (idle clock + lagged pointer), and the readout keeps reading it.
Paused when the hero is off screen; frozen under reduced motion (name at wdth 100, readout shows one real reading).

## Decisions made in QA
- Loader plays once per session, on the home page, desktop only (0.35 to 0.8 s of calibration). Phones, deep links
  and repeat visits remove the node before first paint.
  The vellum sheet slides off to the right like a jaw opening; the hero name then rises at full stretch.
- Inner pages (case studies, 404) are still at rest by decision: the hero name is the one thing that breathes.
  Life on inner pages comes from the caliper, which answers every primary target.
- Case screenshots are capped at their real 1200 px width, so the dimension line reads the truth.
- Work rows carry their screenshot inline (desktop and phone); the floating cursor preview was cut as the accessory.
- Caliper bar sits below targets that have a label directly above them (case-page buttons, next project).
- After a page change the hero ruler is already drawn; only the first visit draws it out from zero.
- 404 lists the three instruments as ways out.
