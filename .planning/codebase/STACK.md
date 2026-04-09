# Technology Stack

**Analysis Date:** 2026-04-08

## Languages

**Primary:**
- JavaScript (ES5 + ES6 class syntax mixed) - All game logic, simulation, UI, rendering
- HTML5 - Single-page application structure (`index.html`)
- CSS3 - All visual styling with CSS custom properties

## Runtime

**Environment:**
- Browser-only. No Node.js runtime required for the game itself.
- Static file serving is sufficient (Python `http.server` used for local dev per README).

**Package Manager:**
- npm (dev tooling only).
- `package.json` + `package-lock.json` are present for test/lint automation.
- Runtime game dependencies remain browser-native (no bundling required).

## Frameworks

**Core:**
- None. Vanilla JavaScript only — no React, Vue, Angular, or similar.

**Rendering:**
- HTML5 Canvas 2D API - Active rendering path for reactor visualization (`js/3d-viewport.js`)
- No active Three.js integration in the current codebase

**Audio:**
- Web Audio API (browser-native) - Procedural sound synthesis for alarms, clicks, success tones
  - No audio files. All sounds generated via `OscillatorNode` + `GainNode`.

**Build/Dev:**
- No bundler/build toolchain. Files are served directly as-is.
- Local dev: static server (`python -m http.server 8080` documented in README)
- QA tooling: ESLint + Node test runner via npm scripts

## Key Dependencies

**Critical:**
- Browser APIs only for runtime (Canvas 2D, Web Audio API, localStorage)

**Infrastructure:**
- Dev dependency: `eslint` (quality checks only)
- Runtime remains zero external CDN and zero server dependencies

## Configuration

**Environment:**
- No environment variables. No `.env` files present.
- Language selection (`window.selectedLanguage`) is set at runtime via the intro screen and stored as a global.

**Build:**
- No bundler config files (`webpack.config`, `vite.config`, `tsconfig`, etc.).
- Script load order in `index.html` remains critical:
  1. `reactor-simulation.js`
  2. `3d-viewport.js`
  3. `sound-system.js`
  4. `ui-controller.js`
  5. `event-system.js`
  6. `manual-content.js`
  7. `intro-system.js`
  8. `main.js`

## Platform Requirements

**Development:**
- Any static file server (Python, Node `http-server`, Live Server VSCode extension, etc.)
- Modern browser with Web Audio API and Canvas 2D support

**Production:**
- GitHub Pages (static hosting) via `.github/workflows/deploy.yml`
- No server-side logic whatsoever — pure client-side SPA
- Deployed URL: `https://pecoits.github.io/game-reator/`

---

*Stack analysis: 2026-04-08*
