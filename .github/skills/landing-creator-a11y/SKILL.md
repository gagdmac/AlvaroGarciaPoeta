---
name: landing-creator-a11y
description: Create accessible, distinctive landing pages and web interfaces following WCAG 2.2 guidelines. Use this skill when building landing pages, websites, or web applications that must be accessible to all users including those with disabilities. Combines production-grade frontend design with comprehensive accessibility compliance (keyboard navigation, screen readers, color contrast, ARIA labels, semantic HTML). Uses Bootstrap 5.3 for layout, Font Awesome Pro 5.15.4 for icons, and Anime.js v4 for animations.
license: Complete terms in LICENSE.txt
---

# Landing Creator with Accessibility (A11y)

Create distinctive, production-grade landing pages and frontend interfaces with full WCAG 2.2 accessibility compliance. This skill combines exceptional design quality with comprehensive accessibility standards using Bootstrap 5.3, Font Awesome Pro 5.15.4, and Anime.js v4.

## Design Thinking

Before coding, understand the context and commit to a BOLD aesthetic direction:

- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: Pick an extreme aesthetic direction: brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian, etc.
- **Constraints**: Technical requirements (framework, performance, accessibility).
- **Differentiation**: What makes this UNFORGETTABLE? What's the one thing someone will remember?

**CRITICAL**: Choose a clear conceptual direction and execute it with precision. Bold maximalism and refined minimalism both work - the key is intentionality, not intensity.

**PERFORMANCE FIRST**: Landing pages must load fast. Optimize assets, minimize HTTP requests, lazy load non-critical resources, and keep the initial payload small.

Then implement working code that is:

- Production-grade and functional
- Visually striking and memorable
- Cohesive with a clear aesthetic point-of-view
- Meticulously refined in every detail
- **Fully accessible to all users**
- Built with Bootstrap 5.3 layout system
- Enhanced with Font Awesome Pro 5.15.4 icons
- Animated with Anime.js v4

## Required Frameworks

### Bootstrap 5.3
Use Bootstrap 5.3 as the foundation for all layouts and components. Bootstrap provides accessible, responsive components out of the box.

**CDN Integration:**
```html
<!-- Bootstrap CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">

<!-- Bootstrap JS Bundle (includes Popper) -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>
```

**Key Bootstrap Features to Use:**
- Grid system (`container`, `row`, `col-*`)
- Utility classes for spacing, colors, typography
- Components: navbar, cards, buttons, forms, modals
- Responsive breakpoints: `xs`, `sm`, `md`, `lg`, `xl`, `xxl`

### Font Awesome Pro 5.15.4
Use Font Awesome Pro 5.15.4 for all icons with proper accessibility attributes. Font Awesome Pro provides additional icon styles and a larger icon library.

**Setup Option 1: Kit Code (Requires Active Subscription):**
```html
<!-- Font Awesome Pro Kit - Replace YOUR_KIT_CODE with your actual kit code -->
<script src="https://kit.fontawesome.com/YOUR_KIT_CODE.js" crossorigin="anonymous"></script>
```

**Setup Option 2: Self-Hosted (Works with Lifetime Download License):**

1. Download Font Awesome Pro from https://fontawesome.com/download
2. Extract the downloaded ZIP file
3. Create an `assets` directory in your project root if it doesn't exist
4. Copy the entire `fontawesome-pro-5.15.4-web` folder into `assets/` and rename it to `fontawesome-pro`

**Your directory structure should be:**
```
your-project/
├── assets/
│   └── fontawesome-pro/
│       ├── css/
│       │   ├── all.min.css
│       │   ├── fontawesome.min.css
│       │   ├── solid.min.css
│       │   ├── regular.min.css
│       │   ├── light.min.css
│       │   ├── duotone.min.css
│       │   └── brands.min.css
│       └── webfonts/
│           ├── fa-brands-400.woff2
│           ├── fa-solid-900.woff2
│           ├── fa-regular-400.woff2
│           ├── fa-light-300.woff2
│           └── fa-duotone-900.woff2
├── index.html
└── ...
```

3. Include the CSS in your HTML:

```html
<!-- PERFORMANCE TIP: Only load the icon styles you actually use -->
<link rel="stylesheet" href="/assets/fontawesome-pro/css/fontawesome.min.css">
<link rel="stylesheet" href="/assets/fontawesome-pro/css/solid.min.css">
<link rel="stylesheet" href="/assets/fontawesome-pro/css/brands.min.css">
<!-- Add others only if needed: regular.min.css, light.min.css, duotone.min.css -->

<!-- OR if you need all styles (larger file size): -->
<link rel="stylesheet" href="/assets/fontawesome-pro/css/all.min.css">
```

