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
      var shareBtn = document.createElement('button');
      shareBtn.className = 'sonnet-card__share';
      shareBtn.setAttribute('aria-label', 'Compartir en Facebook');
      shareBtn.innerHTML = '<i class="fas fa-share-alt" aria-hidden="true"></i> Facebook';
      shareBtn.addEventListener('click', function () {
        var siteUrl = window.location.origin;
        // On mobile, use native share sheet (lets user pick FB app if installed)
        if (navigator.share) {
          navigator.share({
            title: 'Álvaro García — Poeta',
            url: siteUrl
          }).catch(function () { /* user cancelled */ });
        } else {
          // Desktop fallback: open Facebook web sharer
          var fbUrl = 'https://www.facebook.com/sharer.php?u=' + encodeURIComponent(siteUrl);
          window.open(fbUrl, '_blank', 'width=600,height=500,noopener,noreferrer');
        }
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
