# Landmark Regions

Source: https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/

## HTML Sectioning Elements → ARIA Landmarks

| HTML Element | ARIA Landmark Role |
|---|---|
| `<aside>` | `complementary` |
| `<footer>` (context: `<body>`) | `contentinfo` |
| `<header>` (context: `<body>`) | `banner` |
| `<main>` | `main` |
| `<nav>` | `navigation` |
| `<section>` (with accessible name via `aria-labelledby` or `aria-label`) | `region` |
| `<search>` | `search` |

## General Principles of Landmark Design

1. **Identify logical structure** — Break the page into perceivable areas of content indicated visually by alignment and spacing. Define sub-areas as needed.
2. **Assign landmark roles** — Based on content type. `banner`, `main`, `complementary`, `contentinfo` should be top-level. Landmarks can nest to show parent/child relationships. Do NOT wrap modal dialog content in a landmark — the modal itself is sufficient.
3. **Label areas** — If a landmark role is used more than once, give each instance a unique label. Use `aria-labelledby` pointing to a heading if available, otherwise `aria-label`. Do NOT include the landmark role name in the label (e.g., use "Site" not "Site Navigation").

## Landmark Roles

### Banner
- Identifies site-oriented content at the top of each page (logo, site search).
- One per page; should be top-level.
- HTML: `<header>` (when in `<body>` context — NOT inside `<article>`, `<aside>`, `<main>`, `<nav>`, `<section>`).
- ARIA: `role="banner"`.

### Complementary
- Supporting section, meaningful when separated from main content.
- Should be top-level. If not related to main, use `region` instead.
- HTML: `<aside>`.
- ARIA: `role="complementary"`.

### Contentinfo
- Common info at page bottom (copyright, privacy/accessibility links).
- One per page; should be top-level.
- HTML: `<footer>` (when in `<body>` context — same exclusions as `<header>`).
- ARIA: `role="contentinfo"`.

### Form
- Collection of form items when no other named landmark is appropriate.
- Use `search` instead for search forms.
- Must have a label (visible heading preferred).
- HTML: `<form>` with accessible name (`aria-labelledby`, `aria-label`, or `title`).
- ARIA: `role="form"`.

### Main
- Primary content of the page.
- One per page; should be top-level.
- HTML: `<main>`.
- ARIA: `role="main"`.

### Navigation
- Groups of links for website/page navigation.
- If more than one, each needs a unique label. If identical content, use same label.
- HTML: `<nav>`.
- ARIA: `role="navigation"`.

### Region
- Perceivable section sufficiently important for users to navigate to.
- Must have a label.
- Use when no other named landmark fits.
- HTML: `<section>` with accessible name.
- ARIA: `role="region"`.

### Search
- Collection of items creating search functionality.
- Use instead of `form` for search.
- HTML: `<search>`.
- ARIA: `role="search"`.