**Performance Optimization:**
```html
<!-- Preload critical fonts for faster rendering -->
<link rel="preload" href="/assets/fontawesome-pro/webfonts/fa-solid-900.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fontawesome-pro/webfonts/fa-brands-400.woff2" as="font" type="font/woff2" crossorigin>
```

**Important:** The CSS files automatically reference the `webfonts/` folder, so keep the folder structure intact. The path is relative from the CSS file location.

**Icon Styles Available in Pro:**
- `fas` - Solid (default, included in Free)
- `far` - Regular 
- `fal` - Light (Pro only)
- `fat` - Thin (Pro only)
- `fad` - Duotone (Pro only)
- `fab` - Brands (included in Free)

**Accessible Icon Usage:**
```html
<!-- Decorative icons (hidden from screen readers) -->
<i class="fas fa-heart" aria-hidden="true"></i>
<i class="fal fa-star" aria-hidden="true"></i> <!-- Light style -->
<i class="fad fa-rocket" aria-hidden="true"></i> <!-- Duotone style -->

<!-- Meaningful icons with accessible labels -->
<i class="fas fa-envelope" aria-hidden="true"></i>
<span class="visually-hidden">Email</span>

<!-- Icon-only buttons -->
<button type="button" aria-label="Close">
  <i class="fas fa-times" aria-hidden="true"></i>
</button>

<!-- Icons with visible text -->
<a href="#contact">
  <i class="fal fa-phone" aria-hidden="true"></i>
  Contact Us
</a>

<!-- Duotone icons with custom colors -->
<i class="fad fa-users" aria-hidden="true" style="--fa-primary-color: #0066cc; --fa-secondary-color: #99ccff; --fa-secondary-opacity: 0.4;"></i>
```

## Performance Optimization Guidelines

Landing pages must load fast to maintain user engagement and SEO rankings. Follow these best practices:

### Critical Performance Metrics
- **First Contentful Paint (FCP)**: < 1.8s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Total Blocking Time (TBT)**: < 300ms
- **Page Weight**: < 1MB initial load

### Asset Optimization

**Images:**
```html
<!-- Use modern formats with fallbacks -->
<picture>
  <source srcset="hero.webp" type="image/webp">
  <source srcset="hero.jpg" type="image/jpeg">
  <img src="hero.jpg" alt="Hero image" loading="lazy" width="1200" height="600">
</picture>

<!-- Lazy load below-the-fold images -->
<img src="image.jpg" alt="Description" loading="lazy" width="800" height="400">

<!-- Use responsive images -->
<img 
  srcset="small.jpg 480w, medium.jpg 800w, large.jpg 1200w"
  sizes="(max-width: 768px) 100vw, 50vw"
  src="medium.jpg" 
  alt="Description"
>
```

**CSS & JavaScript:**
```html
<!-- Inline critical CSS in <head> -->
<style>
  /* Critical styles for above-the-fold content */
  body { margin: 0; font-family: system-ui; }
  .hero { min-height: 100vh; }
</style>

<!-- Load non-critical CSS asynchronously -->
<link rel="preload" href="/assets/styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="/assets/styles.css"></noscript>

<!-- Defer non-critical JavaScript -->
<script src="/assets/script.js" defer></script>
```

**Font Loading:**
```html
<!-- Preload critical fonts -->
<link rel="preload" href="/assets/fonts/display-font.woff2" as="font" type="font/woff2" crossorigin>

<!-- Use font-display: swap to prevent invisible text -->
<style>
  @font-face {
    font-family: 'Display Font';
    src: url('/assets/fonts/display-font.woff2') format('woff2');
    font-display: swap; /* Show fallback font while loading */
    font-weight: 700;
  }
</style>
```

### Bootstrap Performance

**Load only what you need:**
```html
<!-- Option 1: Use full Bootstrap (easier but larger ~200KB) -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

<!-- Option 2: Build custom Bootstrap with only needed components (advanced) -->
<!-- Import only grid, utilities, and specific components you use -->
```

**JavaScript optimization:**
```html
<!-- Only include Bootstrap JS if you need interactive components -->
<!-- Defer loading for better performance -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" defer></script>

<!-- Or load specific components only -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js" defer></script>
```

