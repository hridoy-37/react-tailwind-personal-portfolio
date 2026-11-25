# hridoy-dev-portfolio

Personal portfolio of Mostafa Ryhan Hridoy, styled as a terminal / code editor.
React 19 + Vite (rolldown) + Tailwind CSS v4.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run lint
```

The contact form sends through EmailJS. Set these in `.env.local`:

```
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
VITE_EMAILJS_PUBLIC_KEY=...
```

## Updating content

All copy lives in `src/data/`. Components only render it, so most edits never touch JSX.

| What                                  | File                     |
| ------------------------------------- | ------------------------ |
| Name, contact, summary, stats, socials | `data/profile.js`        |
| Skills (grouped, with code comments)  | `data/skills.js`         |
| Jobs                                  | `data/experience.js`     |
| Projects (`featured: true` = big card) | `data/projects.js`       |
| Testimonials                          | `data/testimonials.js`   |
| Section order + nav labels            | `data/navigation.js`     |
| Shell / prompt flavour text           | `data/site.js`           |

Keep `data/profile.js` in sync with `public/CV-Mostafa-Ryhan-Hridoy.pdf`.

Images: use WebP sized for 2× the displayed size. Project screenshots go in `public/projects/`:

```bash
magick screenshot.png -resize '1280x>' -strip -quality 78 public/projects/name.webp
```

`public/og-image.png` (1200×630) is the link preview for LinkedIn, X, Slack and so on. Regenerate it
if your name, role or photo changes.

## Structure

```
src/
  data/          content (see above), re-exported from data/index.js
  components/    reusable UI: Section, Window, CodeBlock, Reveal, PulseDot, SocialLinks, ...
    command-palette/   ⌘K palette + its command list
  layout/        Navbar, Footer, StatusBar
  sections/      one folder per page section, each with its own sub-components
    shell/       interactive shell: command registry, session hook, input, output primitives
  hooks/         generic hooks (useEventListener, useInView, useTypewriter, ...)
  context/       UI state shared across the app (CRT mode, Matrix rain, palette open)
  services/      external calls (EmailJS)
  utils/         small pure helpers (dom, format, search, actions)
```

Imports use the `@/` alias for `src/` (configured in `vite.config.js` and `jsconfig.json`).

## Theming

Dark and light themes. Visitors follow their OS setting until they choose one with the navbar
toggle, the command palette, or `theme light|dark|system` in the shell; the choice is saved.

- Colours are semantic tokens (`--background`, `--primary`, …) defined once per theme in
  `src/index.css` under `[data-theme="dark"]` and `[data-theme="light"]`. `@theme inline` maps them
  to Tailwind utilities, so `bg-card`, `text-primary` etc. switch automatically.
- Use tokens, not raw colours, in components. Every text token meets WCAG AA (4.5:1) on
  background, card and surface; re-check contrast if you change one.
- Any element can pin a theme with `data-theme="dark"` (the Matrix overlay does this).
- Logic lives in `src/theme/theme.js` and `context/ThemeProvider.jsx`. A small inline script in
  `index.html` applies the theme before first paint; keep its storage key in sync with
  `STORAGE_KEY`.

## Common tasks

**Add a section.** Add `{ id, file }` to `data/navigation.js` at the position you want, create
`sections/<id>/<Name>.jsx` that renders `<Section id="<id>" command="..." subtitle="...">`, and
register it in `SECTION_COMPONENTS` in `App.jsx`. The navbar, palette, shell `ls`/`cd` and the
`0x0N` heading number update automatically.

**Add a shell command.** Append an object to `COMMANDS` in `sections/shell/commands.jsx`
(the format is documented at the top of that file). `help` and Tab completion pick it up.

**Add a palette action.** Add an entry in `components/command-palette/usePaletteCommands.js`.

## Easter eggs

`⌘K` / `Ctrl+K` command palette · the Konami code · hidden shell commands (`sudo`, `matrix`,
`crt`, `coffee`, `vim`, ...) · a message in the devtools console.
