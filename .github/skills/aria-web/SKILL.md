---
name: aria-web
description: Apply WAI-ARIA Authoring Practices Guide (APG) to build accessible web components, widgets, and page structures. Use this skill when the user asks to implement ARIA roles, states, and properties; create accessible widgets (accordion, dialog, tabs, combobox, menu, slider, tree view, etc.); structure pages with landmark regions; provide accessible names and descriptions; add keyboard navigation to custom UI components; or audit/fix ARIA usage in existing HTML. Covers all APG design patterns, landmark regions, naming/describing techniques, and keyboard interface practices.
---

# ARIA Web — WAI-ARIA Authoring Practices Guide

Apply the W3C WAI-ARIA Authoring Practices Guide (APG) to build accessible web experiences. This skill provides knowledge of ARIA roles, states, properties, design patterns, landmark regions, and naming/describing techniques.

## Core Principle

**No ARIA is better than Bad ARIA.** Only add ARIA when native HTML semantics are insufficient. Incorrect ARIA can make experiences worse than no ARIA at all.

## When to Use ARIA

1. Native HTML element does not exist for the desired semantics (e.g., `role="switch"`, `role="tabpanel"`)
2. Native HTML element exists but cannot be styled/extended as needed (use ARIA to supplement)
3. Visible relationships need to be programmatically conveyed (e.g., `aria-labelledby`, `aria-describedby`, `aria-controls`)
4. Dynamic content changes need to be announced (`aria-live`, `role="alert"`, `role="status"`)

## Quick Decision Flow

1. Can a native HTML element do the job? → Use it (e.g., `<button>`, `<nav>`, `<label>`, `<select>`)
2. Need to enhance a native element? → Add only the minimum ARIA needed
3. Building a custom widget? → Follow the APG pattern for that widget (read the appropriate reference)
4. Every interactive element MUST be keyboard accessible and have an accessible name

## Landmark Regions

Use landmarks to identify major page sections. Read `references/landmark-regions.md` for full details.

### Key Mapping

| HTML Element | Landmark Role |
|---|---|
| `<header>` (body context) | `banner` |
| `<nav>` | `navigation` |
| `<main>` | `main` |
| `<aside>` | `complementary` |
| `<footer>` (body context) | `contentinfo` |
| `<section>` (with accessible name) | `region` |
| `<search>` | `search` |
| `<form>` (with accessible name) | `form` |

### Rules
- `banner`, `main`, `complementary`, `contentinfo` should be top-level
- One `banner` and one `contentinfo` per page
- One `main` per page
- If a landmark role appears multiple times, each instance needs a unique label
- Do NOT include the role name in the label ("Site" not "Site Navigation")
- Do NOT wrap modal dialog content in a landmark

## Accessible Names and Descriptions

Read `references/names-and-descriptions.md` for full details.

### Name Calculation Precedence (highest → lowest)
1. `aria-labelledby`
2. `aria-label`
3. Native HTML (`<label>`, `alt`, `<legend>`, `<caption>`, `<figcaption>`)
4. Child content (roles that support it: button, link, heading, tab, option, etc.)
5. Fallback: `title`, then `placeholder` (avoid relying on these)

### Five Cardinal Rules
1. **Test thoroughly** with assistive technologies
2. **Prefer visible text** for names (easier maintenance, fewer bugs)
3. **Prefer native techniques** (`<label>`, `<caption>`) over ARIA attributes
4. **Avoid browser fallback** (`title`, `placeholder` yield low-quality names)
5. **Compose brief, useful names** (1-3 words, function over form, verb first for actions)

### Composing Names
- Convey function, not form: "Close" not "X"
- Put distinguishing words first: "Edit John Doe" not "John Doe edit"
- Do NOT include role name: "Submit" not "Submit button"
- Unique names for same-role elements (unless truly identical)
- Start with capital letter; no trailing period

## Design Patterns

Read `references/patterns-index.md` for the complete list of 30+ APG patterns. For any specific pattern implementation, fetch the pattern page from https://www.w3.org/WAI/ARIA/apg/patterns/{pattern-name}/.

### Common Patterns Quick Reference

**Dialog (Modal)**: `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing to title. Trap focus inside. Escape closes.

**Tabs**: `role="tablist"` container, `role="tab"` for each tab, `role="tabpanel"` for panels. `aria-selected="true"` on active tab. Arrow keys navigate tabs. `aria-labelledby` on each panel pointing to its tab.

**Accordion**: Use heading + button pattern. `aria-expanded` on trigger buttons. `aria-controls` pointing to content panel.

**Menu / Menubar**: `role="menu"/"menubar"`, `role="menuitem"` for items. Arrow key navigation. Enter/Space activates.

**Combobox**: `role="combobox"` on input, `aria-expanded`, `aria-controls` pointing to listbox/grid popup, `aria-activedescendant` for visual focus.

**Alert**: `role="alert"` — automatically announced. Do NOT use for non-urgent messages; use `role="status"` instead.

**Disclosure**: Button with `aria-expanded` toggling visibility of a section. `aria-controls` pointing to controlled element.

**Breadcrumb**: `<nav aria-label="Breadcrumb">`, `<ol>` list, current page link has `aria-current="page"`.

**Switch**: `role="switch"`, `aria-checked="true"/"false"`. Space toggles.

## Keyboard Interface Requirements

Every custom interactive widget MUST have keyboard support:

- **Focusable**: All interactive elements must receive keyboard focus (`tabindex="0"` for custom elements)
- **Operable**: All actions available via keyboard (Enter, Space, Arrow keys as appropriate)
- **Tab order**: Logical, follows visual layout. Use `tabindex="0"` (never positive values)
- **Focus management**: Move focus programmatically when context changes (modal open, item delete, tab switch)
- **Roving tabindex or aria-activedescendant**: For composite widgets (tabs, menus, toolbars, grids, trees) — one tab stop for the container, arrow keys navigate between items

## ARIA States and Properties Checklist

When implementing interactive components, verify:

- [ ] `aria-expanded` — on disclosure buttons, accordion triggers, menu buttons, combobox
- [ ] `aria-selected` — on tabs, listbox/grid options
- [ ] `aria-checked` — on checkboxes, switches, radio buttons, menu item checkboxes
- [ ] `aria-disabled` — on disabled interactive elements (use with `tabindex="-1"` or prevent default action)
- [ ] `aria-hidden="true"` — on decorative/redundant content (icons with adjacent text, off-screen content)
- [ ] `aria-live` — on regions with dynamic content updates ("polite" for non-urgent, "assertive" for urgent)
- [ ] `aria-current` — on current item in navigation ("page"), steps ("step"), dates ("date")
- [ ] `aria-controls` — pointing to the element being controlled
- [ ] `aria-haspopup` — on buttons that open menus/dialogs/listboxes
- [ ] `aria-modal="true"` — on modal dialogs

## Common Mistakes to Avoid

1. Adding `role="button"` to `<div>` without keyboard handler — use `<button>` instead
2. Using `aria-label` on elements that don't support naming (paragraph, span, generic) — check the role's naming guidance
3. Redundant ARIA: `<nav role="navigation">` — the role is implicit
4. Missing `aria-expanded` on toggle buttons
5. Using `aria-hidden="true"` on focusable elements — causes ghost focus
6. `placeholder` as only label — must use `<label>` or `aria-label`
7. Forgetting `aria-live` on dynamically injected status messages
8. Not testing with screen readers after implementation
