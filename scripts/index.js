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

  function createSonnetCard(sonnet, index) {
    var item = document.createElement('div');
    item.className = 'masonry-item';

    var article = document.createElement('article');
    article.className = 'sonnet-card';
    article.setAttribute('aria-label', 'Soneto: ' + sonnet.title);

    // Ghost number
    var num = document.createElement('span');
    num.className = 'sonnet-card__number';
    num.setAttribute('aria-hidden', 'true');
    num.textContent = String(index + 1).padStart(2, '0');
    article.appendChild(num);

    // Header
    var header = document.createElement('div');
    header.className = 'sonnet-card__header';
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

    [['cuarteto1','Primer cuarteto'],['cuarteto2','Segundo cuarteto'],
     ['terceto1','Primer terceto'],['terceto2','Segundo terceto']].forEach(function (p) {
      if (sonnet[p[0]] && sonnet[p[0]].length) {
        article.appendChild(createStanza(sonnet[p[0]], p[1]));
      }
    });

    if (sonnet.date) {
      var footer = document.createElement('div');
      footer.className = 'sonnet-card__footer';
      var time = document.createElement('time');
      time.className = 'sonnet-card__date';
      time.setAttribute('datetime', sonnet.date);
      time.textContent = formatDate(sonnet.date);
      footer.appendChild(time);
      var tag = document.createElement('span');
      tag.className = 'sonnet-card__tag';
      tag.setAttribute('aria-hidden', 'true');
      tag.textContent = 'Soneto';
      footer.appendChild(tag);
      article.appendChild(footer);
    }

    item.appendChild(article);
    return item;
  }

  async function loadSonnets() {
    try {
      var res = await fetch('sonnets/index.json');
      if (!res.ok) throw new Error();
      var sonnets = await res.json();
      // Sort by date desc; when dates are equal, newer entries (higher index) come first
      sonnets = sonnets.map(function (s, i) { return { s: s, i: i }; })
        .sort(function (a, b) {
          var d = b.s.date.localeCompare(a.s.date);
          return d !== 0 ? d : b.i - a.i;
        })
        .map(function (x) { return x.s; });

      if (!sonnets.length) {
        emptyState.hidden = false;
        // Only announce on empty state
        statusRegion.textContent = 'No hay sonetos publicados.';
        return;
      }

      var frag = document.createDocumentFragment();
      sonnets.forEach(function (s, i) { frag.appendChild(createSonnetCard(s, i)); });
      grid.appendChild(frag);
      // Don't announce on initial page load - aria-live is for dynamic updates only
    } catch (e) {
      emptyState.hidden = false;
      statusRegion.textContent = 'No hay sonetos publicados.';
    }
  }

  loadSonnets();
})();