### Anime.js v4 Performance

**Load Anime.js efficiently:**
```html
<!-- Load Anime.js v4 with defer for better performance -->
<script src="https://cdn.jsdelivr.net/npm/animejs@4.0.0/lib/anime.min.js" defer></script>

<!-- Or download and self-host for production (recommended) -->
<script src="/assets/js/anime.min.js" defer></script>
```

**Optimization tips:**
- Only animate `transform` and `opacity` properties
- Keep animations under 1000ms duration
- Use `anime.stagger()` for sequential reveals
- Remove event listeners when animations complete
- Consider using CSS animations for simple transitions
- Always check `prefers-reduced-motion` before animating

### Font Awesome Performance

**Load only the icon styles you use:**
```html
<!-- ❌ Don't load all styles if you only use solid icons -->
<link rel="stylesheet" href="/assets/fontawesome-pro/css/all.min.css">

<!-- ✅ Load only what you need -->
<link rel="stylesheet" href="/assets/fontawesome-pro/css/fontawesome.min.css">
<link rel="stylesheet" href="/assets/fontawesome-pro/css/solid.min.css">
<link rel="stylesheet" href="/assets/fontawesome-pro/css/brands.min.css">
```

**Preload critical icon fonts:**
```html
<link rel="preload" href="/assets/fontawesome-pro/webfonts/fa-solid-900.woff2" as="font" type="font/woff2" crossorigin>
```

### Resource Hints

```html
<!-- DNS prefetch for external resources -->
<link rel="dns-prefetch" href="https://cdn.jsdelivr.net">

<!-- Preconnect to critical origins -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

### Animation Performance

```css
/* Use transforms and opacity for smooth 60fps animations */
.animate {
  /* ✅ GPU-accelerated properties */
  transform: translateX(100px);
  opacity: 0.5;
  
  /* ❌ Avoid animating layout properties */
  /* left: 100px; */
  /* width: 200px; */
}

/* Use will-change sparingly for complex animations */
.complex-animation {
  will-change: transform;
}

/* Remove will-change after animation completes */
.complex-animation.done {
  will-change: auto;
}
```

### Performance Testing Checklist

- [ ] Run Lighthouse audit (target score: 90+)
- [ ] Test on slow 3G network
- [ ] Verify images are compressed and properly sized
- [ ] Check total page weight < 1MB for initial load
- [ ] Confirm JavaScript is deferred or async
- [ ] Validate no render-blocking resources
- [ ] Test with browser DevTools Performance tab
- [ ] Measure Core Web Vitals in production

## Frontend Design Guidelines

### Typography
- Choose fonts that are beautiful, unique, and interesting
- Avoid generic fonts like Arial and Inter
- Pair a distinctive display font with a refined body font
- **Use system fonts or preload custom fonts for performance**
- **Limit to 2-3 font families maximum**
- **Ensure minimum 4.5:1 contrast ratio for body text (WCAG 2.2 - 1.4.3)**
- **Support text resizing up to 200% without loss of functionality (WCAG 2.2 - 1.4.4)**
- **Allow proper text spacing adjustments (WCAG 2.2 - 1.4.12)**

### Color & Theme
- Commit to a cohesive aesthetic using CSS variables
- Dominant colors with sharp accents
- **Never use color alone to convey information (WCAG 2.2 - 1.4.1)**
- **Ensure 4.5:1 contrast for normal text, 3:1 for large text (WCAG 2.2 - 1.4.3)**
- **Maintain 3:1 contrast for UI components and graphical objects (WCAG 2.2 - 1.4.11)**
- **Support both light and dark themes when possible**

### Motion & Animation
Use **Anime.js v4** (https://animejs.com) for all JavaScript-powered animations. Anime.js provides smooth, performant animations with excellent control.

**Animation Library:**
- **Anime.js v4** for complex JavaScript animations
- **CSS animations** for simple transitions and basic effects
- Focus on high-impact moments with staggered reveals
- **Prefer transform and opacity (GPU-accelerated) over layout properties**
- **Provide mechanism to disable motion animations (WCAG 2.2 - 2.3.3)**
- **Use `prefers-reduced-motion` media query**
- **Avoid flashing content more than 3 times per second (WCAG 2.2 - 2.3.1)**

**Anime.js v4 Integration:**
```html
<!-- Add Anime.js v4 from CDN -->
<script src="https://cdn.jsdelivr.net/npm/animejs@4.0.0/lib/anime.min.js"></script>
```

**Basic Anime.js Examples:**
```javascript
// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Fade in elements on page load
if (!prefersReducedMotion) {
  anime({
    targets: '.fade-in',
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 800,
    easing: 'easeOutQuad',
    delay: anime.stagger(100) // Stagger each element by 100ms
  });
}

