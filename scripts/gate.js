/**
 * Gate Handler — password-protects the publish page.
 *
 * Strategy: probe /api/publish with only the password field.
 *   - 403 → wrong password (server rejects it before anything else)
 *   - anything else → password accepted (server returns 400 for missing fields)
 * The real validation still happens server-side on actual form submission.
 */

(function () {
  'use strict';

  var gateForm  = document.getElementById('gateForm');
  var gateInput = document.getElementById('gate-password');
  var gateError = document.getElementById('gate-error');
  var gateBtn   = document.getElementById('gate-submit-btn');

  // Already authenticated this session — unlock immediately.
  var stored = sessionStorage.getItem('publish-auth');
  if (stored) {
    unlockPage(stored);
    return;
  }

  // Focus the input as soon as the gate is visible.
  gateInput.focus();

  gateForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    gateError.textContent = '';
    gateInput.removeAttribute('aria-invalid');

    var password = gateInput.value;
    if (!password) {
      gateError.textContent = 'La contraseña es obligatoria.';
      gateInput.setAttribute('aria-invalid', 'true');
      return;
    }

    gateBtn.disabled = true;
    gateBtn.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Verificando\u2026';

    try {
      // Probe: only sends password. 403 = wrong, anything else = correct.
      var res = await fetch('/api/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: password })
      });

      if (res.status === 403) {
        gateError.textContent = 'Contraseña incorrecta.';
        gateInput.setAttribute('aria-invalid', 'true');
        gateInput.focus();
      } else {
        sessionStorage.setItem('publish-auth', password);
        unlockPage(password);
      }
    } catch {
      gateError.textContent = 'Error de conexión. Inténtalo de nuevo.';
    } finally {
      gateBtn.disabled = false;
      gateBtn.innerHTML = '<i class="fas fa-lock-open" aria-hidden="true"></i> Acceder';
    }
  });

  function unlockPage(password) {
    function doUnlock() {
      // Flip the CSS switch — gate hides, main reveals.
      document.documentElement.dataset.gateAuth = '1';

      // Pre-fill the form's password field so the user does not retype it.
      var formPassword = document.getElementById('password');
      if (formPassword) {
        formPassword.value = password;
      }

      // Move keyboard focus into the main content area.
      var main = document.getElementById('main-content');
      if (main) {
        main.setAttribute('tabindex', '-1');
        main.focus();
      }
    }

    // Use View Transitions API for a smooth cinematic unlock.
    if (document.startViewTransition) {
      document.startViewTransition(doUnlock);
    } else {
      doUnlock();
    }
  }
})();
