---
name: a11y-options
description: Comprehensive accessibility checker based on WCAG 2.2 guidelines. Use this skill when you need to audit, check, or verify accessibility compliance of web content, applications, or interfaces. Helps identify accessibility issues and provides guidance for meeting Level A, AA, and AAA success criteria across all four WCAG principles (Perceivable, Operable, Understandable, Robust).
license: Based on W3C WCAG 2.2 - https://www.w3.org/WAI/WCAG22/quickref/
---

# Accessibility Options Checker (WCAG 2.2)

This skill provides comprehensive guidance for checking and ensuring accessibility compliance based on WCAG 2.2 (Web Content Accessibility Guidelines).

## Overview

WCAG 2.2 organizes accessibility requirements into **4 Principles**, **13 Guidelines**, and **86 Success Criteria** across three conformance levels:

- **Level A**: Minimum accessibility (essential)
- **Level AA**: Recommended baseline (addresses major barriers)
- **Level AAA**: Enhanced accessibility (not required for all content)

## Quick Accessibility Checklist

### Level A (Essential) - Most Critical Issues

**Perceivable:**
- ✓ Text alternatives for all non-text content (images, icons, charts)
- ✓ Captions for prerecorded audio/video
- ✓ Semantic HTML structure (headings, lists, tables)
- ✓ Don't rely solely on color to convey information
- ✓ Auto-playing audio can be paused/stopped

**Operable:**
- ✓ All functionality keyboard accessible
- ✓ No keyboard traps
- ✓ Skip links to bypass repeated content
- ✓ Descriptive page titles
- ✓ Logical focus order
- ✓ Clear link purposes
- ✓ No flashing content (>3 flashes/second)
- ✓ Timing adjustable for time limits

**Understandable:**
- ✓ Page language declared (`lang` attribute)
- ✓ No unexpected context changes on focus/input
- ✓ Form labels and instructions provided
- ✓ Input errors identified in text
- ✓ Consistent help mechanisms

**Robust:**
- ✓ Valid HTML (parseable)
- ✓ Proper name, role, value for UI components
- ✓ ARIA attributes used correctly

### Level AA (Recommended Baseline)

**Perceivable:**
- ✓ Text contrast ratio ≥ 4.5:1 (3:1 for large text)
- ✓ Text resizable to 200% without loss
- ✓ Use real text instead of images of text
- ✓ Content reflows at 320px width (no horizontal scroll)
- ✓ Non-text contrast ≥ 3:1 (UI components, graphics)
- ✓ Text spacing adjustable without loss
- ✓ Hover/focus content dismissible, hoverable, persistent
- ✓ Live captions for audio
- ✓ Audio descriptions for video

**Operable:**
- ✓ Multiple ways to find pages (navigation, search, sitemap)
- ✓ Descriptive headings and labels
- ✓ Visible keyboard focus indicator
- ✓ Dragging has single-pointer alternative
- ✓ Target size ≥ 24x24 CSS pixels
- ✓ Focus not entirely hidden by content

**Understandable:**
- ✓ Consistent navigation across pages
- ✓ Consistent identification of same-function elements
- ✓ Error suggestions provided when known
- ✓ Error prevention for legal/financial/data submissions
- ✓ Accessible authentication (no cognitive tests)

**Robust:**
- ✓ Status messages programmatically determinable

### Level AAA (Enhanced)

**Perceivable:**
- ✓ Text contrast ratio ≥ 7:1 (4.5:1 for large text)
- ✓ Target size ≥ 44x44 CSS pixels
- ✓ Sign language interpretation available
- ✓ Extended audio descriptions available

**Operable:**
- ✓ All keyboard operations without timing requirements
- ✓ No timing requirements at all
- ✓ Section headings organize content
- ✓ Link purpose from link text alone
- ✓ Animation from interactions can be disabled
- ✓ Focus appearance meets enhanced metrics
- ✓ Focus never hidden by content

**Understandable:**
- ✓ Mechanisms for unusual words, abbreviations
- ✓ Reading level no higher than lower secondary education
- ✓ Context changes only on user request
- ✓ Context-sensitive help available

## The Four Principles

### Principle 1: Perceivable
*Information and UI components must be presentable in ways users can perceive*

