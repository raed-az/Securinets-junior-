# CyberKids — Play. Discover. Protect.
*FR: Joue. Découvre. Protège. · AR: العب. اكتشف. احمِ.*

A free, static, no-account cybersecurity learning site by **Junior Securinets at ISI**, in **English, Français and العربية (RTL)**.
Two interfaces share one design system and one translation system:

| | **Kids (6–12)** | **College students** |
|---|---|---|
| Look | Colorful, playful, Byte-led | Calm "terminal lab" (paper / green-night) |
| Core | 5 worlds + map (prerequisites, final challenge, side quests), 10 missions, 8 mini-games, block coding, 12 CTF, library | **Introduction to Cybersecurity** (12-module course + final assessment + report), Linux & Kali (8 modules), Terminal Lab (12 tasks), 14 Pro CTF (campaign + demo leaderboard) |
| Shared | Cyber Detective (3 cases), Cyber Defense Simulator, Creator Studio (mazes + quizzes, JSON import/export), Cyber Safety Passport, Trophy Room (badges, daily/weekly quests, learning-days count), Byte hints and recommendations |

## Run locally
No build step, no dependencies. Double-click `index.html`, or `python3 -m http.server 8000` and open <http://localhost:8000>.
`python3 tools/build-standalone.py` creates one self-contained file in `dist/`.
Validate translations: `node tools/check-i18n.js`.

## Deploy on GitHub Pages
1. Push this folder to a repository (branch `main`).
2. **Settings → Pages → Source: GitHub Actions.** The workflow `.github/workflows/pages.yml` syntax-checks the scripts and publishes the site.
3. It works at `https://<user>.github.io/<repo>/`: all paths are relative, routing uses `#/hash` URLs (refresh never 404s), and `sw.js` uses relative scope with a versioned cache (`cyberkids-v3`, network-first, so users are not stuck on old files). No secrets, keys or backend are used.
Tested by serving the project from a sub-folder (`/my-repo/`) over HTTP: navigation, deep links, refresh, service worker and zero 4xx responses.

## Course (College mode)
12 modules (What is cybersecurity → CIA triad → threats → passwords → networks → cryptography → OS security → web security → forensics/IR → privacy/ethics/law → security in the real world → careers). Each has objectives, expandable explanation, glossary, activity, 2-question knowledge check with explanations, summary, complete button (needs the knowledge check), previous/next. Special activities: password-strength tool, encoding/hash/toy-cipher demo, log investigation + incident report. Byte gives 3 progressive pre-written hints and recommends modules from your local quiz mistakes (not an AI chatbot). Law module avoids legal provisions and points to current Tunisian legislation, official sources and your institution.

## Data and privacy
Everything is stored in this browser only (`localStorage`, versioned, validated on load, migrated from v1 without losing progress). It does not sync across devices. The dashboard offers export/import (JSON) and confirmed reset; a warning appears if storage is blocked. Passwords typed into tools are never stored or sent. Certificates/reports/passport are **self-generated, editable and not official or verified**; no QR codes are used.

## Simulations (no backend exists)
Terminal Lab and terminal CTFs (whitelisted parser over a fake filesystem, nothing executes on your device, `nmap` only "scans" fictional 10.0.0.5), Defense Simulator, Detective cases, network/log/packet exercises, the CTF leaderboard (demo names/scores), and flag checking (done in the browser, so flags are readable in the source; use a server for real events).

## Structure
```
index.html, manifest.webmanifest, sw.js, css/styles.css, assets/
js/i18n*.js  translation core + UI strings (EN/FR/AR)     js/content*.js, course.js  data
js/store.js  progress (validated, versioned)               js/engine.js, terminal.js, games.js  engines
js/modules.js course, report, passport, trophies           js/detective.js, defense.js, studio.js, extras.js
js/app.js    router, nav, onboarding, dashboard            tools/check-i18n.js, build-standalone.py
```

## Test report (what was actually run)
Automated Chromium (Playwright) runs, desktop and phone viewports:
- **Passed:** kids onboarding, missions, password/phishing/decoder/maze/blocks games, CTF; college onboarding, Linux modules, 12 terminal tasks, all 14 Pro CTF flags; course module flow (hints, wrong-answer explanations, quiz gating, completion, persistence), special activities, final assessment, report, passport, trophies; Detective good/bad endings + replay; Defense simulator report; Studio create/save/test/export, valid and invalid imports, quiz creator; progress export/import/confirmed reset; modals close with Esc and on navigation; sub-path deployment and refresh.
- **Translations:** `tools/check-i18n.js` checked 1,552 triples (EN/FR/AR): no empty values or placeholder mismatches, all used keys exist. A runtime scan of 33 pages × 3 languages found no raw keys on screen.
- **Responsive:** no horizontal overflow at 320, 375, 768, 1024, 1440 and 1920 px on all tested pages (18 college + 15 kids routes) in EN/FR/AR. Arabic RTL was checked visually on several pages.
- **Not performed:** real iPhone/Android/Safari/Firefox devices, screen-reader testing, a formal WCAG audit or contrast tool, landscape-phone passes, actual printing to paper/PDF (the print stylesheet exists but was not exercised), and review of FR/AR text by native speakers.

## Known limitations
- Plain HTML/CSS/JS (no React/Vite/Blockly): the existing project already was, and the block editor is a restricted custom one.
- The `hash` router is used because GitHub Pages has no server rewrites.
- Language switching re-renders the current screen (a running game/terminal restarts).
- Course content is introductory and should be reviewed by an instructor before classroom use.
