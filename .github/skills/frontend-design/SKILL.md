---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with high design quality using Bootstrap 5.3 flexbox system. Use this skill when the user asks to build web components, pages, artifacts, posters, or applications (examples include websites, landing pages, dashboards, React components, HTML/CSS layouts, or when styling/beautifying any web UI). Generates creative, polished code and UI design that avoids generic AI aesthetics.
license: Complete terms in LICENSE.txt
---

This skill guides creation of distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics. Implement real working code with exceptional attention to aesthetic details and creative choices using Bootstrap 5.3's flexbox-based grid system, aligned with 2026 web design standards: clean experiences, native browser APIs, modern CSS, measurable performance, and purposeful motion.

The user provides frontend requirements: a component, page, application, or interface to build. They may include context about the purpose, audience, or technical constraints.

## Bootstrap 5.3 Flexbox System

Always use Bootstrap 5.3 for layouts and responsive design:
- **Grid System**: Use Bootstrap's container-fluid/container and row/col classes with flexbox under the hood
- **Responsive Columns**: `.col-12 .col-md-6 .col-lg-4` for mobile-first responsive layouts
- **Gutters**: Use `.g-4`, `.g-5`, `.gx-3`, `.gy-4` for spacing between columns
- **Flexbox Utilities**: `.d-flex`, `.justify-content-*`, `.align-items-*`, `.flex-wrap`, `.flex-column`
- **Spacing**: Use Bootstrap spacing utilities (`.mt-4`, `.mb-3`, `.px-5`, `.py-3`) instead of custom margins/padding where possible
- **Responsive Utilities**: `.d-none .d-md-block`, `.order-*`, `.flex-md-row`
- **CDN**: Always include Bootstrap 5.3 CDN link: `https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css`

**Structure Pattern**:
```html
<div class="container">
  <div class="row g-4">
    <div class="col-12 col-md-6 col-lg-4">
      <div class="card">Content</div>
    </div>
  </div>
</div>
```

**CRITICAL**: Separate Bootstrap grid/container classes from styled inner elements, apply custom card/component styling to inner elements. This ensures Bootstrap gutters work properly. Leverage Bootstrap's flexbox system for unexpected layouts. Asymmetry. Overlap. Diagonal flow. Break out of standard grid patterns with custom positioning.

## Modern CSS (2026 Standards)

Use native browser features that are now broadly supported. These reduce JavaScript dependency, improve performance, and produce cleaner code.

### Container Queries
Design components that adapt to their container's size, not just the viewport. This enables truly reusable, context-aware components:
```css
.card-wrapper {
  container-type: inline-size;
  container-name: card;
}
@container card (min-width: 400px) {
  .card { flex-direction: row; }
}
@container card (max-width: 399px) {
  .card { flex-direction: column; }
}
```
Use container queries for cards, sidebars, modular sections, and any component that appears in different layout contexts.

### CSS :has() Selector
Apply conditional styles based on an element's contents — without JavaScript:
```css
/* Style a form group differently when it contains an invalid input */
.form-group:has(input:invalid) {
  border-color: var(--bs-danger);
}
/* Card layout changes if it contains a video */
.card:has(video) {
  grid-column: span 2;
}
/* Nav changes when a dropdown is open */
nav:has(.dropdown.show) {
  background: var(--bs-dark);
}
```

### CSS Nesting
Write cleaner, more maintainable stylesheets with native CSS nesting (no preprocessor needed):
```css
.card {
  padding: 1.5rem;
  background: var(--bs-body-bg);

  & .card-title {
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0,0,0,.12);
  }

  @media (prefers-color-scheme: dark) {
    background: var(--bs-gray-800);
  }
}
```

### Color Functions & light-dark()
Use the `light-dark()` function for automatic theme adaptation without duplicating CSS blocks:
```css
:root {
  color-scheme: light dark;
}
.surface {
  background: light-dark(#ffffff, #1a1a2e);
  color: light-dark(#212529, #e8e8e8);
  border-color: light-dark(#dee2e6, #333);
}
```
Combine with `color-mix()` for dynamic shade generation:
```css
.accent-bg {
  background: color-mix(in oklch, var(--bs-primary) 15%, transparent);
}
```

