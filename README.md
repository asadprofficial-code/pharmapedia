# PharmaPedia Match (Demonstration)

A 2D educational pharmacy game for the Pharm-D IT lab (Assignment 2, Option B).
**Student project for the Pharm-D, IT lab. Not medical advice.**

## How to run
- **Offline:** download the repo and double-click `index.html`. No internet or installation needed.
- **Online:** enable GitHub Pages (Settings → Pages → Branch: `main`, folder `/root`). The game opens on laptop and mobile.

## Features
- Start screen with disclaimer, how-to-play, Study Cards and Sources
- Play screen: 15 rounds (one per medicine), 4 options each
- Instant right/wrong feedback with the explanation after every answer
- Score (+10 per correct answer, +5 streak bonus from 3 in a row), star rating and full review at the end
- Study Cards: flip cards to learn all 15 medicines before playing
- Works on mobile and laptop; keyboard keys A–D / 1–4 also work
- No login, no sign-up, nothing saved or sent

## Assignment requirements
| # | Requirement | Where |
|---|---|---|
| 1 | Start screen and play screen | `#screen-start`, `#screen-play` (+ study & results) |
| 2 | 15 items | `data.js` – 15 medicines |
| 3 | Scoring with feedback after each answer | `game.js` → `answer()` |
| 4 | Visible disclaimer on the start screen | Start screen + footer on every screen |
| 5 | Nothing collected from the user | No forms, no storage, no network calls |

## Editing the pharmacy content
All content is in **`data.js`**. Check every medicine against your notes / reference book,
correct anything that differs, and write your real sources in `SOURCES`.

## Presentation
`presentation/StudentID_Name_AIProject.pptx` and `.pdf`: 8 slides with real screenshots.
Fill in your name, ID, class and source details, then rename the file.
