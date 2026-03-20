/**
 * Cloudflare Pages Function: POST /api/publish
 *
 * Receives a sonnet from the publish form, validates it,
 * and commits a new JSON file to the GitHub repository.
 *
 * Required environment variables (set in Cloudflare dashboard):
 *   PUBLISH_PASSWORD - Password the poet uses to authenticate
 *   GITHUB_REPO      - e.g. "username/AlvaroGarciaPoeta"
 *   GITHUB_TOKEN     - Fine-grained PAT with contents:write scope
 */

export async function onRequestPost(context) {
  const { request, env } = context;

  // ── Debug: Check env variables exist ──
  if (!env.GITHUB_TOKEN || !env.GITHUB_REPO) {
    console.error('Missing env vars:', { 
      hasToken: !!env.GITHUB_TOKEN, 
      hasRepo: !!env.GITHUB_REPO 
    });
    return new Response('Error: Variables de entorno no configuradas', { status: 500 });
  }

  // Only accept JSON
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

  const { password, title, dedication, sonnet } = body;

  // ── Authentication ──
  if (!password || password !== env.PUBLISH_PASSWORD) {
    return new Response('Contraseña incorrecta', { status: 403 });
  }

  // ── Validate title ──
  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    return new Response('El título es obligatorio', { status: 400 });
  }

  if (title.length > 200) {
    return new Response('El título es demasiado largo (máx. 200 caracteres)', { status: 400 });
  }

  // ── Validate sonnet ──
  if (!sonnet || typeof sonnet !== 'string') {
    return new Response('El soneto es obligatorio', { status: 400 });
  }

  const lines = sonnet.split('\n').filter(l => l.trim().length > 0);

  if (lines.length !== 14) {
    return new Response(
      `El soneto debe tener 14 versos (tiene ${lines.length})`,
      { status: 400 }
    );
  }

  // ── Build sonnet data ──
  const cleanTitle = title.trim();
  const slug = cleanTitle
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // strip accents
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  const date = new Date().toISOString().split('T')[0];

  const sonnetData = {
    title: cleanTitle,
    slug,
    date,
    dedication: (dedication && typeof dedication === 'string' && dedication.trim()) || null,
    cuarteto1: lines.slice(0, 4),
    cuarteto2: lines.slice(4, 8),
    terceto1: lines.slice(8, 11),
    terceto2: lines.slice(11, 14),
  };

  const fileContent = JSON.stringify(sonnetData, null, 2);
  const filePath = `sonnets/${date}-${slug}.json`;

  // ── Commit to GitHub ──
  const ghUrl = `https://api.github.com/repos/${env.GITHUB_REPO}/contents/${filePath}`;

  console.log('Publishing sonnet:', {
    repo: env.GITHUB_REPO,
    filePath,
    title: cleanTitle,
    hasToken: !!env.GITHUB_TOKEN,
  });

  try {
    const ghResponse = await fetch(ghUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
        'User-Agent': 'AlvaroGarciaPoeta-Publisher',
        Accept: 'application/vnd.github+json',
      },
      body: JSON.stringify({
        message: `Nuevo soneto: ${cleanTitle}`,
        content: btoa(unescape(encodeURIComponent(fileContent))),
        branch: 'main',
      }),
    });

    if (!ghResponse.ok) {
      const errBody = await ghResponse.text();
      console.error('GitHub API error:', {
        status: ghResponse.status,
        body: errBody,
        url: ghUrl,
      });
      return new Response(`GitHub error: ${ghResponse.status}`, { status: 500 });
    }

    console.log('Sonnet published successfully');
    return new Response('Soneto publicado', { status: 200 });
  } catch (error) {
    console.error('Publish error:', error.message, error.stack);
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
}
