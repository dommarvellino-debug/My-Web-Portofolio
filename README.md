# webporto

A React + TypeScript landing page built around the **Skeleton Key Preloader** — a typographic collage that assembles while the page loads, then unlocks to reveal the site.

## Stack

| Tool | Version |
| --- | --- |
| React | 19 |
| TypeScript | 5.9 |
| Vite | 8 |
| Tailwind CSS | 4 (`@tailwindcss/vite`) |
| shadcn/ui structure | `components.json` (new-york, CSS variables) |
| Icons | lucide-react |

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173 (or --port 8000)
npm run build    # type-check + production bundle
npm run preview  # preview the production build
npm run lint     # oxlint
```

## Project structure

```
.
├─ components.json              # shadcn/ui config (aliases, style, css path)
├─ index.html                   # Vite entry
├─ public/
│  └─ portfolio.html            # the original static portfolio (preserved)
├─ src/
│  ├─ main.tsx
│  ├─ App.tsx                   # landing page = preloader + revealed content
│  ├─ index.css                 # Tailwind v4 import + theme tokens
│  ├─ lib/
│  │  └─ utils.ts               # cn() helper (clsx + tailwind-merge)
│  └─ components/
│     ├─ landing-page.tsx       # content revealed through the keyhole
│     └─ ui/
│        ├─ skeleton-key-preloader.tsx
│        └─ demo.tsx            # loop showcase variant
└─ ...
```

### Why `src/components/ui`?

`components.json` maps the shadcn `ui` alias to `src/components/ui`:

```json
"aliases": {
  "components": "@/components",
  "utils": "@/lib/utils",
  "ui": "@/components/ui",
  "lib": "@/lib",
  "hooks": "@/hooks"
}
```

The shadcn CLI writes primitives (button, dialog, …) into this folder and imports them as `@/components/ui/<name>`. Keeping the folder makes `npx shadcn@latest add …` deterministic and matches every shadcn example. The `@/*` alias is defined in both `tsconfig.app.json` and `vite.config.ts`.

## Using the preloader

```tsx
import SkeletonKeyPreloader from "@/components/ui/skeleton-key-preloader"

export default function App() {
  return (
    <SkeletonKeyPreloader
      durationMs={5400}
      unlock="auto"          // or "key" to make the visitor turn the key
      word="portfolio"
      name="Dominikus Marvellino"
      metal="gold"
      paper="#121316"
      ink="#e3e2e6"
      onComplete={() => console.log("unlocked")}
    >
      <YourPage />
    </SkeletonKeyPreloader>
  )
}
```

Key props: `progress` (real 0–100 load), `loop` (showcase mode), `unlock` (`"auto" | "key"`), `paper` / `ink` / `metal` (theme), `height` (default `100svh`), `onComplete`.

`children` are rendered behind the keyhole paper and become visible once the camera dives through.

## Adding more shadcn components

```bash
npx shadcn@latest add button
```

This reads `components.json` and writes to `src/components/ui/button.tsx`.

## Fresh setup (for reference)

If you were starting from an empty folder:

```bash
# 1. React + TypeScript
npm create vite@latest my-app -- --template react-ts
cd my-app && npm install

# 2. Tailwind v4
npm install -D tailwindcss @tailwindcss/vite
# add tailwindcss() to vite.config.ts and `@import "tailwindcss";` to src/index.css

# 3. shadcn (creates components.json, src/lib/utils.ts, theme tokens)
npx shadcn@latest init

# 4. Aliases (if not set by init)
#    tsconfig.app.json: baseUrl "." + paths { "@/*": ["./src/*"] }
#    vite.config.ts:     resolve.alias { "@": "./src" }

# 5. Add the preloader
#    copy skeleton-key-preloader.tsx into src/components/ui/
```

## Notes

- The original static portfolio is kept at `public/portfolio.html` and is linked from the landing page.
- Tailwind v4 is configured CSS-first (`@theme` in `src/index.css`); there is no `tailwind.config.js`.
- The preloader ships its own scoped `.skp-*` stylesheet, so it does not depend on Tailwind utilities.
- `demo.tsx` is a standalone loop-mode showcase; it is not mounted by `App.tsx`.