#### Guideline 1.1: Text Alternatives
- **1.1.1 (A)**: Provide text alternatives for non-text content

#### Guideline 1.2: Time-based Media
- **1.2.1 (A)**: Audio-only/video-only alternatives
- **1.2.2 (A)**: Captions for prerecorded audio
- **1.2.3 (A)**: Audio description or media alternative
- **1.2.4 (AA)**: Live captions
- **1.2.5 (AA)**: Audio descriptions for prerecorded video
- **1.2.6 (AAA)**: Sign language interpretation
- **1.2.7 (AAA)**: Extended audio descriptions
- **1.2.8 (AAA)**: Media alternative for prerecorded
- **1.2.9 (AAA)**: Audio-only live alternative

#### Guideline 1.3: Adaptable
- **1.3.1 (A)**: Info and relationships programmatically determinable
- **1.3.2 (A)**: Meaningful sequence preserved
- **1.3.3 (A)**: Don't rely solely on sensory characteristics
- **1.3.4 (AA)**: Content not restricted to single orientation
- **1.3.5 (AA)**: Input purpose can be programmatically determined
- **1.3.6 (AAA)**: Purpose of UI components determinable

#### Guideline 1.4: Distinguishable
- **1.4.1 (A)**: Color not sole means of conveying information
- **1.4.2 (A)**: Audio control (pause/stop/volume)
- **1.4.3 (AA)**: Minimum contrast 4.5:1 (3:1 large text)
- **1.4.4 (AA)**: Text resizable to 200%
- **1.4.5 (AA)**: Images of text (avoid when possible)
- **1.4.6 (AAA)**: Enhanced contrast 7:1 (4.5:1 large text)
- **1.4.7 (AAA)**: Low/no background audio
- **1.4.8 (AAA)**: Visual presentation control
- **1.4.9 (AAA)**: Images of text (no exception)
- **1.4.10 (AA)**: Reflow without horizontal scroll
- **1.4.11 (AA)**: Non-text contrast 3:1
- **1.4.12 (AA)**: Text spacing adjustable
- **1.4.13 (AA)**: Content on hover/focus dismissible

### Principle 2: Operable
*UI components and navigation must be operable*

#### Guideline 2.1: Keyboard Accessible
- **2.1.1 (A)**: Keyboard operable
- **2.1.2 (A)**: No keyboard trap
- **2.1.3 (AAA)**: Keyboard (no exception)
- **2.1.4 (A)**: Character key shortcuts configurable

#### Guideline 2.2: Enough Time
- **2.2.1 (A)**: Timing adjustable
- **2.2.2 (A)**: Pause, stop, hide moving content
- **2.2.3 (AAA)**: No timing
- **2.2.4 (AAA)**: Interruptions suppressible
- **2.2.5 (AAA)**: Re-authenticating preserves data
- **2.2.6 (AAA)**: Timeout warnings

#### Guideline 2.3: Seizures and Physical Reactions
- **2.3.1 (A)**: Three flashes or below threshold
- **2.3.2 (AAA)**: Three flashes (no exception)
- **2.3.3 (AAA)**: Animation from interactions disableable

#### Guideline 2.4: Navigable
- **2.4.1 (A)**: Bypass blocks mechanism
- **2.4.2 (A)**: Page titled
- **2.4.3 (A)**: Focus order logical
- **2.4.4 (A)**: Link purpose in context
- **2.4.5 (AA)**: Multiple ways to find pages
- **2.4.6 (AA)**: Headings and labels descriptive
- **2.4.7 (AA)**: Focus visible
- **2.4.8 (AAA)**: Location information available
- **2.4.9 (AAA)**: Link purpose from link text alone
- **2.4.10 (AAA)**: Section headings
- **2.4.11 (AA)**: Focus not obscured (minimum)
- **2.4.12 (AAA)**: Focus not obscured (enhanced)
- **2.4.13 (AAA)**: Focus appearance

#### Guideline 2.5: Input Modalities
- **2.5.1 (A)**: Pointer gestures have single-pointer alternative
- **2.5.2 (A)**: Pointer cancellation
- **2.5.3 (A)**: Label in name
- **2.5.4 (A)**: Motion actuation
- **2.5.5 (AAA)**: Target size 44x44 pixels
- **2.5.6 (AAA)**: Concurrent input mechanisms
- **2.5.7 (AA)**: Dragging movements alternative
- **2.5.8 (AA)**: Target size minimum 24x24 pixels

