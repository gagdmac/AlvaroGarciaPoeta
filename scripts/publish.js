/**
 * Publish Form Handler
 * Handles poem type selection, verse counter, live preview, and form submission.
 */

(function () {
  'use strict';

  // ── Poem Type Configurations ────────────────────────────────────────────────
  var POEM_TYPES = {
    soneto: {
      heading: 'Publicar Soneto',
      subtitle: 'Escribe o pega un soneto de 14 versos',
      hint: '14 versos, uno por línea. Dos cuartetos (4+4) y dos tercetos (3+3).',
      titleLabel: 'Título del Soneto',
      bodyLabel: 'Soneto',
      counterTarget: 14,
      counterLabel: function (n) { return n + ' / 14 versos'; },
      validate: function (verses) {
        return verses.length === 14
          ? null
          : 'El soneto debe tener exactamente 14 versos. Tiene ' + verses.length + '.';
      },
      stanzaSlices: [[0, 4], [4, 8], [8, 11], [11, 14]],
      btnLabel: 'Publicar Soneto',
      btnIcon: 'fa-feather-alt'
    },
    acrostico: {
      heading: 'Publicar Acróstico',
      subtitle: 'Las iniciales de cada verso forman una palabra o nombre',
      hint: 'Cada verso comienza con la letra que, en conjunto, deletrea la palabra dedicada.',
      titleLabel: 'Título del Acróstico',
      bodyLabel: 'Acróstico',
      counterTarget: null,
      counterLabel: function (n) { return n + (n === 1 ? ' verso' : ' versos'); },
      validate: function (verses) {
        if (verses.length < 2) return 'El acróstico debe tener al menos 2 versos.';
        if (verses.length > 50) return 'El acróstico no puede superar los 50 versos.';
        return null;
      },
      stanzaSlices: null,
      btnLabel: 'Publicar Acróstico',
      btnIcon: 'fa-signature'
    },
    haiku: {
      heading: 'Publicar Haiku',
      subtitle: 'Escribe un haiku de 3 versos (5 · 7 · 5 sílabas)',
      hint: '3 versos: 5 sílabas • 7 sílabas • 5 sílabas.',
      titleLabel: 'Título del Haiku',
      bodyLabel: 'Haiku',
      counterTarget: 3,
      counterLabel: function (n) { return n + ' / 3 versos'; },
      validate: function (verses) {
        return verses.length === 3
          ? null
          : 'El haiku debe tener exactamente 3 versos. Tiene ' + verses.length + '.';
      },
      stanzaSlices: [[0, 3]],
      btnLabel: 'Publicar Haiku',
      btnIcon: 'fa-leaf'
    },
    'verso-libre': {
      heading: 'Publicar Verso Libre',
      subtitle: 'Escribe sin restricciones de forma ni rima',
      hint: 'Sin restricción de versos ni rima. Las líneas en blanco separan estrofas.',
      titleLabel: 'Título del Poema',
      bodyLabel: 'Poema',
      counterTarget: null,
      counterLabel: function (n) { return n + (n === 1 ? ' verso' : ' versos'); },
      validate: function (verses) {
        if (verses.length < 1) return 'El poema debe tener al menos 1 verso.';
        if (verses.length > 200) return 'El poema no puede superar los 200 versos.';
        return null;
      },
      stanzaSlices: null,
      btnLabel: 'Publicar Verso Libre',
      btnIcon: 'fa-feather'
    }
  };

  // ── DOM references ──────────────────────────────────────────────────────────
  var form = document.getElementById('sonnetForm');
  var titleInput = document.getElementById('title');
  var dedicationInput = document.getElementById('dedication');
  var sonnetTextarea = document.getElementById('sonnet');
  var verseCounter = document.getElementById('verse-count');
  var previewCard = document.getElementById('preview-card');
  var previewPlaceholder = document.getElementById('preview-placeholder');
  var formStatus = document.getElementById('form-status');
  var submitBtn = document.getElementById('submit-btn');
  var publishHeading = document.getElementById('publish-heading');
  var publishSubtitle = document.getElementById('publish-subtitle');
  var sonnetHint = document.getElementById('sonnet-hint');
  var titleLabel = document.getElementById('title-label');
  var poemBodyLabel = document.getElementById('poem-body-label');

  // ── Poem Type Picker ──────────────────────────────────────────────────────
  function getCurrentType() {
    var radios = document.querySelectorAll('input[name="poem-type"]');
    for (var i = 0; i < radios.length; i++) {
      if (radios[i].checked) return radios[i].value;
    }
    return 'soneto';
  }

  function applyPoemType(typeKey) {
    var cfg = POEM_TYPES[typeKey] || POEM_TYPES.soneto;
    if (publishHeading) publishHeading.textContent = cfg.heading;
    if (publishSubtitle) publishSubtitle.textContent = cfg.subtitle;
    if (sonnetHint) sonnetHint.textContent = cfg.hint;
    if (titleLabel) titleLabel.textContent = cfg.titleLabel;
    if (poemBodyLabel) poemBodyLabel.textContent = cfg.bodyLabel;
    if (previewCard) previewCard.setAttribute('data-poem-type', typeKey);
    if (form.getAttribute('data-editing') !== '1') {
      submitBtn.innerHTML = '<i class="fas ' + cfg.btnIcon + '" aria-hidden="true"></i> ' + cfg.btnLabel;
    }
    updateVerseCounter();
    updatePreview();
  }

  document.querySelectorAll('input[name="poem-type"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
      applyPoemType(this.value);
    });
  });

  // ── Utilities ───────────────────────────────────────────────────────────────
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

  // Split raw text into stanza arrays using blank lines as separators
  function getVerseStanzas() {
    var lines = sonnetTextarea.value.split('\n');
    var stanzas = [];
    var current = [];
    lines.forEach(function (line) {
      if (line.trim() === '') {
        if (current.length > 0) { stanzas.push(current); current = []; }
      } else {
        current.push(line);
      }
    });
    if (current.length > 0) stanzas.push(current);
    return stanzas;
  }

  // ── Verse Counter ────────────────────────────────────────────────────────
  function updateVerseCounter() {
    var cfg = POEM_TYPES[getCurrentType()] || POEM_TYPES.soneto;
    var count = getVerses().length;
    verseCounter.textContent = cfg.counterLabel(count);
    verseCounter.classList.remove('verse-counter--valid', 'verse-counter--invalid');
    if (cfg.counterTarget !== null) {
      if (count === cfg.counterTarget) {
        verseCounter.classList.add('verse-counter--valid');
      } else if (count > cfg.counterTarget) {
        verseCounter.classList.add('verse-counter--invalid');
      }
    }
  }

  // ── Preview ──────────────────────────────────────────────────────────────
  function updatePreview() {
    var cfg = POEM_TYPES[getCurrentType()] || POEM_TYPES.soneto;
    var title = titleInput.value.trim();
    var dedication = dedicationInput.value.trim();
    var verses = getVerses();

    if (!title && verses.length === 0) {
      previewPlaceholder.hidden = false;
      previewCard.querySelectorAll('.preview-card__title, .preview-card__dedication, .preview-card__stanza')
        .forEach(function (el) { el.remove(); });
      return;
    }

    previewPlaceholder.hidden = true;
    previewCard.querySelectorAll('.preview-card__title, .preview-card__dedication, .preview-card__stanza')
      .forEach(function (el) { el.remove(); });

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

    var stanzaArrays;
    if (cfg.stanzaSlices) {
      stanzaArrays = cfg.stanzaSlices.map(function (s) { return verses.slice(s[0], s[1]); });
    } else {
      stanzaArrays = getVerseStanzas();
    }

    stanzaArrays.forEach(function (stanza) {
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

  // ── Form Validation ──────────────────────────────────────────────────────
  function clearErrors() {
    form.querySelectorAll('.form-error').forEach(function (el) { el.textContent = ''; });
    form.querySelectorAll('[aria-invalid]').forEach(function (el) { el.removeAttribute('aria-invalid'); });
    formStatus.className = 'form-status';
    formStatus.textContent = '';
  }

  function showFieldError(inputEl, errorEl, message) {
    inputEl.setAttribute('aria-invalid', 'true');
    errorEl.textContent = message;
  }

  // ── Form Submit ──────────────────────────────────────────────────────────
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    clearErrors();

    var typeKey = getCurrentType();
    var cfg = POEM_TYPES[typeKey] || POEM_TYPES.soneto;
    var password = document.getElementById('password').value;
    var title = titleInput.value.trim();
    var dedication = dedicationInput.value.trim();
    var verses = getVerses();

    var hasError = false;

    if (!title) {
      showFieldError(titleInput, document.getElementById('title-error'), 'El título es obligatorio.');
      hasError = true;
    }

    var verseError = cfg.validate(verses);
    if (verseError) {
      showFieldError(sonnetTextarea, document.getElementById('sonnet-error'), verseError);
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
    var isEditing = form.getAttribute('data-editing') === '1';
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> ' + (isEditing ? 'Guardando…' : 'Publicando…');

    var payload = {
      password: password,
      title: title,
      dedication: dedication,
      sonnet: sonnetTextarea.value.trim(),
      poemType: typeKey
    };

    if (isEditing) {
      var originalCreatedAt = form.getAttribute('data-edit-created-at');
      var originalDate = form.getAttribute('data-edit-original-date');
      if (originalCreatedAt) payload.createdAt = originalCreatedAt;
      if (originalDate) payload.originalDate = originalDate;
    }

    try {
      var res = await fetch('/api/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        var typeName = cfg.heading.replace('Publicar ', '');
        formStatus.className = 'form-status form-status--success';
        formStatus.textContent = isEditing
          ? '¡' + typeName + ' guardado!'
          : '¡' + typeName + ' publicado! La lista se actualiza automáticamente.';
        form.removeAttribute('data-editing');
        form.removeAttribute('data-edit-created-at');
        form.removeAttribute('data-edit-original-date');
        setTimeout(function () { location.reload(); }, 1500);
        form.reset();
        applyPoemType(typeKey);
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
      if (form.getAttribute('data-editing') === '1') {
        submitBtn.innerHTML = '<i class="fas fa-save" aria-hidden="true"></i> Guardar cambios';
      } else {
        var currentCfg = POEM_TYPES[getCurrentType()] || POEM_TYPES.soneto;
        submitBtn.innerHTML = '<i class="fas ' + currentCfg.btnIcon + '" aria-hidden="true"></i> ' + currentCfg.btnLabel;
      }
    }
  });

  // Initialize UI with default type
  applyPoemType(getCurrentType());
})();
