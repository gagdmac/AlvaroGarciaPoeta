/**
 * Cloudflare Pages Function: POST /api/hide
 *
 * Toggles a sonnet's hidden flag (hide/unhide).
 *
 * Required environment variables:
 *   PUBLISH_PASSWORD - Password for authentication
 *   GITHUB_REPO      - e.g. "username/AlvaroGarciaPoeta"
 *   GITHUB_TOKEN     - Fine-grained PAT with contents:write scope
 */

export async function onRequestPost(context) {
  const { request, env } = context;

  if (!env.GITHUB_TOKEN || !env.GITHUB_REPO) {
    return new Response('Error: Variables de entorno no configuradas', { status: 500 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response('JSON inválido', { status: 400 });
  }

  const { filename, password } = body;

  if (!password || password !== env.PUBLISH_PASSWORD) {
    return new Response('Contraseña incorrecta', { status: 403 });
  }

  if (!filename || typeof filename !== 'string') {
    return new Response('Filename es obligatorio', { status: 400 });
  }

  const ghUrl = `https://api.github.com/repos/${env.GITHUB_REPO}/contents/${filename}`;
  const headers = {
    Authorization: `Bearer ${env.GITHUB_TOKEN}`,
    Accept: 'application/vnd.github+json',
    'User-Agent': 'AlvaroGarciaPoeta-Publisher',
  };

  try {
    // Fetch current file
    const getRes = await fetch(ghUrl, { headers });

    if (!getRes.ok) {
      return new Response('Soneto no encontrado', { status: 404 });
    }

    const fileData = await getRes.json();
    const content = JSON.parse(atob(fileData.content));
    const wasHidden = !!content.hidden;
    content.hidden = !wasHidden;

    // If unhiding, remove the flag entirely for a clean JSON
    if (!content.hidden) {
      delete content.hidden;
    }

    const action = wasHidden ? 'Mostrar' : 'Ocultar';

    // Update file with toggled hidden flag
    const putRes = await fetch(ghUrl, {
      method: 'PUT',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: `${action} soneto: ${content.title}`,
        content: btoa(unescape(encodeURIComponent(JSON.stringify(content, null, 2)))),
        sha: fileData.sha,
      }),
    });

    if (!putRes.ok) {
      const errBody = await putRes.text();
      console.error('GitHub API error:', { status: putRes.status, body: errBody });
      return new Response(`Error al ${action.toLowerCase()} soneto`, { status: 500 });
    }

    return new Response(JSON.stringify({ hidden: content.hidden !== undefined }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Hide error:', error.message);
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
}
