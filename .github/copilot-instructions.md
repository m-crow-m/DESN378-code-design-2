# DESN 378: Code + Design 2 — AI Assistant Instructions

## Project Overview
This is a **design-focused web development course portfolio** where code is treated as a design material. The student is learning to make interactive web experiences that *feel right*, progressing from console fundamentals → theme toggle systems → animation patterns. Not a production app—it's a learning journey archived as a portfolio.

## Architecture & Conventions

### File Structure
- **Root** (`index.html`, `scripts/main.js`, `css/styles.css`): The learning log landing page
- **`week-0/behavioral-layer/`**: Console fundamentals tutorial (static, reference only)
- **`week-1/`**: Theme toggle & DOM manipulation patterns
  - `portfolio/ANOMEN-2/`: Applies design tokens + localStorage persistence
  - `story-teller/`: Demonstrates animation + state management patterns
- **`week-2/`**: Conditionals & advanced patterns (being built)

### JavaScript Patterns
1. **Theme Toggle** (Primary pattern in `week-1/portfolio/ANOMEN-2/main.js`):
   - Uses `localStorage` to persist theme preference
   - Sets `document.documentElement.dataset.theme` to toggle CSS custom properties
   - Always check `localStorage` on page load before setting initial theme
   
2. **Event Handling** (All files):
   - Use `document.querySelector()` to find elements
   - Attach `addEventListener('click', callback)` for interactions
   - Include state flags (`isAnimating`, `currentStep`) to prevent race conditions

3. **State Management**:
   - Track UI state with variables (`currentStep`, `newTheme`)
   - Use `localStorage` for persistence across sessions
   - Include guard clauses in callbacks: `if (isAnimating) return;`

4. **Animation Patterns** (`story-teller/js/script.js`):
   - Add/remove CSS classes to trigger animations via transitions
   - Use `setTimeout()` for sequential animations (e.g., blink → change image → open eyes)
   - Emit callbacks after animations complete for state updates

### CSS Design Tokens
- Projects use **CSS custom properties** scoped to `data-theme` attribute:
  ```css
  :root[data-theme="dark"] { --color-bg: #1a1a1a; }
  :root[data-theme="light"] { --color-bg: #fafafa; }
  ```
- All color & sizing values are stored as variables, not hardcoded

### HTML Structure
- Follow semantic HTML: `<main>`, `<section>`, `<nav>`
- Use meaningful class names for styling and JS selection (e.g., `.theme-toggle`, `.blinking`)
- Include data attributes for state management (e.g., `data-theme`)

## Critical Conventions

- **Naming**: camelCase for JS variables/functions, kebab-case for CSS classes
- **Comments**: Include inline explanations for tricky logic (especially event handling)
- **Debugging**: Use `console.log()` for state checks; code comments explain "why" not just "what"
- **localStorage**: Always validate existence before reading: `if (localStorage.getItem('key'))`

## Development Workflow

1. **View live site**: Use Live Server extension (default: `http://localhost:5500`)
2. **Test theme toggle**: Open DevTools → check `localStorage` persists across reload
3. **Debug animations**: Slow down CSS transitions via DevTools to inspect state flow
4. **Git usage**: Commit weekly with meaningful messages (e.g., `week-1: add theme toggle`)

## Key Dependencies & Tools
- **VS Code Extensions**: Copilot, Live Server, Prettier (for formatting)
- **No build tools**: Static HTML/CSS/JS only
- **GitHub Pages**: Deployed from root branch; update portfolio links manually
- **External assets**: Images hosted as URLs or in `assets/images/`

## When Adding Features
- Preserve existing week folders (they're learning references, not to be deleted)
- Update root `index.html` to link new week content
- Use same naming conventions & animation patterns from prior weeks
- Always test theme toggle persistence in new components
- Include console comments explaining "what you're learning"

## Constraints to Respect
- Student is learning; prioritize clarity & comments over optimization
- Code is portfolio-facing; prioritize readability & design over brevity
- No backend/database (localStorage only)
- No external JS frameworks (vanilla JS only)
