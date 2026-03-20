/**
 * Cloudflare Pages Function: DELETE /api/publish
 *
 * Deletes a sonnet from the repository.
 *
 * Required environment variables:
 *   PUBLISH_PASSWORD - Password for authentication
 *   GITHUB_REPO      - e.g. "username/AlvaroGarciaPoeta"
 *   GITHUB_TOKEN     - Fine-grained PAT with contents:write scope
 */

export async function onRequestDelete(context) {
  const { request, env } = context;

  // ── Check env variables ──
  if (!env.GITHUB_TOKEN || !env.GITHUB_REPO) {
    return new Response('Error: Variables de entorno no configuradas', { status: 500 });
  }

  // Parse JSON body
  const contentType = request.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    return new Response('Content-Type debe ser application/json', { status: 400 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response('JSON inválido', { status: 400 });
  }

  const { password, filename } = body;

  // ── Authentication ──
  if (!password || password !== env.PUBLISH_PASSWORD) {
    return new Response('Contraseña incorrecta', { status: 403 });
  }

  if (!filename || typeof filename !== 'string') {
    return new Response('El filename es obligatorio', { status: 400 });
  }

  // Ensure file is in sonnets/ directory
  if (!filename.startsWith('sonnets/') || !filename.endsWith('.json')) {
    return new Response('Archivo inválido', { status: 400 });
  }

  const ghUrl = `https://api.github.com/repos/${env.GITHUB_REPO}/contents/${filename}`;

  console.log('Delete request:', { filename, ghUrl, repo: env.GITHUB_REPO });

  try {
    // Get file SHA
    const getResponse = await fetch(ghUrl, {
      headers: {
        Authorization: `Bearer ${env.GITHUB_TOKEN}`,
        'User-Agent': 'AlvaroGarciaPoeta-Publisher',
        Accept: 'application/vnd.github+json',
      },
    });

    if (!getResponse.ok) {
      const errBody = await getResponse.text();
      console.error('GitHub GET error:', getResponse.status, errBody);
      return new Response('Soneto no encontrado (GitHub ' + getResponse.status + ')', { status: 404 });
    }

    const file = await getResponse.json();

    // Delete file
    const deleteResponse = await fetch(ghUrl, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
        'User-Agent': 'AlvaroGarciaPoeta-Publisher',
        Accept: 'application/vnd.github+json',
      },
      body: JSON.stringify({
        message: `Eliminar soneto: ${filename}`,
        sha: file.sha,
      }),
    });

    if (!deleteResponse.ok) {
      const errBody = await deleteResponse.text();
      console.error('GitHub delete error:', deleteResponse.status, errBody);
      return new Response('Error al eliminar el soneto', { status: 500 });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Delete error:', err);
    return new Response('Error de servidor', { status: 500 });
  }
}