// Hero title animation
anime({
  targets: '.hero-title',
  opacity: [0, 1],
  scale: [0.95, 1],
  duration: 1200,
  easing: 'easeOutElastic(1, .8)'
});

// Staggered card animations
anime({
  targets: '.card',
  translateY: [50, 0],
  opacity: [0, 1],
  duration: 800,
  delay: anime.stagger(150, {start: 300}),
  easing: 'easeOutExpo'
});

// Scroll-triggered animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !prefersReducedMotion) {
      anime({
        targets: entry.target,
        translateX: [-100, 0],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutQuad'
      });
      observer.unobserve(entry.target);
    }
  });
});

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  observer.observe(el);
});

// Button hover effect
document.querySelectorAll('.btn-animated').forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    if (!prefersReducedMotion) {
      anime({
        targets: btn,
        scale: 1.05,
        duration: 300,
        easing: 'easeOutQuad'
      });
    }
  });
  
  btn.addEventListener('mouseleave', () => {
    if (!prefersReducedMotion) {
      anime({
        targets: btn,
        scale: 1,
        duration: 300,
        easing: 'easeOutQuad'
      });
    }
  });
});
```

**Accessible Animation Pattern:**
```javascript
// Global animation controller
const AnimationController = {
  prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  
  animate(options) {
    // Skip animations if user prefers reduced motion
    if (this.prefersReducedMotion) {
      // Set final state immediately
      anime.set(options.targets, {
        opacity: 1,
        translateY: 0,
        translateX: 0,
        scale: 1
      });
      return;
    }
    
    // Run animation
    return anime(options);
  }
};