### View Transitions API
Create fluid, app-like page transitions and state changes natively — no frameworks needed:
```css
@view-transition {
  navigation: auto;
}
::view-transition-old(root) {
  animation: fade-out 0.25s ease;
}
::view-transition-new(root) {
  animation: fade-in 0.25s ease;
}
```
For in-page state changes:
```javascript
document.startViewTransition(() => {
  // Update the DOM
  container.innerHTML = newContent;
});
```
Use for: page navigation, filtering/sorting lists, tab changes, modal opens, expanding cards. Always keep transitions under 300ms for perceived snappiness.

## Design Thinking

Before coding, understand the context and commit to a BOLD aesthetic direction:
- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: Pick an extreme: brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian, etc. There are so many flavors to choose from. Use these for inspiration but design one that is true to the aesthetic direction.
- **Constraints**: Technical requirements (framework, performance, accessibility).
- **Differentiation**: What makes this UNFORGETTABLE? What's the one thing someone will remember?

**CRITICAL**: Choose a clear conceptual direction and execute it with precision. Bold maximalism and refined minimalism both work - the key is intentionality, not intensity.

Then implement working code (HTML/CSS/JS, React, Vue, etc.) that is:
- Production-grade and functional
- Visually striking and memorable
- Cohesive with a clear aesthetic point-of-view
- Meticulously refined in every detail

## Design System

Every frontend must be built on a coherent design system — a structured set of foundational elements, design tokens, and reusable component patterns that ensure consistency, scalability, and maintainability. A design system is the DNA of the interface: it encodes the visual language, interaction patterns, and design decisions into reusable, documented code.

### Foundational Elements

Before writing any component, define the visual language through these foundational decisions:

1. **Color palette**: Brand colors, semantic colors (success/danger/warning/info), neutral scale, surface colors for light and dark themes
2. **Typography scale**: Display, heading, subheading, body, caption, and overline sizes with corresponding line-heights and weights
3. **Spacing scale**: A consistent spacing system (e.g., 4px base: 4, 8, 12, 16, 24, 32, 48, 64, 96)
4. **Border radii**: From sharp (0) to pill (999px), with 2-3 named stops
5. **Shadow/elevation system**: Layered depth levels for cards, modals, dropdowns, tooltips
6. **Motion tokens**: Duration (fast: 150ms, normal: 250ms, slow: 400ms) and easing curves
7. **Iconography style**: Consistent icon set (Font Awesome, outlined vs filled, stroke weight)

### Design Tokens as CSS Custom Properties

Encode all foundational decisions as CSS custom properties at `:root`. This creates a single source of truth that propagates across every component. Always define tokens for both light and dark themes:

```css
:root {
  color-scheme: light dark;

  /* ── Typography Scale ── */
  --font-display: 'Your Display Font', serif;
  --font-body: 'Your Body Font', sans-serif;
  --font-mono: 'Your Mono Font', monospace;

  --text-xs: clamp(0.7rem, 0.65rem + 0.25vw, 0.75rem);
  --text-sm: clamp(0.8rem, 0.75rem + 0.25vw, 0.875rem);
  --text-base: clamp(0.95rem, 0.9rem + 0.25vw, 1rem);
  --text-lg: clamp(1.1rem, 1rem + 0.5vw, 1.25rem);
  --text-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
  --text-2xl: clamp(1.5rem, 1.2rem + 1.5vw, 2rem);
  --text-3xl: clamp(1.8rem, 1.4rem + 2vw, 2.5rem);
  --text-4xl: clamp(2.2rem, 1.6rem + 3vw, 3.5rem);
  --text-5xl: clamp(2.8rem, 1.8rem + 5vw, 5rem);

  /* ── Spacing Scale (4px base) ── */
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-24: 6rem;     /* 96px */

  /* ── Border Radii ── */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;
  --radius-xl: 1.5rem;
  --radius-full: 999px;

  /* ── Shadows / Elevation ── */
  --shadow-sm: 0 1px 2px rgba(0,0,0,.06);
  --shadow-md: 0 4px 12px rgba(0,0,0,.08);
  --shadow-lg: 0 8px 24px rgba(0,0,0,.12);
  --shadow-xl: 0 16px 48px rgba(0,0,0,.16);

  /* ── Motion ── */
  --duration-fast: 150ms;
  --duration-normal: 250ms;
  --duration-slow: 400ms;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);

  /* ── Semantic Surface Colors (adapt per project) ── */
  --color-surface: light-dark(#ffffff, #121218);
  --color-surface-raised: light-dark(#f8f9fa, #1a1a24);
  --color-surface-overlay: light-dark(rgba(255,255,255,0.9), rgba(18,18,24,0.95));
  --color-border: light-dark(#e2e2e8, #2a2a36);
  --color-border-subtle: light-dark(#f0f0f4, #1e1e28);
  --color-text-primary: light-dark(#111118, #f0f0f4);
  --color-text-secondary: light-dark(#555566, #9999aa);
  --color-text-muted: light-dark(#888899, #666677);
  --color-accent: /* project-specific */;
  --color-accent-hover: /* project-specific */;
  --color-accent-subtle: /* project-specific, 10-15% opacity variant */;
}
```

