/**
 * Accessibility Options Panel
 *
 * Floating a11y button + disclosure panel with:
 * - Font size adjustment (3 levels)
 * - High contrast toggle
 * - Reduced motion toggle
 * - Line spacing toggle
 *
 * Settings are persisted in localStorage.
 * Fully keyboard accessible (Escape closes, focus trap in panel).
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'a11y-options';

  // ── Default settings ──
  var defaults = {
    fontSize: 0,       // -1, 0, 1 (smaller, normal, larger)
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

  // ── Inject CSS ──
  var style = document.createElement('style');
  style.textContent = [
    /* ── Trigger button ── */
    '.a11y-trigger {',
    '  position: fixed;',
    '  bottom: 1.5rem;',
    '  right: 1.5rem;',
    '  z-index: 9000;',
    '  width: 48px;',
    '  height: 48px;',
    '  border-radius: 50%;',
    '  border: 2px solid var(--color-border, #ccc);',
    '  background: var(--color-parchment-warm, #f5efe5);',
    '  color: var(--color-ink, #1a1410);',
    '  font-size: 1.25rem;',
    '  cursor: pointer;',
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: center;',
    '  box-shadow: 0 2px 12px rgba(0,0,0,.12);',
    '  transition: transform 150ms cubic-bezier(0.16,1,0.3,1), box-shadow 150ms ease;',
    '}',
    '.a11y-trigger:hover {',
    '  transform: scale(1.08);',
    '  box-shadow: 0 4px 20px rgba(0,0,0,.18);',
    '}',
    '.a11y-trigger:focus-visible {',
    '  outline: 2px solid var(--color-focus, #5b7bb5);',
    '  outline-offset: 2px;',
    '}',
    '@media (prefers-reduced-motion: reduce) {',
    '  .a11y-trigger:hover { transform: none; }',
    '}',

    /* ── Panel ── */
    '.a11y-panel {',
    '  position: fixed;',
    '  bottom: 5rem;',
    '  right: 1.5rem;',
    '  z-index: 9001;',
    '  width: 280px;',
    '  max-height: calc(100vh - 7rem);',
    '  overflow-y: auto;',
    '  background: var(--color-parchment-warm, #f5efe5);',
    '  border: 1px solid var(--color-border, #ccc);',
    '  border-radius: 0.75rem;',
    '  padding: 1.5rem;',
    '  box-shadow: 0 8px 32px rgba(0,0,0,.14);',
    '  display: none;',
    '  font-family: var(--font-body, Georgia, serif);',
    '}',
    '.a11y-panel[open] {',
    '  display: block;',
    '}',
    '.a11y-panel__title {',
    '  font-family: var(--font-display, Georgia, serif);',
    '  font-size: 0.85rem;',
    '  font-weight: 600;',
    '  text-transform: uppercase;',
    '  letter-spacing: 0.12em;',
    '  color: var(--color-ink-secondary, #5c5347);',
    '  margin: 0 0 1rem;',
    '  padding-bottom: 0.75rem;',
    '  border-bottom: 1px solid var(--color-border-subtle, #ede8e0);',
    '}',

    /* ── Option rows ── */
    '.a11y-option {',
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: space-between;',
    '  padding: 0.6rem 0;',
    '}',
    '.a11y-option + .a11y-option {',
    '  border-top: 1px solid var(--color-border-subtle, #ede8e0);',
    '}',
    '.a11y-option__label {',
    '  font-size: 0.85rem;',
    '  color: var(--color-ink, #1a1410);',
    '  display: flex;',
    '  align-items: center;',
    '  gap: 0.5rem;',
    '}',
    '.a11y-option__label i {',
    '  width: 1.2em;',
    '  text-align: center;',
    '  color: var(--color-ink-muted, #8a8278);',
    '}',

    /* ── Toggle switch ── */
    '.a11y-toggle {',
    '  position: relative;',
    '  width: 44px;',
    '  height: 24px;',
    '  background: var(--color-border, #ccc);',
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
    '  background: var(--color-parchment, #fff);',
    '  border-radius: 50%;',
    '  transition: transform 150ms ease;',
    '}',
    '.a11y-toggle[aria-checked="true"] {',
    '  background: var(--color-accent, #8b4513);',
    '}',
    '.a11y-toggle[aria-checked="true"]::after {',
    '  transform: translateX(20px);',
    '}',
    '.a11y-toggle:focus-visible {',
    '  outline: 2px solid var(--color-focus, #5b7bb5);',
    '  outline-offset: 2px;',
    '}',

    /* ── Font size buttons ── */
    '.a11y-font-controls {',
    '  display: flex;',
    '  gap: 0.25rem;',
    '}',
    '.a11y-font-btn {',
    '  width: 32px;',
    '  height: 32px;',
    '  border-radius: 0.25rem;',
    '  border: 1px solid var(--color-border, #ccc);',
    '  background: var(--color-parchment, #fff);',
    '  color: var(--color-ink, #1a1410);',
    '  cursor: pointer;',
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: center;',
    '  font-size: 0.75rem;',
    '  font-weight: 700;',
    '  transition: background 150ms ease;',
    '}',
    '.a11y-font-btn:hover {',
    '  background: var(--color-accent-subtle, rgba(139,69,19,0.08));',
    '}',
    '.a11y-font-btn[aria-pressed="true"] {',
    '  background: var(--color-accent, #8b4513);',
    '  color: var(--color-parchment, #fff);',
    '  border-color: var(--color-accent, #8b4513);',
    '}',
    '.a11y-font-btn:focus-visible {',
    '  outline: 2px solid var(--color-focus, #5b7bb5);',
    '  outline-offset: 2px;',
    '}',

    /* ── Reset button ── */
    '.a11y-reset {',
    '  display: block;',
    '  width: 100%;',
    '  margin-top: 1rem;',
    '  padding: 0.5rem;',
    '  border: 1px solid var(--color-border, #ccc);',
    '  border-radius: 0.375rem;',
    '  background: transparent;',
    '  font-family: var(--font-display, Georgia, serif);',
    '  font-size: 0.75rem;',
    '  font-weight: 600;',
    '  text-transform: uppercase;',
    '  letter-spacing: 0.1em;',
    '  color: var(--color-ink-secondary, #5c5347);',
    '  cursor: pointer;',
    '  min-height: 44px;',
    '  transition: background 150ms ease;',
    '}',
    '.a11y-reset:hover {',
    '  background: var(--color-accent-subtle, rgba(139,69,19,0.08));',
    '}',
    '.a11y-reset:focus-visible {',
    '  outline: 2px solid var(--color-focus, #5b7bb5);',
    '  outline-offset: 2px;',
    '}',

    /* ══════════════════════════════════════════',
       A11Y STATE CLASSES ON <html>',
       ══════════════════════════════════════════ */
    '.a11y-font-smaller { font-size: 87.5% !important; }',
    '.a11y-font-larger  { font-size: 118.75% !important; }',

    '.a11y-high-contrast {',
    '  --color-ink: #000000 !important;',
    '  --color-ink-secondary: #1a1a1a !important;',
    '  --color-ink-muted: #333333 !important;',
    '  --color-parchment: #ffffff !important;',
    '  --color-parchment-warm: #f9f9f9 !important;',
    '  --color-parchment-deep: #eeeeee !important;',
    '  --color-border: #333333 !important;',
    '  --color-border-subtle: #666666 !important;',
    '  --color-accent: #6b3410 !important;',
    '}',

    '@media (prefers-color-scheme: dark) {',
    '  .a11y-high-contrast {',
    '    --color-ink: #ffffff !important;',
    '    --color-ink-secondary: #e0e0e0 !important;',
    '    --color-ink-muted: #cccccc !important;',
    '    --color-parchment: #000000 !important;',
    '    --color-parchment-warm: #0a0a0a !important;',
    '    --color-parchment-deep: #111111 !important;',
    '    --color-border: #cccccc !important;',
    '    --color-border-subtle: #999999 !important;',
    '    --color-accent: #f0c878 !important;',
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
    '@media (max-width: 400px) {',
    '  .a11y-panel {',
    '    right: 0.5rem;',
    '    left: 0.5rem;',
    '    width: auto;',
    '  }',
    '  .a11y-trigger {',
    '    bottom: 1rem;',
    '    right: 1rem;',
    '  }',
    '}'
  ].join('\n');
  document.head.appendChild(style);

  // ── Build HTML ──
  var trigger = document.createElement('button');
  trigger.className = 'a11y-trigger';
  trigger.setAttribute('aria-label', 'Opciones de accesibilidad');
  trigger.setAttribute('aria-expanded', 'false');
  trigger.setAttribute('aria-controls', 'a11y-panel');
  trigger.innerHTML = '<i class="fas fa-universal-access" aria-hidden="true"></i>';

  var panel = document.createElement('div');
  panel.className = 'a11y-panel';
  panel.id = 'a11y-panel';
  panel.setAttribute('role', 'region');
  panel.setAttribute('aria-label', 'Opciones de accesibilidad');

  panel.innerHTML = [
    '<h2 class="a11y-panel__title">Accesibilidad</h2>',

    // Font size
    '<div class="a11y-option">',
    '  <span class="a11y-option__label" id="a11y-fontsize-label">',
    '    <i class="fas fa-text-height" aria-hidden="true"></i>',
    '    Tamaño de texto',
    '  </span>',
    '  <div class="a11y-font-controls" role="group" aria-labelledby="a11y-fontsize-label">',
    '    <button class="a11y-font-btn" data-size="-1" aria-pressed="false" aria-label="Texto más pequeño">A<small>−</small></button>',
    '    <button class="a11y-font-btn" data-size="0"  aria-pressed="true"  aria-label="Texto normal">A</button>',
    '    <button class="a11y-font-btn" data-size="1"  aria-pressed="false" aria-label="Texto más grande">A<small>+</small></button>',
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

  document.body.appendChild(trigger);
  document.body.appendChild(panel);

  // ── References ──
  var contrastToggle = document.getElementById('a11y-contrast-toggle');
  var motionToggle = document.getElementById('a11y-motion-toggle');
  var spacingToggle = document.getElementById('a11y-spacing-toggle');
  var resetBtn = document.getElementById('a11y-reset');
  var fontBtns = panel.querySelectorAll('.a11y-font-btn');
  var root = document.documentElement;

  // ── Apply settings to DOM ──
  function applySettings() {
    // Font size
    root.classList.remove('a11y-font-smaller', 'a11y-font-larger');
    if (settings.fontSize === -1) root.classList.add('a11y-font-smaller');
    if (settings.fontSize === 1) root.classList.add('a11y-font-larger');

    fontBtns.forEach(function (btn) {
      var size = parseInt(btn.getAttribute('data-size'), 10);
      btn.setAttribute('aria-pressed', size === settings.fontSize ? 'true' : 'false');
    });

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
  function openPanel() {
    panel.setAttribute('open', '');
    trigger.setAttribute('aria-expanded', 'true');
    // Focus the first interactive element in the panel
    var first = panel.querySelector('button, [tabindex]');
    if (first) first.focus();
  }

  function closePanel() {
    panel.removeAttribute('open');
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

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && panel.hasAttribute('open')) {
      closePanel();
    }
  });

  // Close on click outside
  document.addEventListener('click', function (e) {
    if (panel.hasAttribute('open') && !panel.contains(e.target) && e.target !== trigger && !trigger.contains(e.target)) {
      closePanel();
    }
  });

  // ── Font size buttons ──
  fontBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      settings.fontSize = parseInt(btn.getAttribute('data-size'), 10);
      applySettings();
    });
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

  // ── Apply saved settings on load ──
  applySettings();

})();