### Principle 3: Understandable
*Information and UI operation must be understandable*

#### Guideline 3.1: Readable
- **3.1.1 (A)**: Language of page determinable
- **3.1.2 (AA)**: Language of parts determinable
- **3.1.3 (AAA)**: Unusual words defined
- **3.1.4 (AAA)**: Abbreviations expanded
- **3.1.5 (AAA)**: Reading level appropriate
- **3.1.6 (AAA)**: Pronunciation provided

#### Guideline 3.2: Predictable
- **3.2.1 (A)**: On focus doesn't change context
- **3.2.2 (A)**: On input doesn't change context
- **3.2.3 (AA)**: Consistent navigation
- **3.2.4 (AA)**: Consistent identification
- **3.2.5 (AAA)**: Change on request only
- **3.2.6 (A)**: Consistent help

#### Guideline 3.3: Input Assistance
- **3.3.1 (A)**: Error identification
- **3.3.2 (A)**: Labels or instructions
- **3.3.3 (AA)**: Error suggestion
- **3.3.4 (AA)**: Error prevention (legal/financial/data)
- **3.3.5 (AAA)**: Context-sensitive help
- **3.3.6 (AAA)**: Error prevention (all)
- **3.3.7 (A)**: Redundant entry
- **3.3.8 (AA)**: Accessible authentication (minimum)
- **3.3.9 (AAA)**: Accessible authentication (enhanced)

### Principle 4: Robust
*Content must be robust enough for assistive technologies*

#### Guideline 4.1: Compatible
- **4.1.2 (A)**: Name, role, value programmatically determinable
- **4.1.3 (AA)**: Status messages programmatically determinable

## Common Accessibility Checks

### Semantic HTML Structure
```html
<!-- ✓ Good: Proper heading hierarchy -->
<h1>Page Title</h1>
<h2>Section</h2>
<h3>Subsection</h3>

<!-- ✗ Bad: Skipping levels -->
<h1>Page Title</h1>
<h3>Section</h3>
```

### Text Alternatives
```html
<!-- ✓ Good: Descriptive alt text -->
<img src="chart.png" alt="Bar chart showing 25% increase in sales from Q1 to Q2">

<!-- ✓ Good: Decorative image -->
<img src="divider.png" alt="" role="presentation">

<!-- ✗ Bad: Missing or generic alt -->
<img src="chart.png" alt="image">
```

### Keyboard Navigation
```html
<!-- ✓ Good: Native interactive elements -->
<button onclick="submit()">Submit</button>
<a href="/page">Link</a>

<!-- ✗ Bad: Non-interactive elements as buttons -->
<div onclick="submit()">Submit</div>

<!-- ✓ Better: Add proper role and keyboard support -->
<div role="button" tabindex="0" onclick="submit()" onkeydown="handleKey(event)">Submit</div>
```

### Color Contrast
```css
/* ✓ Good: 4.5:1 contrast ratio */
.text { 
  color: #595959; /* on #ffffff background */
}

/* ✗ Bad: 3:1 contrast ratio */
.text { 
  color: #959595; /* on #ffffff background */
}
```

### Form Labels
```html
<!-- ✓ Good: Associated label -->
<label for="email">Email address:</label>
<input type="email" id="email" name="email">

<!-- ✓ Good: Implicit label -->
<label>
  Email address:
  <input type="email" name="email">
</label>

<!-- ✗ Bad: No label -->
<input type="email" name="email" placeholder="Email">
```

### ARIA Usage
```html
<!-- ✓ Good: ARIA when needed -->
<button aria-expanded="false" aria-controls="menu">Menu</button>
<nav aria-label="Main">...</nav>

<!-- ✗ Bad: Redundant ARIA -->
<button role="button">Click</button>

<!-- ✓ Good: Landmarks -->
<header role="banner">
<nav role="navigation" aria-label="Main">
<main role="main">
<footer role="contentinfo">
```