**CRITICAL**: Every color, size, spacing, and timing value used in components MUST reference a token. Never hardcode raw values in component styles. This ensures theme switching, consistency, and maintainability.

### Component Architecture (Atomic Design)

Build interfaces using a clear component hierarchy, from simple to complex:

**Atoms** — Smallest indivisible elements:
- Buttons (primary, secondary, ghost, danger), inputs, labels, badges, icons, avatars, dividers, tooltips

**Molecules** — Combinations of atoms that form a functional unit:
- Search bar (input + button + icon), form field (label + input + error message), card header (avatar + name + timestamp), nav link (icon + label + indicator)

**Organisms** — Complex sections composed of molecules:
- Navigation bar, hero section, card grid, pricing table, footer, sidebar, testimonial carousel, feature section

**Templates/Layouts** — Page-level composition patterns:
- Dashboard layout, marketing landing page, blog post layout, settings panel, authentication pages

### Component Pattern Library

For every component, ensure:
1. **Consistent API**: Same naming conventions, same prop patterns, same CSS class structure
2. **States coverage**: Default, hover, active, focus-visible, disabled, loading, error, empty
3. **Responsive behavior**: How the component adapts at each breakpoint — defined and intentional, not accidental
4. **Theme awareness**: Works in both light and dark modes via token references
5. **Accessibility baked in**: ARIA roles, keyboard interaction, focus management, screen reader text

Example — Button component with consistent design system tokens:
```css
.btn-custom {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 600;
  padding: var(--space-2) var(--space-6);
  border-radius: var(--radius-md);
  border: 1px solid transparent;
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);
  min-height: 44px; /* WCAG touch target */
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);

  &:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
}
.btn-primary {
  background: var(--color-accent);
  color: var(--color-surface);

  &:hover { background: var(--color-accent-hover); }
}
.btn-ghost {
  background: transparent;
  color: var(--color-text-primary);
  border-color: var(--color-border);

  &:hover {
    background: var(--color-accent-subtle);
    border-color: var(--color-accent);
  }
}
```

### Design System Implementation Checklist

When building any interface, verify the design system is fully implemented:

- [ ] All design tokens defined as CSS custom properties at `:root`
- [ ] Typography scale using `clamp()` for fluid responsive sizing
- [ ] Spacing scale applied consistently (no magic numbers)
- [ ] Color tokens cover both light and dark themes
- [ ] Shadow/elevation system with clear hierarchy (sm → xl)
- [ ] Motion tokens used for all transitions and animations
- [ ] Component states fully covered (hover, focus, active, disabled, loading, error)
- [ ] Components reference only tokens — zero hardcoded values
- [ ] Responsive behavior defined at each meaningful breakpoint
- [ ] All interactive elements meet 44×44px minimum touch target
- [ ] Focus indicators visible and high-contrast on all focusable elements

## Frontend Aesthetics Guidelines

