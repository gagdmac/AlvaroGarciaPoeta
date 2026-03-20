/**
 * Publish Form Handler
 * Handles sonnet form submission, verse counter, and live preview
 */

(function () {
  'use strict';

  var form = document.getElementById('sonnetForm');
  var titleInput = document.getElementById('title');
  var dedicationInput = document.getElementById('dedication');
  var sonnetTextarea = document.getElementById('sonnet');
  var verseCounter = document.getElementById('verse-count');
  var previewCard = document.getElementById('preview-card');
  var previewPlaceholder = document.getElementById('preview-placeholder');
  var formStatus = document.getElementById('form-status');
  var submitBtn = document.getElementById('submit-btn');

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function getVerses() {
    return sonnetTextarea.value
      .split('\n')
      .filter(function (l) { return l.trim().length > 0; });
  }

  function updateVerseCounter() {
    var count = getVerses().length;
    verseCounter.textContent = count + ' / 14 versos';

    verseCounter.classList.remove('verse-counter--valid', 'verse-counter--invalid');
    if (count === 14) {
      verseCounter.classList.add('verse-counter--valid');
    } else if (count > 14) {
      verseCounter.classList.add('verse-counter--invalid');
    }
  }

  function updatePreview() {
    var title = titleInput.value.trim();
    var dedication = dedicationInput.value.trim();
    var verses = getVerses();

    if (!title && verses.length === 0) {
      previewPlaceholder.hidden = false;
      var existing = previewCard.querySelectorAll('.preview-card__title, .preview-card__dedication, .preview-card__stanza');
      existing.forEach(function (el) { el.remove(); });
      return;
    }

    previewPlaceholder.hidden = true;

    var old = previewCard.querySelectorAll('.preview-card__title, .preview-card__dedication, .preview-card__stanza');
    old.forEach(function (el) { el.remove(); });

    if (title) {
      var h = document.createElement('h3');
      h.className = 'preview-card__title';
      h.textContent = title;
      previewCard.insertBefore(h, previewPlaceholder);
    }

    if (dedication) {
      var d = document.createElement('p');
      d.className = 'preview-card__dedication';
      d.textContent = dedication;
      previewCard.insertBefore(d, previewPlaceholder);
    }

    var stanzaSlices = [
      verses.slice(0, 4),
      verses.slice(4, 8),
      verses.slice(8, 11),
      verses.slice(11, 14)
    ];

    stanzaSlices.forEach(function (stanza) {
      if (stanza.length === 0) return;
      var div = document.createElement('div');
      div.className = 'preview-card__stanza';
      stanza.forEach(function (verse) {
        var span = document.createElement('span');
        span.textContent = verse;
        div.appendChild(span);
      });
      previewCard.insertBefore(div, previewPlaceholder);
    });
  }

  sonnetTextarea.addEventListener('input', function () {
    updateVerseCounter();
    updatePreview();
  });

  titleInput.addEventListener('input', updatePreview);
  dedicationInput.addEventListener('input', updatePreview);

  function clearErrors() {
    var errors = form.querySelectorAll('.form-error');
    errors.forEach(function (el) { el.textContent = ''; });

    var inputs = form.querySelectorAll('[aria-invalid]');
    inputs.forEach(function (el) { el.removeAttribute('aria-invalid'); });

    formStatus.className = 'form-status';
    formStatus.textContent = '';
  }

  function showFieldError(inputEl, errorEl, message) {
    inputEl.setAttribute('aria-invalid', 'true');
    errorEl.textContent = message;
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    clearErrors();

    var password = document.getElementById('password').value;
    var title = titleInput.value.trim();
    var dedication = dedicationInput.value.trim();
    var verses = getVerses();

    var hasError = false;

    if (!title) {
      showFieldError(titleInput, document.getElementById('title-error'), 'El título es obligatorio.');
      hasError = true;
    }

    if (verses.length !== 14) {
      showFieldError(
        sonnetTextarea,
        document.getElementById('sonnet-error'),
        'El soneto debe tener exactamente 14 versos. Tiene ' + verses.length + '.'
      );
      hasError = true;
    }

    if (!password) {
      showFieldError(
        document.getElementById('password'),
        document.getElementById('password-error'),
        'La contraseña es obligatoria.'
      );
      hasError = true;
    }

    if (hasError) {
      var firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Publicando…';

    try {
      var res = await fetch('/api/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password: password,
          title: title,
          dedication: dedication,
          sonnet: sonnetTextarea.value.trim()
        })
      });

      if (res.ok) {
        formStatus.className = 'form-status form-status--success';
        formStatus.textContent = '¡Soneto publicado! Aparecerá en la web en unos minutos.';
        form.reset();
        updateVerseCounter();
        updatePreview();
      } else {
        var errText = await res.text();
        formStatus.className = 'form-status form-status--error';
        formStatus.textContent = 'Error: ' + errText;
      }
    } catch (err) {
      formStatus.className = 'form-status form-status--error';
      formStatus.textContent = 'Error de conexión. Inténtalo de nuevo.';
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fas fa-feather-alt" aria-hidden="true"></i> Publicar Soneto';
    }
  });
})();
