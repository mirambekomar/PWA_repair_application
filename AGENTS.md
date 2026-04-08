# AGENTS.md

## Cursor Cloud specific instructions

This is a zero-dependency static PWA (Progressive Web App) — a factory equipment maintenance data collection form ("Ремонтная Служба"). There is no package manager, no build step, no backend, and no database.

### Running the app

Serve the repository root with any static HTTP server. Service Workers require HTTP (not `file://`).

```
python3 -m http.server 8080 --directory /workspace
```

The app is then available at `http://localhost:8080`.

### Key files

| File | Purpose |
|---|---|
| `index.html` | Single-page form with inline CSS |
| `script.js` | Form handler (mock submit via `setTimeout`) |
| `manifest.json` | PWA manifest |
| `sw.js` | Service Worker for offline caching |

### Lint / Test / Build

There are no lint, test, or build configurations in this project. Static HTML/JS only.

### Notes

- Form submission is a client-side stub; no real backend call is made.
- The service worker caches `index.html`, `script.js`, and `manifest.json` for offline use.