Focus on:
- **Typography**: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics; unexpected, characterful font choices. Pair a distinctive display font with a refined body font.
- **Color & Theme**: Commit to a cohesive aesthetic. Use Bootstrap 5.3's color palette and CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes. Bootstrap provides a complete color system with base colors, tints (100-900), and semantic theme colors (primary, secondary, success, danger, warning, info, light, dark).
- **Motion with Purpose**: Animations must be intentional and measurable, not decorative excess. Prioritize CSS-only solutions and the View Transitions API for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions. Use scroll-triggering and hover states that surprise. Always respect `prefers-reduced-motion` — provide a reduced or no-motion alternative. Keep total animation time per interaction under 300ms. Motion should guide the user's eye, confirm actions, or reveal hierarchy — never distract.
- **Spatial Composition**: Unexpected layouts. Asymmetry. Overlap. Diagonal flow. Grid-breaking elements. Generous negative space OR controlled density.
- **Backgrounds & Visual Details**: Create atmosphere and depth rather than defaulting to solid colors. Add contextual effects and textures that match the overall aesthetic. Apply creative forms like gradient meshes, noise textures, geometric patterns, layered transparencies, dramatic shadows, decorative borders, custom cursors, and grain overlays.
- **Dark/Light Theme Support**: Always implement dual theme support using `prefers-color-scheme` and CSS `light-dark()`. Define all custom colors through CSS custom properties so themes switch cleanly. Use Bootstrap 5.3's `data-bs-theme="dark"` attribute for component-level theme switching. Users expect native theme adaptation in 2026 — it's no longer optional.

NEVER use generic AI-generated aesthetics like overused font families (Inter, Roboto, Arial, system fonts), cliched color schemes (particularly purple gradients on white backgrounds), predictable layouts and component patterns, and cookie-cutter design that lacks context-specific character.

Interpret creatively and make unexpected choices that feel genuinely designed for the context. No design should be the same. Vary between light and dark themes, different fonts, different aesthetics. NEVER converge on common choices (Space Grotesk, for example) across generations.

**IMPORTANT**: Match implementation complexity to the aesthetic vision. Maximalist designs need elaborate code with extensive animations and effects. Minimalist or refined designs need restraint, precision, and careful attention to spacing, typography, and subtle details. Elegance comes from executing the vision well.

Remember: Claude is capable of extraordinary creative work. Don't hold back, show what can truly be created when thinking outside the box and committing fully to a distinctive vision.

## Performance & Core Web Vitals (2026)

Performance is a design decision. Fast interfaces feel better, convert more, and rank higher.

- **INP Target**: Interaction to Next Paint ≤ 200ms for the 75th percentile of users. Every interactive element must respond instantly.
- **Minimal JavaScript**: Prefer CSS-only solutions (animations, transitions, :has(), container queries) over JS whenever possible. Less JS = faster INP, better LCP, lower mobile battery usage.
- **Lean Dependencies**: Avoid heavy animation libraries when CSS or the View Transitions API can achieve the same effect. Every KB of JS has a performance cost.
- **Image Optimization**: Use `loading="lazy"` for below-fold images, `fetchpriority="high"` for hero images, and modern formats (WebP/AVIF) with `<picture>` fallbacks.
- **Font Loading**: Use `font-display: swap` and preload critical fonts. Subset fonts to only needed characters when possible.
- **Critical CSS**: Inline above-the-fold styles to eliminate render-blocking resources.

## Accessibility (WCAG 2.2 Compliance)

Accessibility is a core design requirement, not an afterthought. Target WCAG 2.2 Level AA minimum:

- **Touch Targets**: Minimum 44×44px for all interactive elements (buttons, links, form controls). Use padding to increase hit areas without affecting visual size.
- **Visible Focus**: Every focusable element must have a clear, high-contrast focus indicator. Never use `outline: none` without a custom replacement. Use `:focus-visible` for keyboard-only focus styles.
- **Color Contrast**: 4.5:1 minimum for normal text, 3:1 for large text and UI components. Test all color combinations in both light and dark themes.
- **Reduced Motion**: Always wrap animations in `@media (prefers-reduced-motion: no-preference)` or provide `prefers-reduced-motion: reduce` alternatives.
- **Semantic HTML**: Use proper heading hierarchy (h1→h6), landmark regions (`<main>`, `<nav>`, `<aside>`, `<footer>`), and ARIA attributes only when native HTML semantics are insufficient.
- **Form Accessibility**: Associate labels with inputs, provide clear error messages adjacent to fields, use `aria-describedby` for help text, and ensure error states are communicated via `aria-invalid` and `aria-live` regions.
- **Cognitive Load**: Keep interfaces clean and predictable. Consistent navigation, clear CTAs, logical reading order. Avoid overwhelming users with simultaneous animations or dense content blocks.

