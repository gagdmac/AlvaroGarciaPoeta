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
          '<button class="btn-delete" aria-label="Eliminar soneto" data-filename="sonnets/' + escapeHtml(sonnet.date + '-' + sonnet.slug + '.json') + '">' +
          '<i class="fas fa-trash-alt" aria-hidden="true"></i><span class="btn-delete-label"> Eliminar</span>' +
          '</button>' +
          '</div>';

        item.innerHTML = content;
        sonnetsList.appendChild(item);
      });

      attachDeleteHandlers();
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

  function requestDeleteConfirm(filename, button) {
    var title = button.closest('.sonnet-item')
      .querySelector('.sonnet-item__title')
      .textContent;

    if (confirm('¿Eliminar "' + title + '"?')) {
      requestDeletePassword(filename, button);
    }
  }

  function requestDeletePassword(filename, button) {
    var password = prompt('Introduce la contraseña para confirmar la eliminación:');

    if (password === null) return; // User cancelled
    if (!password) {
      alert('Contraseña requerida.');
      return;
    }

    performDelete(filename, password, button);
  }

  async function performDelete(filename, password, button) {
    button.disabled = true;
button.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i><span class="btn-delete-label"> Eliminando…</span>';

    try {
      var res = await fetch('/api/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename: filename, password: password })
      });

      if (res.status === 403) {
        alert('Contraseña incorrecta.');
      } else if (res.ok) {
        alert('Soneto eliminado.');
        button.closest('.sonnet-item').remove();
        // Optionally reload the list
        sonnetsList.innerHTML = '';
        loadSonnets();
      } else {
        var errText = await res.text();
        alert('Error: ' + errText);
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Error de conexión.');
    } finally {
      button.disabled = false;
        button.innerHTML = '<i class="fas fa-trash-alt" aria-hidden="true"></i><span class="btn-delete-label"> Eliminar</span>';
    }
  }

  // Load sonnets when page ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadSonnets);
  } else {
    loadSonnets();
  }
})();
