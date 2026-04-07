/**
 * Shared site navigation — sticky nav bar.
 * Place <script src="components/header.js"></script> where the nav should appear.
 * Automatically marks the current page link with aria-current="page".
 *
 * The skip-link is injected at the very start of <body> so it always
 * comes first regardless of where this script is placed.
 */
(function () {
  'use strict';

  var currentPage = location.pathname.split('/').pop() || 'index.html';

  var links = [
    { href: 'index.html', label: 'Poemas' },
    { href: 'publish.html', label: 'Publicar' }
  ];

  var navLinks = links.map(function (link) {
    var current = (link.href === currentPage) ? ' aria-current="page"' : '';
    return '<a href="' + link.href + '"' + current + '>' + link.label + '</a>';
  }).join('\n      ');

  // Skip-link — prepend to <body> so it's always the first focusable element
  if (!document.querySelector('.skip-link')) {
    document.body.insertAdjacentHTML('afterbegin',
      '<a href="#main-content" class="skip-link">Saltar al contenido principal</a>');
  }

  // Nav
  var nav =
    '<nav class="site-nav" aria-label="Principal">' +
    '<div class="site-nav__inner">' +
    navLinks +
    '</div></nav>';

  document.currentScript.insertAdjacentHTML('afterend', nav);
})();