## Bootstrap 5.3 Color Palette

Bootstrap 5.3 provides a comprehensive color system with base colors, tints (100-900 scale), and semantic theme colors. Always use these colors for consistency and accessibility.

### Base Colors (500 level)
- **Blue**: `#0d6efd` - Primary action color
- **Indigo**: `#6610f2` - Deep purple-blue
- **Purple**: `#6f42c1` - Rich purple
- **Pink**: `#d63384` - Vibrant pink
- **Red**: `#dc3545` - Alert/danger color
- **Orange**: `#fd7e14` - Warning accent
- **Yellow**: `#ffc107` - Caution/warning
- **Green**: `#198754` - Success color
- **Teal**: `#20c997` - Fresh accent
- **Cyan**: `#0dcaf0` - Info color

### Tint Scale (100-900)
Each base color has 9 tints from lightest (100) to darkest (900):
- **100**: Lightest tint (e.g., `$blue-100` for subtle backgrounds)
- **200-400**: Light to medium tints
- **500**: Base color (e.g., `$blue` = `$blue-500`)
- **600-800**: Dark to darker shades
- **900**: Darkest shade (e.g., `$blue-900` for deep contrasts)

### Semantic Theme Colors
Bootstrap maps base colors to semantic meanings:
- **Primary**: `$blue` (#0d6efd) - Main brand color, links, CTAs
- **Secondary**: `$gray-600` - Secondary actions
- **Success**: `$green` (#198754) - Positive actions
- **Danger**: `$red` (#dc3545) - Errors, destructive actions
- **Warning**: `$yellow` (#ffc107) - Caution messages
- **Info**: `$cyan` (#0dcaf0) - Informational content
- **Light**: `$gray-100` - Light backgrounds
- **Dark**: `$gray-900` - Dark text and backgrounds

### Grayscale
- **White**: `#ffffff`
- **Gray-100 to Gray-900**: From `#f8f9fa` to `#212529`
- **Black**: `#000000`

### CSS Variables (v5.3+)
Bootstrap provides CSS variables for all colors:
```css
/* Base colors */
--bs-blue: #0d6efd;
--bs-indigo: #6610f2;
--bs-purple: #6f42c1;
/* ...and so on */

/* Theme colors */
--bs-primary: #0d6efd;
--bs-success: #198754;
/* ...and so on */

/* Semantic variables for theming */
--bs-body-color: #212529;
--bs-body-bg: #ffffff;
--bs-primary-bg-subtle: /* Light tint of primary */
--bs-primary-border-subtle: /* Border shade */
--bs-primary-text-emphasis: /* Dark text shade */
```

### Usage Guidelines
1. **Use semantic colors** for components (primary, success, danger) rather than specific color names
2. **Leverage the tint scale** (100-900) for subtle variations without creating custom colors
3. **CSS variables** are preferred for theming and dark mode support
4. **Utility classes** are available: `.text-primary`, `.bg-success`, `.border-danger`
5. **Contrast ratios** are built-in - Bootstrap ensures WCAG compliance for all color combinations

### Color Composition Examples
```html
<!-- Using semantic colors -->
<button class="btn btn-primary">Primary Action</button>
<div class="alert alert-success">Success message</div>

<!-- Using tint utilities (when generated) -->
<div class="bg-blue-100 text-blue-900">Light blue background</div>

<!-- Using CSS variables -->
<div style="color: var(--bs-indigo); background: var(--bs-indigo-bg-subtle);">
  Custom styled element
</div>
```

### Creative Color Strategies
- **Monochromatic**: Use one base color with multiple tints (e.g., blue-100 to blue-900)
- **Complementary**: Pair opposing colors (e.g., purple + yellow, blue + orange)
- **Analogous**: Use adjacent colors (e.g., blue + teal + cyan)
- **Triadic**: Three evenly-spaced colors (e.g., red + yellow + blue)
- **Split Complementary**: Base color + two adjacent to complement (e.g., blue + orange + red)

**Always consider**: Accessibility (4.5:1 contrast for text), brand identity, emotional tone, and cultural context when selecting colors from the Bootstrap palette.
