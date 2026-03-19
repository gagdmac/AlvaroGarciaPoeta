/**
 * Shared <head> resources — fonts, Bootstrap, Font Awesome, shared CSS.
 * Include this script in <head> of every page.
 *
 * Uses document.write to inject render-blocking <link> tags so styles
 * are applied before the first paint (prevents FOUC).
 */
/* eslint-disable no-document-write */
document.write(
  '<link rel="preconnect" href="https://fonts.googleapis.com">' +
  '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' +
  '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300;1,9..40,400&display=swap">' +
  '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">' +
  '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">' +
  '<link rel="stylesheet" href="styles/shared.css">'
);