### Focus Indicators
```css
/* ✓ Good: Visible focus */
a:focus, button:focus {
  outline: 2px solid #005fcc;
  outline-offset: 2px;
}

/* ✗ Bad: Removed focus */
*:focus {
  outline: none;
}
```

## Testing Tools Reference

### Automated Testing
- **axe DevTools**: Browser extension for accessibility testing
- **WAVE**: Web accessibility evaluation tool
- **Lighthouse**: Chrome DevTools audit
- **Pa11y**: Command-line accessibility testing

### Manual Testing
- **Keyboard navigation**: Tab through entire page
- **Screen readers**: NVDA (Windows), JAWS, VoiceOver (Mac/iOS), TalkBack (Android)
- **Zoom testing**: Increase text size to 200%
- **Color contrast**: Use color contrast analyzers
- **Motion preferences**: Test `prefers-reduced-motion`

### Contrast Checkers
- **WebAIM Contrast Checker**: https://webaim.org/resources/contrastchecker/
- **Colour Contrast Analyser**: Desktop application
- **Chrome DevTools**: Built-in contrast ratio display

## Accessibility Audit Workflow

1. **Automated scan**: Run axe DevTools or Lighthouse
2. **Keyboard navigation**: Tab through all interactive elements
3. **Screen reader test**: Use NVDA/VoiceOver to navigate
4. **Semantic structure**: Check heading hierarchy (h1-h6)
5. **Color contrast**: Verify all text meets minimum ratios
6. **Forms**: Check labels, error messages, validation
7. **Images**: Verify alt text on all images
8. **Focus indicators**: Ensure visible focus on all interactive elements
9. **Responsive testing**: Check at 320px width, 200% zoom
10. **Motion testing**: Verify animations respect prefers-reduced-motion

## Common Issues by Level

### Level A Issues (Must Fix)
- Missing alt text on images
- Keyboard traps
- Missing form labels
- No skip link
- Color-only information
- Missing page title
- Invalid HTML structure
- Flashing content >3/second

### Level AA Issues (Should Fix)
- Contrast ratio below 4.5:1
- Text not resizable
- No visible focus indicator
- Missing headings
- Inconsistent navigation
- No error suggestions
- Focus obscured by sticky headers
- Target sizes <24px

### Level AAA Issues (Nice to Have)
- Contrast ratio below 7:1
- Target sizes <44px
- No section headings
- Missing extended audio descriptions
- No pronunciation guidance

## WCAG 2.2 New Success Criteria

**New in WCAG 2.2:**
- **2.4.11 Focus Not Obscured (Minimum)** - AA
- **2.4.12 Focus Not Obscured (Enhanced)** - AAA
- **2.4.13 Focus Appearance** - AAA
- **2.5.7 Dragging Movements** - AA
- **2.5.8 Target Size (Minimum)** - AA
- **3.2.6 Consistent Help** - A
- **3.3.7 Redundant Entry** - A
- **3.3.8 Accessible Authentication (Minimum)** - AA
- **3.3.9 Accessible Authentication (Enhanced)** - AAA

## Resources

- **WCAG 2.2 Quick Reference**: https://www.w3.org/WAI/WCAG22/quickref/
- **Understanding WCAG 2.2**: https://www.w3.org/WAI/WCAG22/Understanding/
- **Techniques for WCAG 2.2**: https://www.w3.org/WAI/WCAG22/Techniques/
- **WebAIM**: https://webaim.org/
- **A11y Project**: https://www.a11yproject.com/
- **MDN Accessibility**: https://developer.mozilla.org/en-US/docs/Web/Accessibility

## Conformance Levels

- **Level A**: Minimum level (essential for some users)
- **Level AA**: Recommended baseline (addresses major barriers)
- **Level AAA**: Enhancement (not required for all content)

Most organizations target **Level AA** as their conformance goal.

## How to Use This Skill

When checking accessibility:

1. **Specify conformance level**: A, AA, or AAA
2. **Provide context**: URL, code snippet, or description
3. **Request specific checks**: Contrast, keyboard, structure, etc.
4. **Ask for remediation**: Get specific fixes for identified issues

Example: "Check this page for WCAG 2.2 Level AA compliance focusing on color contrast and keyboard navigation."