// Usage
AnimationController.animate({
  targets: '.element',
  opacity: [0, 1],
  duration: 600,
  easing: 'easeOutQuad'
});
```

**Performance Tips for Anime.js:**
- Use `anime.stagger()` for sequential animations
- Animate transform and opacity properties only
- Use `easing: 'linear'` or built-in easings (avoid custom bezier when possible)
- Keep duration under 1000ms for most animations
- Remove completed animations from memory
- Use timeline for complex sequences

### Spatial Composition
- Unexpected layouts with asymmetry, overlap, diagonal flow
- Grid-breaking elements with generous negative space
- **Ensure logical reading order matches visual presentation (WCAG 2.2 - 1.3.2)**
- **Maintain meaningful focus order (WCAG 2.2 - 2.4.3)**
- **Keep focusable elements visible when focused (WCAG 2.2 - 2.4.11)**

### Backgrounds & Visual Details
- Create atmosphere with gradient meshes, noise textures, geometric patterns
- Layered transparencies, dramatic shadows, decorative borders
- **Ensure sufficient contrast between text and backgrounds (WCAG 2.2 - 1.4.3)**
- **Support content reflow at 320px width and 200% zoom (WCAG 2.2 - 1.4.10)**

## WCAG 2.2 Accessibility Requirements

### Level A (Must Have)

#### Perceivable
- **1.1.1 Non-text Content**: All images have alt text; decorative images use `alt=""`
- **1.3.1 Info and Relationships**: Use semantic HTML (`<header>`, `<nav>`, `<main>`, `<footer>`, `<article>`, `<section>`)
- **1.3.2 Meaningful Sequence**: DOM order matches visual presentation
- **1.3.3 Sensory Characteristics**: Don't rely solely on shape, size, or location in instructions
- **1.4.1 Use of Color**: Never use color as the only visual means of conveying information
- **1.4.2 Audio Control**: Provide controls for auto-playing audio/video

#### Operable
- **2.1.1 Keyboard**: All functionality available via keyboard
- **2.1.2 No Keyboard Trap**: Users can navigate away from all elements using keyboard
- **2.1.4 Character Key Shortcuts**: Single-key shortcuts can be turned off or remapped
- **2.2.1 Timing Adjustable**: Users can adjust time limits
- **2.2.2 Pause, Stop, Hide**: Moving/blinking content can be paused
- **2.4.1 Bypass Blocks**: Skip navigation link to main content
- **2.4.2 Page Titled**: Every page has a descriptive `<title>`
- **2.4.3 Focus Order**: Tab order is logical and intuitive
- **2.4.4 Link Purpose**: Link text describes destination
- **2.5.1 Pointer Gestures**: Multi-point gestures have single-pointer alternatives
- **2.5.2 Pointer Cancellation**: Actions complete on up-event, not down-event
- **2.5.3 Label in Name**: Visible text labels match accessible names
- **2.5.4 Motion Actuation**: Device motion can be disabled

#### Understandable
- **3.1.1 Language of Page**: Set `lang` attribute on `<html>`
- **3.2.1 On Focus**: Focusing an element doesn't cause unexpected context changes
- **3.2.2 On Input**: Changing form controls doesn't automatically submit
- **3.2.6 Consistent Help**: Help mechanisms appear in same location
- **3.3.1 Error Identification**: Form errors are clearly identified
- **3.3.2 Labels or Instructions**: Form fields have clear labels
- **3.3.7 Redundant Entry**: Don't require re-entering previously provided information

#### Robust
- **4.1.2 Name, Role, Value**: Custom components have proper ARIA labels and roles
- **4.1.3 Status Messages**: Use ARIA live regions for dynamic updates

### Level AA (Strongly Recommended)

#### Perceivable
- **1.3.4 Orientation**: Don't restrict to single orientation unless essential
- **1.3.5 Identify Input Purpose**: Use autocomplete attributes for user data fields
- **1.4.3 Contrast (Minimum)**: 4.5:1 for text, 3:1 for large text (18pt+)
- **1.4.4 Resize Text**: Support 200% zoom without loss of functionality
- **1.4.5 Images of Text**: Use real text instead of images
- **1.4.10 Reflow**: No 2D scrolling at 320px width
- **1.4.11 Non-text Contrast**: 3:1 contrast for UI components
- **1.4.12 Text Spacing**: Support increased line height and spacing
- **1.4.13 Content on Hover/Focus**: Hoverable, dismissible, persistent

#### Operable
- **2.4.5 Multiple Ways**: Provide multiple ways to find pages (menu + search)
- **2.4.6 Headings and Labels**: Descriptive headings and labels
- **2.4.7 Focus Visible**: Clear visible focus indicator
- **2.4.11 Focus Not Obscured (Minimum)**: Focused elements not hidden by sticky content
- **2.5.7 Dragging Movements**: Provide alternative to drag-and-drop
- **2.5.8 Target Size (Minimum)**: Interactive elements at least 24x24 CSS pixels

#### Understandable
- **3.1.2 Language of Parts**: Mark foreign language content with `lang`
- **3.2.3 Consistent Navigation**: Navigation in same order across pages
- **3.2.4 Consistent Identification**: Same functionality labeled consistently
- **3.3.3 Error Suggestion**: Provide correction suggestions for errors
- **3.3.4 Error Prevention**: Provide confirmation for important actions
- **3.3.8 Accessible Authentication**: Don't require cognitive function tests

## Implementation Checklist

### HTML Structure with Bootstrap 5.3
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Descriptive Page Title</title>
  
  <!-- Bootstrap CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
  
  <!-- Font Awesome Pro - Self Hosted -->
  <link rel="stylesheet" href="/assets/fontawesome-pro/css/all.min.css">
  
  <!-- Custom CSS -->
  <style>
    /* Skip link for keyboard navigation */
    .skip-link {
      position: absolute;
      top: -40px;
      left: 0;
      background: #000;
      color: white;
      padding: 8px;
      text-decoration: none;
      z-index: 100;
    }
    
    .skip-link:focus {
      top: 0;
    }
    
    /* Initial state for animated elements */
    .fade-in,
    .animate-on-scroll {
      opacity: 0;
    }
    
    /* Custom styles for your distinctive design */
  </style>
</head>
<body>
  <a href="#main" class="skip-link">Skip to main content</a>
  
  <!-- Bootstrap Navbar -->
  <nav class="navbar navbar-expand-lg navbar-light bg-light" role="navigation" aria-label="Main navigation">
    <div class="container">
      <a class="navbar-brand" href="/">
        <i class="fas fa-star" aria-hidden="true"></i>
        Brand Name
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#home">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#about">About</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#contact">Contact</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  
  <!-- Main Content -->
  <main id="main" role="main">
    <div class="container">
      <!-- Bootstrap Grid Example -->
      <div class="row g-4">
        <div class="col-12 col-md-6 col-lg-4">
          <!-- Bootstrap Card Component -->
          <div class="card h-100">
            <div class="card-body">
              <h2 class="card-title">
                <i class="fas fa-rocket text-primary" aria-hidden="true"></i>
                Feature Title
              </h2>
              <p class="card-text">Feature description goes here.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  
  <!-- Footer -->
  <footer class="bg-dark text-light py-4 mt-5" role="contentinfo">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <p>&copy; 2026 Company Name. All rights reserved.</p>
        </div>
        <div class="col-md-6 text-md-end">
          <a href="#" class="text-light me-3" aria-label="Facebook">
            <i class="fab fa-facebook" aria-hidden="true"></i>
          </a>
          <a href="#" class="text-light me-3" aria-label="Twitter">
            <i class="fab fa-twitter" aria-hidden="true"></i>
          </a>
          <a href="#" class="text-light" aria-label="LinkedIn">
            <i class="fab fa-linkedin" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </div>
  </footer>
  
  <!-- Bootstrap JS -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>
  
  <!-- Anime.js v4 for animations -->
  <script src="https://cdn.jsdelivr.net/npm/animejs@4.0.0/lib/anime.min.js"></script>
  
  <!-- Custom JavaScript -->
  <script>
    // Initialize animations
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
      // Fade in elements on page load
      anime({
        targets: '.fade-in',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        easing: 'easeOutQuad',
        delay: anime.stagger(100)
      });
    } else {
      // Set final state for users who prefer reduced motion
      anime.set('.fade-in, .animate-on-scroll', {
        opacity: 1
      });
    }
  </script>
</body>
</html>
```

