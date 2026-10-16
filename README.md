# CyberKids — Play. Discover. Protect.
*FR: Joue. Découvre. Protège. · AR: العب. اكتشف. احمِ.*

A free, no-account cybersecurity playground for children aged 6–12, by **Junior Securinets at ISI**.
Meet **Byte**, explore five worlds, play mini-games, code with blocks and hunt beginner CTF flags (`JSEC{...}`).

## Run it
No build step, no dependencies, no backend.

- **Double-click `index.html`**, or
- serve the folder: `python3 -m http.server 8000` then open <http://localhost:8000>

## Publish on GitHub Pages
1. Create a repository and push this folder to the `main` branch.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
3. The included workflow (`.github/workflows/pages.yml`) deploys automatically. All paths are relative, so it works under `https://<user>.github.io/<repo>/`. Routing uses `#/hash` URLs, so refreshing never gives a 404.

Prefer one file? `python3 tools/build-standalone.py` creates `dist/cyberkids-standalone.html` (everything inlined).

## Works on all devices
Responsive from small phones to desktops, touch-friendly (tap-to-add blocks, on-screen D-pad), keyboard playable (arrows/WASD, Tab focus, visible focus), reduced-motion respected, installable as an app (PWA manifest + offline service worker when served over https/localhost).

## What is inside
| Area | Details |
|---|---|
| Languages | English, Français, العربية with true RTL; switch instantly, saved in the browser |
| Themes | Light "sunny sky" and dark "night lab"; follows the OS until you choose; saved |
| Worlds | Internet Forest, Password Castle, Phishing City, Secret Laboratory, Cyber Defense Academy: 10 missions |
| Mini-games | Password Lab, Phishing Detective, Secret Message Decoder, Cyber Maze, Safe or Suspicious?, Build Your Own Firewall, Find the Hidden Flag, Code Blocks Maze |
| Block coding | Move/turn/repeat/if-else/collect blocks, Run + Step + Reset, 5 levels, tap or drag |
| CTF | 12 challenges, 6 categories, easy/medium/challenge, 3 progressive hints, retries, explanations |
| Library | 12 illustrated lessons with a quick quiz and a related mission |
| Progress | XP, levels, stars (effort based), 7 badges, avatar + nickname, reset button, all in `localStorage` |

## Safety and privacy
No accounts, ads, analytics, chat or external requests (system fonts only, no CDN). Passwords typed in Password Lab are never stored or sent. All scenarios, domains and flags are fictional.

## Project structure
```
index.html  manifest.webmanifest  sw.js
css/styles.css           design system, themes, RTL
js/i18n.js, i18n-extra.js  translation core + UI strings (EN/FR/AR)
js/content.js, content2.js worlds, missions, game data, CTF, library (all T(en,fr,ar))
js/store.js              local progress, XP, badges, unlock rules
js/art.js                SVG art: Byte, icons, scenes, avatars, map
js/engine.js             maze board + restricted block interpreter + editor
js/games.js              mini-games, quiz engine, CTF widgets
js/app.js                router, views, onboarding, celebrations
```
Add content by editing `content*.js`; add a language by adding a third/fourth value in each `T(...)`.

## Safety of the block editor
Blocks are data (`{t:'move'}` …). The interpreter only knows six node types, clamps loop counts (1–20), limits nesting and total steps (300). Nothing is `eval`'d.

## Known limitations (honest list)
- Built with plain HTML/CSS/JS, **not** React/TypeScript/Vite/Blockly: the build environment had no network access to install packages. The block system is a restricted drag/tap editor with an extensible node model, not Google Blockly.
- CTF flags are checked in the browser (visible to anyone reading the source). For real events, move validation to a server.
- Translations were written carefully but deserve a review by native-speaking teachers.
- The Arabic/French CTF acrostic uses Latin letter tiles on purpose so the flag stays `JSEC{SMART}`.
- Tested in Chromium (desktop + 390px mobile, EN/FR/AR, light/dark); not yet on real Safari/Firefox/iOS devices.
- If accounts or analytics are ever added, review child-privacy law and parental consent first.

Logo: the supplied CyberKids artwork is in `assets/logo.jpeg`; replace the file to rebrand.
