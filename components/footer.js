/**
 * Shared site footer.
 * Place <script src="components/footer.js"></script> where the footer should appear.
 */
(function () {
  'use strict';

  var html =
    '<footer class="site-footer" role="contentinfo">\n' +
    '  <p class="site-footer__text">Sonetos de Álvaro García</p>\n' +
    '</footer>';

  document.currentScript.insertAdjacentHTML('afterend', html);
})();
