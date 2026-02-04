# ANOMEN-2 Portfolio

This is a design-focused portfolio demonstrating theme switching with CSS design tokens and localStorage persistence.

## Design Tokens System

This project uses **CSS Custom Properties** (variables) to manage all colors, spacing, and typography. This makes the design system flexible and maintainable.

### Token Structure (see `css/variables.css`)

**Color Primitives** — Base colors that everything else references:
- Neutrals: `--color__neutral__50` (cream), `--color__neutral__70` (gray), `--color__neutral__90` (dark), `--color__neutral__100` (black)
- Brand: `--color__red__51` (bright red for hover states)

**Semantic Tokens** — Meaningful names that describe *purpose*, not color:
- `--color__bg__main` — Background color (changes with theme)
- `--color__text__primary` — Main text color
- `--color__text__muted` — Secondary text
- `--color__bg__lines__strokes` — Borders and dividers

**Theme Switching** — Two theme contexts:
- `[data-theme="light"]` — Light background, dark text
- `[data-theme="dark"]` — Dark background, light text

**Spacing & Typography**:
- Layout: `--nav-padding-*`, `--main-padding-*`, `--main-max-width`
- Text: `--font-heading`, `--font-body`, `--nav-font-size`, `--heading-size`
- Details: `--nav-letter-spacing`, `--heading-spacing`

### How It Works

1. CSS properties are set on `:root` (defaults to light)
2. When user clicks theme toggle, `main.js` changes `document.documentElement.dataset.theme`
3. CSS automatically updates all variables for the new theme
4. Theme choice saves to `localStorage` and persists on page reload

This approach separates *design decisions* (what colors/spacing we use) from *code* (where they're applied), making updates simple: change the token, it updates everywhere.

---

## Assets Folder

This folder contains all static assets for the portfolio project.

### Structure
- `images/` — Project and portfolio images
- `fonts/` — Custom and web fonts
- `icons/` — UI and navigation icons
- `favicons/` — Site favicons for browsers and devices

Add your assets to the appropriate subfolder.