### Bootstrap 5.3 Layout Patterns

#### Container & Grid System
```html
<!-- Full-width container -->
<div class="container-fluid">
  <div class="row">
    <div class="col-12 col-sm-6 col-md-4 col-lg-3">
      <!-- Content -->
    </div>
  </div>
</div>

<!-- Standard container with breakpoints -->
<div class="container">
  <div class="row g-4"> <!-- g-4 adds gutter spacing -->
    <div class="col-lg-8">
      <h1>Main Content</h1>
    </div>
    <div class="col-lg-4">
      <aside>Sidebar</aside>
    </div>
  </div>
</div>
```

#### Bootstrap Components with Accessibility

**Cards:**
```html
<div class="card">
  <img src="image.jpg" class="card-img-top" alt="Descriptive alt text">
  <div class="card-body">
    <h3 class="card-title">Card Title</h3>
    <p class="card-text">Card description text.</p>
    <a href="#" class="btn btn-primary">
      <i class="fas fa-arrow-right" aria-hidden="true"></i>
      Learn More
    </a>
  </div>
</div>
```

**Buttons:**
```html
<!-- Standard buttons -->
<button type="button" class="btn btn-primary">Primary</button>
<button type="button" class="btn btn-secondary">Secondary</button>

<!-- Icon buttons with accessibility -->
<button type="button" class="btn btn-outline-primary" aria-label="Add to favorites">
  <i class="fas fa-heart" aria-hidden="true"></i>
</button>

<!-- Button group -->
<div class="btn-group" role="group" aria-label="Button group">
  <button type="button" class="btn btn-primary">Left</button>
  <button type="button" class="btn btn-primary">Middle</button>
  <button type="button" class="btn btn-primary">Right</button>
</div>
```

**Forms:**
```html
<form>
  <div class="mb-3">
    <label for="name" class="form-label">Full Name</label>
    <input type="text" class="form-control" id="name" name="name" autocomplete="name" required aria-describedby="nameHelp">
    <div id="nameHelp" class="form-text">Enter your full name.</div>
  </div>
  
  <div class="mb-3">
    <label for="email" class="form-label">Email address</label>
    <div class="input-group">
      <span class="input-group-text">
        <i class="fas fa-envelope" aria-hidden="true"></i>
      </span>
      <input type="email" class="form-control" id="email" name="email" autocomplete="email" required aria-describedby="emailHelp">
    </div>
    <div id="emailHelp" class="form-text">We'll never share your email.</div>
  </div>
  
  <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="subscribe" name="subscribe">
    <label class="form-check-label" for="subscribe">
      Subscribe to newsletter
    </label>
  </div>
  
  <button type="submit" class="btn btn-primary">
    <i class="fas fa-paper-plane" aria-hidden="true"></i>
    Submit
  </button>
</form>
```

