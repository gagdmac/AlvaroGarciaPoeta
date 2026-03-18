# Providing Accessible Names and Descriptions

Source: https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/

## What Are Accessible Names and Descriptions?

- **Accessible name**: Short string (1-3 words) labeling an element for assistive technologies. Conveys purpose and distinguishes from other elements.
- **Accessible description**: Optional longer string providing additional info (instructions, format requirements). Announced after name/role/state, sometimes after a slight delay.

All focusable, interactive elements MUST have an accessible name. Dialogs, tables, and regions also require names.

## Cardinal Rules of Naming

### Rule 1: Heed Warnings and Test Thoroughly
Avoid prohibited/ambiguous coding patterns. Always test with assistive technologies.

### Rule 2: Prefer Visible Text
Using visible text for names simplifies maintenance, prevents bugs, reduces translation needs. If no visible label exists, consider adding one in the design.

### Rule 3: Prefer Native Techniques
In HTML, prefer native elements (`<label>`, `<caption>`) over ARIA attributes. Simpler, more robust.

### Rule 4: Avoid Browser Fallback
Do not rely on `title` or `placeholder` as accessible names. These are fallback mechanisms yielding low quality names.

### Rule 5: Compose Brief, Useful Names
Keep names short, distinct, and clear. Excessively long or ambiguous names hurt usability.

## Naming Techniques

### 1. Naming with Child Content
Elements with roles like `button`, `link`, `checkbox`, `heading`, `tab`, `option`, `menuitem`, etc. are named by their descendant text content.
- Warning: `aria-label`/`aria-labelledby` on these roles HIDES descendant content from AT users.

### 2. Naming with `aria-label`
String attribute, not visually rendered. Useful when no visible text serves as label.
```html
<button type="button" aria-label="Close">X</button>
<nav aria-label="Product"><!-- links --></nav>
```
- Warning: Hides descendant content on roles that support naming from child content. Ensure translations exist.

### 3. Naming with `aria-labelledby`
References other elements by ID. Highest precedence in name calculation.
```html
<span id="night-mode-label">Night mode</span>
<span role="switch" aria-checked="false" tabindex="0" aria-labelledby="night-mode-label"></span>
```
- Can concatenate multiple element contents.
- Incorporates content from hidden elements.
- Can reference the element itself plus another element.
- Warning: Cannot be chained. Second references ignored. Hides descendant content on child-content roles.

### 4. Naming with `<label>`
For form controls. Two methods:
```html
<!-- Explicit (preferred) -->
<input type="checkbox" id="sub"><label for="sub">Subscribe</label>

<!-- Implicit -->
<label><input type="checkbox"> Subscribe</label>
```
- Clicking the label activates the control (usability advantage).

### 5. Naming with `<legend>`
For `<fieldset>` groups (radio buttons, related fields):
```html
<fieldset>
  <legend>Shipping address</legend>
  <label>Full name <input name="name"></label>
</fieldset>
```

### 6. Naming with Captions
- `<table>` + `<caption>` — caption becomes accessible name.
- `<figure>` + `<figcaption>` — figcaption becomes accessible name.
- If `aria-label`/`aria-labelledby` is used on table, `<caption>` becomes accessible description instead.

### 7. Fallback: `title` and `placeholder`
Low quality, avoid. `title` is fallback for most elements. `placeholder` is fallback for `<input>`/`<textarea>` (disappears on focus).

## Accessible Name Calculation (Precedence)

1. `aria-labelledby` (highest)
2. `aria-label`
3. Native HTML elements/attributes (`<label>`, `alt`, `<legend>`, `<caption>`, `<figcaption>`)
4. Child content (for roles that support it)
5. Fallback: `title`, then `placeholder`

## Composing Effective Names

- Convey function/purpose, not form ("Close" not "X", "Product" not "Left").
- Put most important/distinguishing words first ("Edit John Doe" not "John Doe edit").
- Be concise: 1-3 words usually sufficient.
- Do NOT include role name ("Submit" not "Submit button").
- Create unique names for elements with same role (unless identical purpose).
- Start with capital letter; do not end with period.

## Accessible Name Guidance by Role (Key Roles)

| Role | Necessity | Key Guidance |
|---|---|---|
| `alert` | Discretionary | `aria-label` can preface alert content |
| `alertdialog` | Required | `aria-labelledby` or `aria-label` |
| `button` | Required (if content insufficient) | Prefer visible descendant content |
| `checkbox` | Required (if content insufficient) | Use `<label>` for HTML checkboxes |
| `combobox` | Required | `<label>`, `aria-labelledby`, or `aria-label` |
| `dialog` | Required | `aria-labelledby` or `aria-label` |
| `form` | Recommended | Visible label via `aria-labelledby` |
| `grid` | Required | `<caption>`, `aria-labelledby`, or `aria-label` |
| `heading` | Required (if content insufficient) | Prefer visible descendant content |
| `img` | Required | `alt` for `<img>`, otherwise `aria-labelledby`/`aria-label` |
| `link` | Required (if content insufficient) | Prefer visible descendant content |
| `listbox` | Required | `<label>`, `aria-labelledby`, or `aria-label` |
| `listitem` | Do Not Name | Include content within the list item |
| `main` | Discretionary | Helpful in SPAs; `aria-labelledby`/`aria-label` |
| `navigation` | Recommended | `aria-labelledby`/`aria-label` |
| `option` | Required (if content insufficient) | Prefer visible descendant content |
| `progressbar` | Required | `<label>`, `aria-labelledby`, or `aria-label` |
| `radio` | Required (if content insufficient) | Use `<label>` for HTML radios |
| `radiogroup` | Required | `aria-labelledby` or `aria-label` |
| `region` | Required | `aria-labelledby` or `aria-label` |
| `search` | Recommended | `aria-labelledby`/`aria-label` |
| `slider` | Required | `<label>`, `aria-labelledby`, or `aria-label` |
| `switch` | Required (if content insufficient) | Use `<label>` or `aria-labelledby` |
| `tab` | Required (if content insufficient) | Prefer visible descendant content |
| `table` | Required | `<caption>`, `aria-labelledby`, or `aria-label` |
| `tabpanel` | Required | `aria-labelledby` pointing to its tab |
| `textbox` | Required | `<label>`, `aria-labelledby`, or `aria-label` |
| `tree` | Required | `aria-labelledby` or `aria-label` |
| **Prohibited** | — | `caption`, `code`, `deletion`, `emphasis`, `generic`, `insertion`, `mark`, `none`, `paragraph`, `presentation`, `strong`, `subscript`, `superscript` |

## Describing Techniques

### `aria-describedby`
References other elements to provide description. Works like `aria-labelledby` but for descriptions. Can reference hidden elements.
```html
<button aria-describedby="trash-desc">Move to trash</button>
<p id="trash-desc">Items in the trash will be permanently removed after 30 days.</p>
```

### Captions as Descriptions
If a `<table>` is named via `aria-label`/`aria-labelledby`, its `<caption>` becomes the accessible description. For `<figure>`, explicitly use `aria-describedby` pointing to `<figcaption>`.

### `title` as Description
If no `aria-describedby` and no caption provides description, `title` attribute is used as fallback description.

## Accessible Description Calculation (Precedence)

1. `aria-describedby` (highest)
2. Native HTML elements (e.g., `<caption>` for `<table>`, if not used as name)
3. `title` attribute (fallback)
