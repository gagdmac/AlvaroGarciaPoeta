/**
 * Sonnet Manager — Fetch & Delete handler
 * Loads the list of sonnets and provides deletion functionality
 */

(function () {
  'use strict';

  var sonnetsList = document.getElementById('sonnets-list');

  // Fetch and display sonnets on page load
  async function loadSonnets() {
    try {
      var res = await fetch('/sonnets/index.json');
      if (!res.ok) throw new Error('Failed to load sonnets');
      var sonnets = await res.json();

      if (!Array.isArray(sonnets) || sonnets.length === 0) {
        sonnetsList.innerHTML = '<div class="sonnets-empty">No hay sonetos publicados aún.</div>';
        return;
      }

      // Sort newest first by createdAt timestamp, fallback to date
      sonnets.sort(function (a, b) {
        var aKey = a.createdAt || a.date;
        var bKey = b.createdAt || b.date;
        return bKey.localeCompare(aKey);
      });

      sonnets.forEach(function (sonnet) {
        var item = document.createElement('div');
        item.className = 'sonnet-item';

        var versesPreview = (sonnet.cuarteto1 || [])
          .slice(0, 2)
          .join('\n');

        var content = '<span class="sonnet-item__date">' + (sonnet.date || 'Sin fecha') + '</span>' +
          '<h3 class="sonnet-item__title">' + escapeHtml(sonnet.title || 'Sans titre') + '</h3>';

        if (sonnet.dedication) {
          content += '<p class="sonnet-item__dedication">— ' + escapeHtml(sonnet.dedication) + '</p>';
        }

        content += '<div class="sonnet-item__verses">' + escapeHtml(versesPreview) + '…</div>' +
          '<div class="sonnet-item__actions">' +
          '<button class="btn-edit" aria-label="Editar soneto" data-slug="' + escapeHtml(sonnet.slug) + '" data-date="' + escapeHtml(sonnet.date) + '" data-created-at="' + escapeHtml(sonnet.createdAt || '') + '">' +
          '<i class="fas fa-pen" aria-hidden="true"></i><span class="btn-action-label"> Editar</span>' +
          '</button>' +
          '<button class="btn-delete" aria-label="Ocultar soneto" data-filename="sonnets/' + escapeHtml(sonnet.date + '-' + sonnet.slug + '.json') + '">' +
          '<i class="fas fa-eye-slash" aria-hidden="true"></i><span class="btn-action-label"> Ocultar</span>' +
          '</button>' +
          '</div>';

        item.innerHTML = content;
        sonnetsList.appendChild(item);
      });

      attachDeleteHandlers();
      attachEditHandlers();
    } catch (err) {
      console.error('Error loading sonnets:', err);
      sonnetsList.innerHTML = '<div class="sonnets-empty">Error al cargar sonetos.</div>';
    }
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function attachDeleteHandlers() {
    var deleteButtons = sonnetsList.querySelectorAll('.btn-delete');

    deleteButtons.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var filename = this.getAttribute('data-filename');
        requestDeleteConfirm(filename, this);
      });
    });
  }

  function attachEditHandlers() {
    var editButtons = sonnetsList.querySelectorAll('.btn-edit');

    editButtons.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var slug = this.getAttribute('data-slug');
        var date = this.getAttribute('data-date');
        var filename = 'sonnets/' + date + '-' + slug + '.json';
        loadSonnetForEdit(filename);
      });
    });
  }

  async function loadSonnetForEdit(filename) {
    try {
      var res = await fetch('/' + filename);
      if (!res.ok) throw new Error('Failed to load sonnet');
      var sonnet = await res.json();

      // Pre-fill the form fields
      var titleInput = document.getElementById('title');
      var dedicationInput = document.getElementById('dedication');
      var sonnetTextarea = document.getElementById('sonnet');

      // Store createdAt and original date on the form for edit mode
      var form = document.getElementById('sonnetForm');
      if (form) {
        form.setAttribute('data-edit-created-at', sonnet.createdAt || '');
        form.setAttribute('data-edit-original-date', sonnet.date || '');
        form.setAttribute('data-editing', '1');
        // Update submit button text
        var submitBtn = document.getElementById('submit-btn');
        if (submitBtn) {
          submitBtn.innerHTML = '<i class="fas fa-save" aria-hidden="true"></i> Guardar Soneto';
        }
      }

      if (titleInput) titleInput.value = sonnet.title || '';
      if (dedicationInput) dedicationInput.value = sonnet.dedication || '';

      // Reconstruct the 14 verses from the stanza arrays
      var lines = []
        .concat(sonnet.cuarteto1 || [])
        .concat(sonnet.cuarteto2 || [])
        .concat(sonnet.terceto1 || [])
        .concat(sonnet.terceto2 || []);

      if (sonnetTextarea) {
        sonnetTextarea.value = lines.join('\n');
        // Trigger input event so preview and verse counter update
        sonnetTextarea.dispatchEvent(new Event('input', { bubbles: true }));
      }
      if (titleInput) {
        titleInput.dispatchEvent(new Event('input', { bubbles: true }));
      }

      // Scroll to the form
      var formSection = document.querySelector('.publish-layout__form-column');
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } catch (err) {
      console.error('Edit load error:', err);
      alert('Error al cargar el soneto para editar.');
    }
  }

  function requestDeleteConfirm(filename, button) {
    var title = button.closest('.sonnet-item')
      .querySelector('.sonnet-item__title')
      .textContent;

    if (confirm('¿Ocultar "' + title + '"?')) {
      performDelete(filename, button);
    }
  }

  async function performDelete(filename, button) {
    button.disabled = true;
    button.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i><span class="btn-action-label"> Ocultando…</span>';

    // Use the session password from the publish form
    var passwordInput = document.getElementById('password');
    var password = passwordInput ? passwordInput.value : '';

    try {
      var res = await fetch('/api/hide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename: filename, password: password })
      });

      if (res.ok) {
        alert('Soneto ocultado.');
        button.closest('.sonnet-item').remove();
        sonnetsList.innerHTML = '';
        loadSonnets();
      } else {
        var errText = await res.text();
        alert('Error: ' + errText);
      }
    } catch (err) {
      console.error('Hide error:', err);
      alert('Error de conexión.');
    } finally {
      button.disabled = false;
      button.innerHTML = '<i class="fas fa-eye-slash" aria-hidden="true"></i><span class="btn-action-label"> Ocultar</span>';
    }
  }

  // Load sonnets when page ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadSonnets);
  } else {
    loadSonnets();
  }
})();