**Modal:**
```html
<!-- Trigger button -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  <i class="fas fa-plus" aria-hidden="true"></i>
  Open Modal
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal Title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        Modal content goes here.
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">
          <i class="fas fa-save" aria-hidden="true"></i>
          Save Changes
        </button>
      </div>
    </div>
  </div>
</div>
```

### Font Awesome Pro Icon Categories

**Common Icons for Landing Pages (Pro Styles Available):**
```html
<!-- Navigation & UI -->
<i class="fas fa-bars" aria-hidden="true"></i> <!-- Menu (Solid) -->
<i class="fal fa-times" aria-hidden="true"></i> <!-- Close (Light) -->
<i class="far fa-search" aria-hidden="true"></i> <!-- Search (Regular) -->
<i class="fat fa-home" aria-hidden="true"></i> <!-- Home (Thin) -->

<!-- Actions with different styles -->
<i class="fas fa-download" aria-hidden="true"></i> <!-- Solid -->
<i class="fal fa-upload" aria-hidden="true"></i> <!-- Light -->
<i class="far fa-share" aria-hidden="true"></i> <!-- Regular -->
<i class="fad fa-paper-plane" aria-hidden="true"></i> <!-- Duotone -->

<!-- Features & Benefits -->
<i class="fas fa-check" aria-hidden="true"></i>
<i class="fal fa-check-circle" aria-hidden="true"></i>
<i class="far fa-star" aria-hidden="true"></i>
<i class="fad fa-rocket" aria-hidden="true"></i>
<i class="fas fa-shield-alt" aria-hidden="true"></i>
<i class="fal fa-bolt" aria-hidden="true"></i>

<!-- Social Media (Brands) -->
<i class="fab fa-facebook" aria-hidden="true"></i>
<i class="fab fa-twitter" aria-hidden="true"></i>
<i class="fab fa-linkedin" aria-hidden="true"></i>
<i class="fab fa-instagram" aria-hidden="true"></i>
<i class="fab fa-github" aria-hidden="true"></i>

<!-- Contact -->
<i class="fas fa-envelope" aria-hidden="true"></i>
<i class="fas fa-phone" aria-hidden="true"></i>
<i class="fas fa-map-marker-alt" aria-hidden="true"></i>

<!-- Business -->
<i class="fas fa-briefcase" aria-hidden="true"></i>
<i class="fas fa-chart-line" aria-hidden="true"></i>
<i class="fas fa-users" aria-hidden="true"></i>
<i class="fas fa-cog" aria-hidden="true"></i>
```

### Bootstrap Utility Classes for Custom Styling

**Spacing (Margin & Padding):**
```html
<!-- Margin: m-{size}, mt-{size}, mb-{size}, ms-{size}, me-{size} -->
<div class="mt-5 mb-3">Top margin 5, bottom margin 3</div>

<!-- Padding: p-{size}, pt-{size}, pb-{size}, ps-{size}, pe-{size} -->
<div class="p-4">Padding all sides 4</div>

<!-- Responsive spacing -->
<div class="mt-3 mt-md-5">Margin top 3 on mobile, 5 on tablet+</div>
```

**Typography:**
```html
<h1 class="display-1">Large display heading</h1>
<p class="lead">Lead paragraph</p>
<p class="fs-4 fw-bold text-primary">Large, bold, primary color</p>
<p class="text-center text-md-start">Centered on mobile, left-aligned on tablet+</p>
```

**Colors:**
```html
<div class="bg-primary text-white">Primary background, white text</div>
<div class="bg-light text-dark">Light background, dark text</div>
<button class="btn btn-outline-success">Success outline button</button>
```

**Visibility:**
```html
<!-- Hide on specific breakpoints -->
<div class="d-none d-md-block">Hidden on mobile, visible on tablet+</div>

<!-- Visually hidden but accessible to screen readers -->
<span class="visually-hidden">This text is only for screen readers</span>
```

## Semantic HTML Structure
- Use `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`
- Use heading hierarchy (`<h1>` through `<h6>`) correctly
- Use `<button>` for actions, `<a>` for navigation
- Use `<ul>`/`<ol>` for lists, `<table>` for tabular data

### ARIA Attributes
- `aria-label`: Accessible name when visible label insufficient
- `aria-labelledby`: Reference to element(s) that label this one
- `aria-describedby`: Additional descriptive text
- `aria-hidden="true"`: Hide decorative elements from screen readers
- `aria-live`: Announce dynamic content updates (`polite`, `assertive`)
- `aria-expanded`: State of expandable elements
- `aria-current`: Indicate current item in navigation

