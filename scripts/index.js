/**
 * Sonnets Loader
 * Loads sonnets from index.json and renders card grid
 */

(function () {
  'use strict';

  var grid = document.getElementById('sonnets-grid');
  var emptyState = document.getElementById('empty-state');
  var statusRegion = document.getElementById('sonnets-status');

  function formatDate(dateStr) {
    var months = ['enero','febrero','marzo','abril','mayo','junio',
      'julio','agosto','septiembre','octubre','noviembre','diciembre'];
    var p = dateStr.split('-');
    return parseInt(p[2],10) + ' de ' + months[parseInt(p[1],10)-1] + ' de ' + p[0];
  }

  function createStanza(verses, label) {
    var el = document.createElement('div');
    el.className = 'sonnet-card__stanza';
    el.setAttribute('aria-label', label);
    verses.forEach(function (v) {
      var s = document.createElement('span');
      s.className = 'sonnet-card__verse';
      s.textContent = v;
      el.appendChild(s);
    });
    return el;
  }

  // ── Image export helpers ─────────────────────────────────────────────────
  function wrapText(ctx, text, maxWidth) {
    if (!text) return [''];
    var words = text.split(' ');
    var lines = [];
    var current = '';
    for (var i = 0; i < words.length; i++) {
      var word = words[i];
      var test = current ? current + ' ' + word : word;
      if (ctx.measureText(test).width > maxWidth && current) {
        lines.push(current);
        current = word;
      } else {
        current = test;
      }
    }
    if (current) lines.push(current);
    return lines.length ? lines : [''];
  }

  function generatePoemImage(sonnet, typeLabel) {
    return document.fonts.ready.then(function () {
      var SCALE = 2, W = 680, PAD_H = 52, PAD_V = 48, MAX_W = W - PAD_H * 2;

      var C_BG = '#f8f5f0', C_INK = '#1a1a1a', C_ACCENT = '#996608',
          C_MUTED = '#555555', C_BORDER = '#d8d0c6';
      var FONT_DISPLAY = '"Playfair Display", Georgia, serif';
      var FONT_BODY    = '"DM Sans", "Helvetica Neue", sans-serif';
      var VERSE_SIZE = 14.5, VERSE_LH = 26, TITLE_SIZE = 28, TITLE_LH = 36;
      var isAcrostic = sonnet.type === 'acrostico';

      var stanzas;
      if (sonnet.type && sonnet.type !== 'soneto') {
        stanzas = [sonnet.verses || []];
      } else {
        stanzas = [
          sonnet.cuarteto1 || [], sonnet.cuarteto2 || [],
          sonnet.terceto1  || [], sonnet.terceto2  || []
        ].filter(function (s) { return s.length > 0; });
      }

      // Pass 1: measure height
      var tmp = document.createElement('canvas');
      tmp.width = W * SCALE; tmp.height = 100;
      var tc = tmp.getContext('2d');
      tc.scale(SCALE, SCALE);

      tc.font = 'italic 600 ' + TITLE_SIZE + 'px ' + FONT_DISPLAY;
      var titleLines = wrapText(tc, sonnet.title || '', MAX_W);

      var totalVerseH = stanzas.reduce(function (acc, stanza, si) {
        tc.font = VERSE_SIZE + 'px ' + FONT_BODY;
        var h = stanza.reduce(function (a, v) {
          return a + wrapText(tc, v.trim(), MAX_W).length * VERSE_LH;
        }, 0);
        return acc + h + (si < stanzas.length - 1 ? 24 : 0);
      }, 0);

      var totalH = PAD_V + 18 + 10
        + titleLines.length * TITLE_LH + 8
        + (sonnet.dedication ? 28 : 0)
        + 24 + 1 + 24 + totalVerseH
        + 32 + 1 + 20 + 16 + 6
        + (sonnet.date ? 16 : 0) + PAD_V;

      // Pass 2: draw
      var canvas = document.createElement('canvas');
      canvas.width = W * SCALE;
      canvas.height = Math.ceil(totalH) * SCALE;
      var ctx = canvas.getContext('2d');
      ctx.scale(SCALE, SCALE);

      ctx.fillStyle = C_BG;
      ctx.fillRect(0, 0, W, Math.ceil(totalH));

      // Ruled paper texture
      ctx.strokeStyle = C_BORDER; ctx.lineWidth = 0.5; ctx.globalAlpha = 0.18;
      for (var ry = 28; ry < totalH; ry += 28) {
        ctx.beginPath(); ctx.moveTo(0, ry); ctx.lineTo(W, ry); ctx.stroke();
      }
      ctx.globalAlpha = 1;
      ctx.textBaseline = 'top';

      function setLS(v) { if ('letterSpacing' in ctx) ctx.letterSpacing = v; }

      var y = PAD_V;

      // Type badge
      ctx.font = '500 10px ' + FONT_BODY; setLS('2px');
      ctx.fillStyle = C_ACCENT;
      ctx.fillText(typeLabel.toUpperCase(), PAD_H, y);
      y += 28;

      // Title
      ctx.font = 'italic 600 ' + TITLE_SIZE + 'px ' + FONT_DISPLAY; setLS('-0.3px');
      ctx.fillStyle = C_INK;
      titleLines.forEach(function (line) { ctx.fillText(line, PAD_H, y); y += TITLE_LH; });
      y += 8;

      // Dedication
      if (sonnet.dedication) {
        ctx.font = '300 italic 13px ' + FONT_BODY; setLS('0px');
        ctx.fillStyle = C_MUTED;
        ctx.fillText(sonnet.dedication, PAD_H, y);
        y += 28;
      }
      y += 24;

      // Gold rule
      ctx.fillStyle = C_ACCENT; ctx.globalAlpha = 0.6;
      ctx.fillRect(PAD_H, y, 24, 1);
      ctx.globalAlpha = 1;
      y += 25;

      // Verses
      stanzas.forEach(function (stanza, si) {
        stanza.forEach(function (verse) {
          ctx.font = VERSE_SIZE + 'px ' + FONT_BODY; setLS('0px');
          var wrapped = wrapText(ctx, verse.trim(), MAX_W);
          wrapped.forEach(function (line, li) {
            if (isAcrostic && li === 0 && line.length > 0) {
              var firstChar = line.charAt(0), rest = line.slice(1);
              ctx.save();
              ctx.font = 'italic 700 ' + (VERSE_SIZE * 1.15) + 'px ' + FONT_DISPLAY;
              ctx.fillStyle = C_ACCENT;
              ctx.fillText(firstChar, PAD_H, y);
              var firstW = ctx.measureText(firstChar).width + 2;
              ctx.restore();
              ctx.font = VERSE_SIZE + 'px ' + FONT_BODY; setLS('0px');
              ctx.fillStyle = C_INK;
              ctx.fillText(rest, PAD_H + firstW, y);
            } else {
              ctx.fillStyle = C_INK;
              ctx.fillText(line, PAD_H, y);
            }
            y += VERSE_LH;
          });
        });
        if (si < stanzas.length - 1) y += 24;
      });

      // Footer rule
      y += 32;
      ctx.strokeStyle = C_BORDER; ctx.lineWidth = 1; ctx.globalAlpha = 0.5;
      ctx.beginPath(); ctx.moveTo(PAD_H, y); ctx.lineTo(W - PAD_H, y); ctx.stroke();
      ctx.globalAlpha = 1;
      y += 20;

      ctx.font = '400 11px ' + FONT_BODY; setLS('1.5px');
      ctx.fillStyle = C_MUTED;
      ctx.fillText('\u00c1LVARO GARC\u00cdA \u2014 POETA', PAD_H, y);
      y += 22;

      if (sonnet.date) {
        ctx.font = '300 11px ' + FONT_BODY; setLS('0px');
        ctx.fillStyle = C_MUTED;
        ctx.fillText(formatDate(sonnet.date), PAD_H, y);
      }

      return canvas;
    });
  }

  function createSonnetCard(sonnet, index) {
    var item = document.createElement('div');
    item.className = 'masonry-item col-12 col-md-6';

    var TYPE_LABELS = { soneto: 'Soneto', acrostico: 'Acróstico', haiku: 'Haiku', 'verso-libre': 'Verso libre' };
    var typeLabel = TYPE_LABELS[sonnet.type] || 'Soneto';

    var article = document.createElement('article');
    article.className = 'sonnet-card';
    article.setAttribute('aria-label', typeLabel + ': ' + sonnet.title);
    article.setAttribute('data-poem-type', sonnet.type || 'soneto');

    // Ghost number
    var num = document.createElement('span');
    num.className = 'sonnet-card__number';
    num.setAttribute('aria-hidden', 'true');
    num.textContent = String(index + 1).padStart(2, '0');
    article.appendChild(num);

    // Header
    var header = document.createElement('div');
    header.className = 'sonnet-card__header';

    var typeBadge = document.createElement('span');
    typeBadge.className = 'sonnet-card__type';
    typeBadge.textContent = typeLabel;
    typeBadge.setAttribute('aria-label', 'Tipo: ' + typeLabel);
    header.appendChild(typeBadge);

    var title = document.createElement('h3');
    title.className = 'sonnet-card__title';
    title.textContent = sonnet.title;
    header.appendChild(title);

    if (sonnet.dedication) {
      var ded = document.createElement('p');
      ded.className = 'sonnet-card__dedication';
      ded.textContent = sonnet.dedication;
      header.appendChild(ded);
    }
    article.appendChild(header);

    var hr = document.createElement('hr');
    hr.className = 'sonnet-card__divider';
    hr.setAttribute('aria-hidden', 'true');
    article.appendChild(hr);

    if (sonnet.type && sonnet.type !== 'soneto') {
      if (sonnet.verses && sonnet.verses.length) {
        article.appendChild(createStanza(sonnet.verses, 'Versos del ' + typeLabel.toLowerCase()));
      }
    } else {
      [['cuarteto1','Primer cuarteto'],['cuarteto2','Segundo cuarteto'],
       ['terceto1','Primer terceto'],['terceto2','Segundo terceto']].forEach(function (p) {
        if (sonnet[p[0]] && sonnet[p[0]].length) {
          article.appendChild(createStanza(sonnet[p[0]], p[1]));
        }
      });
    }

    if (sonnet.date) {
      var footer = document.createElement('div');
      footer.className = 'sonnet-card__footer';
      var time = document.createElement('time');
      time.className = 'sonnet-card__date';
      time.setAttribute('datetime', sonnet.date);
      time.textContent = formatDate(sonnet.date);
      footer.appendChild(time);
      var shareBtn = document.createElement('button');
      shareBtn.className = 'sonnet-card__share';
      shareBtn.setAttribute('aria-label', 'Compartir imagen del poema');
      shareBtn.innerHTML = '<i class="fas fa-image" aria-hidden="true"></i> Compartir';
      shareBtn.addEventListener('click', function () {
        shareBtn.disabled = true;
        shareBtn.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i>';
        function resetBtn() {
          shareBtn.disabled = false;
          shareBtn.innerHTML = '<i class="fas fa-image" aria-hidden="true"></i> Compartir';
        }
        generatePoemImage(sonnet, typeLabel)
          .then(function (canvas) {
            canvas.toBlob(function (blob) {
              var filename = (sonnet.slug || 'poema') + '.png';
              var file = new File([blob], filename, { type: 'image/png' });
              if (navigator.canShare && navigator.canShare({ files: [file] })) {
                navigator.share({ files: [file], title: sonnet.title })
                  .catch(function () {})
                  .finally(resetBtn);
              } else {
                var url = URL.createObjectURL(blob);
                var a = document.createElement('a');
                a.href = url; a.download = filename; a.click();
                setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
                resetBtn();
              }
            }, 'image/png');
          })
          .catch(resetBtn);
      });
      footer.appendChild(shareBtn);

      article.appendChild(footer);
    }

    item.appendChild(article);
    return item;
  }

  var PER_PAGE = 6;
  var allSonnets = [];
  var currentPage = 1;
  var totalPages = 1;

  var paginator = document.getElementById('paginator');
  var prevBtn = document.getElementById('paginator-prev');
  var nextBtn = document.getElementById('paginator-next');
  var pageInfo = document.getElementById('paginator-info');

  function renderPage(page) {
    currentPage = page;
    grid.innerHTML = '';
    var start = (page - 1) * PER_PAGE;
    var slice = allSonnets.slice(start, start + PER_PAGE);
    var frag = document.createDocumentFragment();
    slice.forEach(function (s, i) { frag.appendChild(createSonnetCard(s, start + i)); });
    grid.appendChild(frag);
    updatePaginator();
    // Scroll to top of sonnets section
    var section = document.getElementById('sonnets-heading');
    if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function updatePaginator() {
    if (totalPages <= 1) {
      paginator.hidden = true;
      return;
    }
    paginator.hidden = false;
    pageInfo.textContent = currentPage + ' / ' + totalPages;
    prevBtn.disabled = currentPage <= 1;
    nextBtn.disabled = currentPage >= totalPages;
  }

  if (prevBtn) prevBtn.addEventListener('click', function () {
    if (currentPage > 1) renderPage(currentPage - 1);
  });
  if (nextBtn) nextBtn.addEventListener('click', function () {
    if (currentPage < totalPages) renderPage(currentPage + 1);
  });

  async function loadSonnets() {
    try {
      var res = await fetch('sonnets/index.json');
      if (!res.ok) throw new Error();
      allSonnets = (await res.json()).filter(function (s) { return !s.hidden; });
      // Sort newest first by createdAt timestamp, fallback to date
      allSonnets.sort(function (a, b) {
        var aKey = a.createdAt || a.date;
        var bKey = b.createdAt || b.date;
        return bKey.localeCompare(aKey);
      });

      if (!allSonnets.length) {
        emptyState.hidden = false;
        statusRegion.textContent = 'No hay sonetos publicados.';
        return;
      }

      totalPages = Math.ceil(allSonnets.length / PER_PAGE);
      renderPage(1);
    } catch (e) {
      emptyState.hidden = false;
      statusRegion.textContent = 'No hay sonetos publicados.';
    }
  }

  loadSonnets();
})();
