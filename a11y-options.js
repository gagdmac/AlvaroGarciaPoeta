/**
 * Accessibility Options Panel
 *
 * A11y button placed inside the nav bar (first element) + disclosure panel with:
 * - Light / Dark mode toggle
 * - Font size increase (4 steps: 100%, 125%, 150%, 200%) — WCAG 1.4.4 AA
 * - High contrast toggle
 * - Reduced motion toggle
 * - Line spacing toggle
 *
 * Settings are persisted in localStorage.
 * Fully keyboard accessible (Escape closes, click-outside closes).
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'a11y-options';

  // ── Default settings ──
  var defaults = {
    fontSize: 0,        // 0=100%, 1=125%, 2=150%, 3=200%
    lightMode: null,     // null = system, 'light', 'dark'
    highContrast: false,
    reducedMotion: false,
    wideSpacing: false
  };

  // ── Load saved settings ──
  function loadSettings() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return Object.assign({}, defaults, JSON.parse(saved));
    } catch (e) { /* ignore */ }
    return Object.assign({}, defaults);
  }

  function saveSettings(settings) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (e) { /* ignore */ }
  }

  var settings = loadSettings();

  // Font size scale: index → percentage
  var FONT_SIZES = [100, 125, 150, 200];

  // ── Inject CSS ──
  var style = document.createElement('style');
  style.textContent = [
    /* ── Trigger button (inside nav) ── */
    '.a11y-trigger {',
    '  background: none;',
    '  border: none;',
    '  color: var(--color-ink-secondary, #4a4a4a);',
    '  font-size: 1.1rem;',
    '  cursor: pointer;',
    '  display: inline-flex;',
    '  align-items: center;',
    '  justify-content: center;',
    '  padding: 0.75rem 0.5rem;',
    '  min-height: 44px;',
    '  min-width: 44px;',
    '  position: relative;',
    '  transition: color 150ms cubic-bezier(0.16,1,0.3,1);',
    '}',
    '.a11y-trigger .fa-universal-access::before {',
    '  font-size: 1.7rem;',
    '}',
    '.a11y-trigger:hover {',
    '  color: var(--color-ink, #1a1a1a);',
    '}',
    '.a11y-trigger:focus-visible {',
    '  outline: 2px dashed var(--color-focus, #2d5fa8);',
    '  outline-offset: 2px;',
    '}',

    /* ── Nav separator ── */
    '.a11y-nav-sep {',
    '  width: 1px;',
    '  height: 16px;',
    '  background: var(--color-border, #d8d0c6);',
    '  flex-shrink: 0;',
    '}',

    /* ── Panel ── */
    '.a11y-panel {',
    '  position: fixed;',
    '  z-index: 9001;',
    '  width: min(300px, calc(100vw - 2rem));',
    '  box-sizing: border-box;',
    '  max-height: calc(100vh - 4rem);',
    '  overflow-y: auto;',
    '  overflow-x: hidden;',
    '  background: var(--color-surface, #fff);',
    '  border: 1px solid var(--color-border, #d8d0c6);',
    '  border-radius: 8px;',
    '  padding: 1.5rem;',
    '  box-shadow: 0 8px 32px rgba(0,0,0,.14);',
    '  display: none;',
    '  font-family: var(--font-body, "DM Sans", sans-serif);',
    '}',
    '.a11y-panel[open] {',
    '  display: block;',
    '}',

    /* ── Close button ── */
    '.a11y-panel__header {',
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: space-between;',
    '  margin: 0 0 1rem;',
    '  padding-bottom: 0.75rem;',
    '  border-bottom: 1px solid var(--color-border-subtle, #e0d6ce);',
    '}',
    '.a11y-panel__close {',
    '  background: none;',
    '  border: none;',
    '  cursor: pointer;',
    '  color: var(--color-ink-muted, #555);',
    '  font-size: 1.1rem;',
    '  padding: 0.25rem;',
    '  min-width: 44px;',
    '  min-height: 44px;',
    '  display: inline-flex;',
    '  align-items: center;',
    '  justify-content: center;',
    '  border-radius: 4px;',
    '  transition: color 150ms ease, background 150ms ease;',
    '}',
    '.a11y-panel__close:hover {',
    '  color: var(--color-ink, #1a1a1a);',
    '  background: var(--color-accent-subtle, rgba(184,134,11,0.08));',
    '}',
    '.a11y-panel__close:focus-visible {',
    '  outline: 2px dashed var(--color-focus, #2d5fa8);',
    '  outline-offset: 2px;',
    '}',

    /* ── Overlay for mobile ── */
    '.a11y-overlay {',
    '  display: none;',
    '  position: fixed;',
    '  inset: 0;',
    '  z-index: 9000;',
    '  background: rgba(0,0,0,.4);',
    '}',
    '.a11y-overlay[open] {',
    '  display: block;',
    '}',

    '.a11y-panel__title {',
    '  font-family: var(--font-body, "DM Sans", sans-serif);',
    '  font-size: 0.75rem;',
    '  font-weight: 500;',
    '  text-transform: uppercase;',
    '  letter-spacing: 0.2em;',
    '  color: var(--color-ink-secondary, #4a4a4a);',
    '  margin: 0;',
    '}',

    /* ── Option rows ── */
    '.a11y-option {',
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: space-between;',
    '  padding: 0.6rem 0;',
    '}',
    '.a11y-option + .a11y-option {',
    '  border-top: 1px solid var(--color-border-subtle, #e0d6ce);',
    '}',
    '.a11y-option__label {',
    '  font-size: 0.85rem;',
    '  color: var(--color-ink, #1a1a1a);',
    '  display: flex;',
    '  align-items: center;',
    '  gap: 0.5rem;',
    '}',
    '.a11y-option__label i {',
    '  width: 1.2em;',
    '  text-align: center;',
    '  color: var(--color-ink-muted, #555);',
    '}',

    /* ── Toggle switch ── */
    '.a11y-toggle {',
    '  position: relative;',
    '  width: 44px;',
    '  height: 24px;',
    '  background: var(--color-border, #d8d0c6);',
    '  border-radius: 12px;',
    '  border: none;',
    '  cursor: pointer;',
    '  transition: background 150ms ease;',
    '  flex-shrink: 0;',
    '}',
    '.a11y-toggle::after {',
    '  content: "";',
    '  position: absolute;',
    '  top: 2px;',
    '  left: 2px;',
    '  width: 20px;',
    '  height: 20px;',
    '  background: var(--color-bg, #fff);',
    '  border-radius: 50%;',
    '  transition: transform 150ms ease;',
    '}',
    '.a11y-toggle[aria-checked="true"] {',
    '  background: var(--color-accent, #996608);',
    '}',
    '.a11y-toggle[aria-checked="true"]::after {',
    '  transform: translateX(20px);',
    '}',
    '.a11y-toggle:focus-visible {',
    '  outline: 2px dashed var(--color-focus, #4a7cb8);',
    '  outline-offset: 2px;',
    '}',

    /* ── Font size stepper ── */
    '.a11y-font-stepper {',
    '  display: flex;',
    '  align-items: center;',
    '  gap: 0.35rem;',
    '}',
    '.a11y-font-stepper__btn {',
    '  width: 32px;',
    '  height: 32px;',
    '  border-radius: 4px;',
    '  border: 1px solid var(--color-border, #d8d0c6);',
    '  background: var(--color-bg, #f8f5f0);',
    '  color: var(--color-ink, #1a1a1a);',
    '  cursor: pointer;',
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: center;',
    '  font-size: 1rem;',
    '  font-weight: 700;',
    '  transition: background 150ms ease;',
    '}',
    '.a11y-font-stepper__btn:hover {',
    '  background: var(--color-accent-subtle, rgba(184,134,11,0.08));',
    '}',
    '.a11y-font-stepper__btn:disabled {',
    '  opacity: 0.3;',
    '  cursor: not-allowed;',
    '}',
    '.a11y-font-stepper__btn:focus-visible {',
    '  outline: 2px dashed var(--color-focus, #2d5fa8);',
    '  outline-offset: 2px;',
    '}',
    '.a11y-font-stepper__value {',
    '  font-size: 0.75rem;',
    '  font-weight: 500;',
    '  min-width: 3em;',
    '  text-align: center;',
    '  color: var(--color-ink, #1a1a1a);',
    '}',

    /* ── Reset button ── */
    '.a11y-reset {',
    '  display: block;',
    '  width: 100%;',
    '  margin-top: 1rem;',
    '  padding: 0.5rem;',
    '  border: 1px solid var(--color-border, #d8d0c6);',
    '  border-radius: 4px;',
    '  background: transparent;',
    '  font-family: var(--font-body, "DM Sans", sans-serif);',
    '  font-size: 0.75rem;',
    '  font-weight: 500;',
    '  text-transform: uppercase;',
    '  letter-spacing: 0.15em;',
    '  color: var(--color-ink-secondary, #4a4a4a);',
    '  cursor: pointer;',
    '  min-height: 44px;',
    '  transition: background 150ms ease;',
    '}',
    '.a11y-reset:hover {',
    '  background: var(--color-accent-subtle, rgba(184,134,11,0.08));',
    '}',
    '.a11y-reset:focus-visible {',
    '  outline: 2px dashed var(--color-focus, #2d5fa8);',
    '  outline-offset: 2px;',
    '}',

    /* ══════════════════════════════════════════
       A11Y STATE CLASSES ON <html>
       ══════════════════════════════════════════ */

    /* Font zoom — scales only --text-* tokens, not layout spacing (WCAG 1.4.10) */
    '.a11y-font-125 { --_font-scale: 1.25 !important; }',
    '.a11y-font-150 { --_font-scale: 1.5 !important; }',
    '.a11y-font-200 { --_font-scale: 2 !important; }',

    /* Light / Dark mode */
    '.a11y-light {',
    '  color-scheme: light !important;',
    '  --color-bg: #f8f5f0 !important;',
    '  --color-bg-alt: #ffffff !important;',
    '  --color-bg-hero: #f8f5f0 !important;',
    '  --color-surface: #ffffff !important;',
    '  --color-surface-hover: #faf8f5 !important;',
    '  --color-ink: #1a1a1a !important;',
    '  --color-ink-secondary: #4a4a4a !important;',
    '  --color-ink-muted: #555 !important;',
    '  --color-ink-hero: #1a1a1a !important;',
    '  --color-ink-hero-muted: #4a4a4a !important;',
    '  --color-ink-on-dark: #1a1a1a !important;',
    '  --color-ink-on-dark-muted: #4a4a4a !important;',
    '  --color-accent: #996608 !important;',
    '  --color-accent-hover: #7a5207 !important;',
    '  --color-accent-subtle: rgba(184,134,11,0.08) !important;',
    '  --color-border: #d8d0c6 !important;',
    '  --color-border-subtle: #e0d6ce !important;',
    '  --color-focus: #2d5fa8 !important;',
    '  --color-divider: #ccc2ba !important;',
    '  --color-parchment: #f8f5f0 !important;',
    '  --color-parchment-warm: #ffffff !important;',
    '}',

    '.a11y-dark {',
    '  color-scheme: dark !important;',
    '  --color-bg: #0e0e0e !important;',
    '  --color-bg-alt: #161616 !important;',
    '  --color-bg-hero: #0a0a0a !important;',
    '  --color-surface: #1a1a1a !important;',
    '  --color-surface-hover: #1f1f1f !important;',
    '  --color-ink: #eae6e1 !important;',
    '  --color-ink-secondary: #b3b3b3 !important;',
    '  --color-ink-muted: #a0a0a0 !important;',
    '  --color-ink-hero: #eae6e1 !important;',
    '  --color-ink-hero-muted: #d4d4d4 !important;',
    '  --color-ink-on-dark: #eae6e1 !important;',
    '  --color-ink-on-dark-muted: #d4d4d4 !important;',
    '  --color-accent: #e8b84a !important;',
    '  --color-accent-hover: #f0c467 !important;',
    '  --color-accent-subtle: rgba(212,168,83,0.1) !important;',
    '  --color-border: #3a3a3a !important;',
    '  --color-border-subtle: #2a2a2a !important;',
    '  --color-focus: #8db8e8 !important;',
    '  --color-divider: #3a3a3a !important;',
    '  --color-parchment: #0e0e0e !important;',
    '  --color-parchment-warm: #1a1a1a !important;',
    '}',

    /* High contrast overrides */
    '.a11y-high-contrast {',
    '  --color-ink: #000000 !important;',
    '  --color-ink-secondary: #1a1a1a !important;',
    '  --color-ink-muted: #333333 !important;',
    '  --color-bg: #ffffff !important;',
    '  --color-bg-alt: #ffffff !important;',
    '  --color-surface: #f9f9f9 !important;',
    '  --color-parchment: #ffffff !important;',
    '  --color-parchment-warm: #f9f9f9 !important;',
    '  --color-border: #4a4a4a !important;',
    '  --color-border-subtle: #666666 !important;',
    '  --color-accent: #6b3410 !important;',
    '  --color-accent-subtle: rgba(107,52,16,0.12) !important;',
    '  --color-focus: #2d5fa8 !important;',
    '}',

    '.a11y-dark.a11y-high-contrast,',
    '@media (prefers-color-scheme: dark) {',
    '  html:not(.a11y-light).a11y-high-contrast {',
    '    --color-ink: #ffffff !important;',
    '    --color-ink-secondary: #e0e0e0 !important;',
    '    --color-ink-muted: #cccccc !important;',
    '    --color-bg: #000000 !important;',
    '    --color-bg-alt: #000000 !important;',
    '    --color-surface: #0a0a0a !important;',
    '    --color-parchment: #000000 !important;',
    '    --color-parchment-warm: #0a0a0a !important;',
    '    --color-border: #e0e0e0 !important;',
    '    --color-border-subtle: #b3b3b3 !important;',
    '    --color-accent: #f0c878 !important;',
    '    --color-accent-subtle: rgba(240,200,120,0.15) !important;',
    '    --color-focus: #8db8e8 !important;',
    '  }',
    '}',

    '.a11y-reduced-motion, .a11y-reduced-motion * {',
    '  animation-duration: 0.01ms !important;',
    '  animation-iteration-count: 1 !important;',
    '  transition-duration: 0.01ms !important;',
    '}',

    '.a11y-wide-spacing {',
    '  letter-spacing: 0.05em !important;',
    '  word-spacing: 0.12em !important;',
    '  line-height: 2.1 !important;',
    '}',

    /* ── Mobile responsive ── */
    '@media (max-width: 575.98px) {',
    '  .a11y-panel {',
    '    top: auto;',
    '    bottom: 0;',
    '    left: 0;',
    '    right: 0;',
    '    width: 100%;',
    '    border-radius: 12px 12px 0 0;',
    '    max-height: 85vh;',
    '  }',
    '}'
  ].join('\n');
  document.head.appendChild(style);

  // ── Build trigger button ──
  var trigger = document.createElement('button');
  trigger.className = 'a11y-trigger';
  trigger.setAttribute('aria-label', 'Opciones de accesibilidad');
  trigger.setAttribute('aria-expanded', 'false');
  trigger.setAttribute('aria-controls', 'a11y-panel');
  trigger.innerHTML = '<i class="fas fa-universal-access" aria-hidden="true"></i>';

  // ── Build panel ──
  var panel = document.createElement('div');
  panel.className = 'a11y-panel';
  panel.id = 'a11y-panel';
  panel.setAttribute('role', 'region');
  panel.setAttribute('aria-label', 'Opciones de accesibilidad');

  panel.innerHTML = [
    '<div class="a11y-panel__header">',
    '  <h2 class="a11y-panel__title">Accesibilidad</h2>',
    '  <button class="a11y-panel__close" id="a11y-close" aria-label="Cerrar panel de accesibilidad">',
    '    <i class="fas fa-times" aria-hidden="true"></i>',
    '  </button>',
    '</div>',

    // Light / Dark mode
    '<div class="a11y-option">',
    '  <span class="a11y-option__label" id="a11y-theme-label">',
    '    <i class="fas fa-moon" aria-hidden="true"></i>',
    '    Modo oscuro',
    '  </span>',
    '  <button class="a11y-toggle" role="switch" aria-checked="false" aria-labelledby="a11y-theme-label" id="a11y-theme-toggle"></button>',
    '</div>',

    // Font size
    '<div class="a11y-option">',
    '  <span class="a11y-option__label" id="a11y-fontsize-label">',
    '    <i class="fas fa-search-plus" aria-hidden="true"></i>',
    '    Tamaño de texto',
    '  </span>',
    '  <div class="a11y-font-stepper" role="group" aria-labelledby="a11y-fontsize-label">',
    '    <button class="a11y-font-stepper__btn" id="a11y-font-down" aria-label="Reducir tamaño de texto" disabled>−</button>',
    '    <span class="a11y-font-stepper__value" id="a11y-font-value" aria-live="polite">100%</span>',
    '    <button class="a11y-font-stepper__btn" id="a11y-font-up" aria-label="Aumentar tamaño de texto">+</button>',
    '  </div>',
    '</div>',

    // High contrast
    '<div class="a11y-option">',
    '  <span class="a11y-option__label" id="a11y-contrast-label">',
    '    <i class="fas fa-adjust" aria-hidden="true"></i>',
    '    Alto contraste',
    '  </span>',
    '  <button class="a11y-toggle" role="switch" aria-checked="false" aria-labelledby="a11y-contrast-label" id="a11y-contrast-toggle"></button>',
    '</div>',

    // Reduced motion
    '<div class="a11y-option">',
    '  <span class="a11y-option__label" id="a11y-motion-label">',
    '    <i class="fas fa-running" aria-hidden="true"></i>',
    '    Reducir movimiento',
    '  </span>',
    '  <button class="a11y-toggle" role="switch" aria-checked="false" aria-labelledby="a11y-motion-label" id="a11y-motion-toggle"></button>',
    '</div>',

    // Wide spacing
    '<div class="a11y-option">',
    '  <span class="a11y-option__label" id="a11y-spacing-label">',
    '    <i class="fas fa-arrows-alt-v" aria-hidden="true"></i>',
    '    Espaciado amplio',
    '  </span>',
    '  <button class="a11y-toggle" role="switch" aria-checked="false" aria-labelledby="a11y-spacing-label" id="a11y-spacing-toggle"></button>',
    '</div>',

    // Reset
    '<button class="a11y-reset" id="a11y-reset">',
    '  <i class="fas fa-undo" aria-hidden="true"></i> Restablecer',
    '</button>'
  ].join('\n');

  // ── Insert into nav bar as first element ──
  var navInner = document.querySelector('.site-nav__inner');
  if (navInner) {
    // Only the trigger button goes inside the nav
    var wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    wrapper.style.display = 'inline-flex';
    wrapper.style.alignItems = 'center';
    wrapper.appendChild(trigger);

    // Separator between a11y button and nav links
    var sep = document.createElement('span');
    sep.className = 'a11y-nav-sep';
    sep.setAttribute('aria-hidden', 'true');

    navInner.insertBefore(sep, navInner.firstChild);
    navInner.insertBefore(wrapper, navInner.firstChild);

    // Panel and overlay go directly on body (avoids nav backdrop-filter blur)
    var overlay = document.createElement('div');
    overlay.className = 'a11y-overlay';
    document.body.appendChild(overlay);
    document.body.appendChild(panel);
  }

  // ── References ──
  var themeToggle = document.getElementById('a11y-theme-toggle');
  var contrastToggle = document.getElementById('a11y-contrast-toggle');
  var motionToggle = document.getElementById('a11y-motion-toggle');
  var spacingToggle = document.getElementById('a11y-spacing-toggle');
  var resetBtn = document.getElementById('a11y-reset');
  var fontUpBtn = document.getElementById('a11y-font-up');
  var fontDownBtn = document.getElementById('a11y-font-down');
  var fontValueEl = document.getElementById('a11y-font-value');
  var root = document.documentElement;

  // ── Detect system dark mode ──
  function systemPrefersDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function isDarkActive() {
    if (settings.lightMode === 'dark') return true;
    if (settings.lightMode === 'light') return false;
    return systemPrefersDark();
  }

  // ── Apply settings to DOM ──
  function applySettings() {
    // Light / Dark mode
    root.classList.remove('a11y-light', 'a11y-dark');
    if (settings.lightMode === 'light') root.classList.add('a11y-light');
    if (settings.lightMode === 'dark') root.classList.add('a11y-dark');
    themeToggle.setAttribute('aria-checked', String(isDarkActive()));

    // Font size (0=100%, 1=125%, 2=150%, 3=200%)
    root.classList.remove('a11y-font-125', 'a11y-font-150', 'a11y-font-200');
    if (settings.fontSize === 1) root.classList.add('a11y-font-125');
    if (settings.fontSize === 2) root.classList.add('a11y-font-150');
    if (settings.fontSize === 3) root.classList.add('a11y-font-200');

    fontValueEl.textContent = FONT_SIZES[settings.fontSize] + '%';
    fontDownBtn.disabled = (settings.fontSize <= 0);
    fontUpBtn.disabled = (settings.fontSize >= 3);

    // High contrast
    root.classList.toggle('a11y-high-contrast', settings.highContrast);
    contrastToggle.setAttribute('aria-checked', String(settings.highContrast));

    // Reduced motion
    root.classList.toggle('a11y-reduced-motion', settings.reducedMotion);
    motionToggle.setAttribute('aria-checked', String(settings.reducedMotion));

    // Wide spacing
    root.classList.toggle('a11y-wide-spacing', settings.wideSpacing);
    spacingToggle.setAttribute('aria-checked', String(settings.wideSpacing));

    saveSettings(settings);
  }

  // ── Panel open/close ──
  var overlay = document.querySelector('.a11y-overlay');

  function positionPanel() {
    var isMobile = window.matchMedia('(max-width: 575.98px)').matches;
    if (!isMobile) {
      var rect = trigger.getBoundingClientRect();
      panel.style.top = (rect.bottom + 8) + 'px';
      panel.style.left = rect.left + 'px';
      panel.style.right = 'auto';
    } else {
      panel.style.top = '';
      panel.style.left = '';
      panel.style.right = '';
    }
  }

  function onScrollOrResize() {
    if (panel.hasAttribute('open')) positionPanel();
  }

  window.addEventListener('scroll', onScrollOrResize, { passive: true });
  window.addEventListener('resize', onScrollOrResize, { passive: true });

  function openPanel() {
    positionPanel();
    panel.setAttribute('open', '');
    if (overlay) overlay.setAttribute('open', '');
    trigger.setAttribute('aria-expanded', 'true');
    var first = panel.querySelector('button, [tabindex]');
    if (first) first.focus();
  }

  function closePanel() {
    panel.removeAttribute('open');
    if (overlay) overlay.removeAttribute('open');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.focus();
  }

  function togglePanel() {
    if (panel.hasAttribute('open')) {
      closePanel();
    } else {
      openPanel();
    }
  }

  trigger.addEventListener('click', togglePanel);

  // Expose for external triggers (e.g. gate a11y button)
  window.__a11yTogglePanel = togglePanel;

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && panel.hasAttribute('open')) {
      closePanel();
    }
  });

  // Close button inside panel
  var closeBtn = document.getElementById('a11y-close');
  if (closeBtn) closeBtn.addEventListener('click', closePanel);

  // Close on overlay click
  if (overlay) overlay.addEventListener('click', closePanel);

  // Close on click outside
  document.addEventListener('click', function (e) {
    if (panel.hasAttribute('open') && !panel.contains(e.target) && e.target !== trigger && !trigger.contains(e.target)) {
      closePanel();
    }
  });

  // ── Theme toggle ──
  themeToggle.addEventListener('click', function () {
    var dark = isDarkActive();
    settings.lightMode = dark ? 'light' : 'dark';
    applySettings();
  });
  themeToggle.addEventListener('keydown', function (e) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      var dark = isDarkActive();
      settings.lightMode = dark ? 'light' : 'dark';
      applySettings();
    }
  });

  // ── Font size stepper ──
  fontUpBtn.addEventListener('click', function () {
    if (settings.fontSize < 3) {
      settings.fontSize++;
      applySettings();
    }
  });

  fontDownBtn.addEventListener('click', function () {
    if (settings.fontSize > 0) {
      settings.fontSize--;
      applySettings();
    }
  });

  // ── Toggle switches ──
  function handleToggle(toggleEl, key) {
    toggleEl.addEventListener('click', function () {
      settings[key] = !settings[key];
      applySettings();
    });
    toggleEl.addEventListener('keydown', function (e) {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        settings[key] = !settings[key];
        applySettings();
      }
    });
  }

  handleToggle(contrastToggle, 'highContrast');
  handleToggle(motionToggle, 'reducedMotion');
  handleToggle(spacingToggle, 'wideSpacing');

  // ── Reset ──
  resetBtn.addEventListener('click', function () {
    settings = Object.assign({}, defaults);
    applySettings();
  });

  // ── Listen for system theme changes ──
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
      if (settings.lightMode === null) applySettings();
    });
  }

  // ── Apply saved settings on load ──
  applySettings();

})();