### Form Accessibility
```html
<form>
  <label for="email">Email Address</label>
  <input 
    type="email" 
    id="email" 
    name="email"
    autocomplete="email"
    required
    aria-describedby="email-help"
  />
  <span id="email-help">We'll never share your email</span>
  <span id="email-error" role="alert" aria-live="assertive"></span>
</form>
```

### Keyboard Navigation
- Ensure all interactive elements are focusable (native elements or `tabindex="0"`)
- Provide visible focus styles (`:focus`, `:focus-visible`)
- Support Enter and Space for custom buttons
- Implement Escape to close modals/dialogs
- Arrow keys for component navigation when appropriate

### Color Contrast CSS
```css
:root {
  /* Ensure 4.5:1 minimum for text */
  --text-primary: #1a1a1a;
  --bg-primary: #ffffff;
  
  /* 3:1 minimum for UI components */
  --border-color: #767676;
  --focus-outline: #0066cc;
}

/* Always provide visible focus indicator */
:focus-visible {
  outline: 3px solid var(--focus-outline);
  outline-offset: 2px;
}
```

### Motion & Animation
```css
/* Respect user preference for reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Default animations for users who don't prefer reduced motion */
@media (prefers-reduced-motion: no-preference) {
  .animate-in {
    animation: slideIn 0.6s ease-out;
  }
}
```

### Interactive Element Sizing
```css
/* Ensure minimum touch target size */
button,
a,
input[type="checkbox"],
input[type="radio"] {
  min-width: 24px;
  min-height: 24px;
  /* Or better: 44x44px for enhanced accessibility */
}
```

## Testing Checklist

### Performance
- [ ] Lighthouse score 90+ (Performance, Accessibility, Best Practices, SEO)
- [ ] First Contentful Paint < 1.8s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Total page weight < 1MB initial load
- [ ] Images optimized and using WebP/AVIF formats
- [ ] Fonts preloaded and using font-display: swap
- [ ] JavaScript deferred or async
- [ ] CSS minified and critical CSS inlined
- [ ] No render-blocking resources

### Accessibility

- [ ] Keyboard navigation works for all interactive elements
- [ ] Screen reader announces all content correctly (test with NVDA/JAWS/VoiceOver)
- [ ] Color contrast meets WCAG AA standards (use browser DevTools)
- [ ] Page works at 200% zoom without horizontal scrolling
- [ ] Focus indicators are clearly visible
- [ ] Skip link works and is visible on focus
- [ ] Forms have proper labels and error messages
- [ ] Images have appropriate alt text
- [ ] Font Awesome icons have `aria-hidden="true"` or proper labels
- [ ] Bootstrap components maintain accessibility features
- [ ] No content flashes more than 3 times per second
- [ ] Motion respects `prefers-reduced-motion`
- [ ] Touch targets are at least 24x24 CSS pixels
- [ ] Page has descriptive `<title>` and `lang` attribute
- [ ] Bootstrap modals trap focus correctly
- [ ] Bootstrap navbar works with keyboard navigation

## Creative Freedom with Accessibility

Accessibility doesn't limit creativity - it expands your audience. The best designs are:

- **Bold** yet **usable**
- **Distinctive** yet **inclusive**
- **Beautiful** yet **functional**

Make unexpected choices in typography, color, layout, and animation - just ensure they work for everyone. Bootstrap provides the foundation; customize it boldly while maintaining accessibility. Font Awesome Pro gives you more icon style options (Light, Thin, Duotone) to enhance your distinctive design. Anime.js v4 enables smooth, performant animations that respect user preferences.

## Resources

- Bootstrap 5.3 Documentation: https://getbootstrap.com/docs/5.3/getting-started/introduction/
- Anime.js v4 Documentation: https://animejs.com
- Anime.js v4 Examples: https://animejs.com/documentation/
- Font Awesome Pro: https://fontawesome.com (requires Pro license)
- Font Awesome Pro Icons: https://fontawesome.com/icons (filter by Pro)
- Full WCAG 2.2 Guidelines: https://www.w3.org/WAI/WCAG22/quickref/
- Contrast Checker: Use browser DevTools or online tools
- Screen Readers: NVDA (Windows), JAWS (Windows), VoiceOver (macOS/iOS)
- Accessibility Testing: axe DevTools, WAVE, Lighthouse
- Bootstrap Accessibility: https://getbootstrap.com/docs/5.3/getting-started/accessibility/
