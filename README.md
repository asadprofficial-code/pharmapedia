# PharmaPedia (Demonstration)

> **Student project for the Pharm-D, IT lab. Not medical advice.**

PharmaPedia (Demonstration) is an educational pharmacy website built for the Pharm-D IT lab assignment (Option A: pharmacy-related website). Students can explore 20 medicines and test themselves with a practice quiz.

## Features

| Page | What it does |
|------|--------------|
| **Explorer** | Search by name, class or use · filter by body system (dropdown or chips) · sort A→Z, Z→A, by class or by body system · flip a card with **Show mechanism** to see the mechanism of action and adverse effect |
| **Practice Quiz** | Start screen → 10 multiple-choice questions → instant feedback after each answer → final score with review |
| **About & Sources** | Project purpose, sources of the pharmacy content, AI declaration, privacy and safety notes |

**Animations** (pure CSS + vanilla JS): staggered card slide-in, hover lift with soft glow, 3D card flip, fade between pages, smooth filtering, green pop for a correct answer, shake for a wrong one, animated progress bar, score count-up with a ring, and confetti for 80% or more. Everything respects `prefers-reduced-motion`.

**Also:** light and dark mode, mobile responsive, keyboard accessible.

## Assignment minimum requirements

| # | Requirement | How it is met |
|---|-------------|---------------|
| 1 | Two or more pages with a working menu | Explorer, Practice Quiz, About & Sources |
| 2 | 15 or more pharmacy items | 20 student-written medicines |
| 3 | A feature that responds to the user | Search, filter, sort, card flip, scored quiz |
| 4 | Disclaimer on every page | Banner at the top and in the footer of every page |
| 5 | No login, sign-up or data collected | No forms, no name boxes, no storage, no network requests |

## Tech

- HTML5, CSS3 and vanilla JavaScript in a **single `index.html`** file
- No frameworks, no CDN, no external fonts, so it **works fully offline**
- Hosted on GitHub Pages

## Pharmacy content and accuracy

All medicine content (name, class, body system, use, mechanism of action, adverse effect) was **written and checked by the student**, then pasted into the `MEDICINES` list at the top of the `<script>` in `index.html`. The AI tool was used only for layout, styling, animation and logic. It was **not** used to supply any dose, strength, frequency, interaction, contraindication or schedule.

Quiz questions are **generated automatically from the `MEDICINES` data**, so every correct answer comes from the student's own content.

## Sources

<!-- Replace these with the exact books/websites you used (edition and page numbers if possible) -->
1. _Add source 1 (e.g. textbook title, edition, pages)_
2. _Add source 2_
3. _Add source 3_

## Run it

- **Online:** GitHub Pages → `https://asadprofficial-code.github.io/pharmapedia/`
- **Offline:** download `index.html` and double-click it. No internet is needed.

## Disclaimer

Student project for the Pharm-D, IT lab. Not medical advice. This website is for education only. It does not give individualised treatment recommendations and is not the website of any real pharmacy, hospital or company. No real patient information is used and no user data is collected.
