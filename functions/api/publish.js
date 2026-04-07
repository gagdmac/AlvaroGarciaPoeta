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

  const { password, title, dedication, sonnet, createdAt: clientCreatedAt, originalDate, poemType } = body;

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

  // ── Validate poem body ──
  if (!sonnet || typeof sonnet !== 'string') {
    return new Response('El texto del poema es obligatorio', { status: 400 });
  }

  const lines = sonnet.split('\n').filter(l => l.trim().length > 0);

  // Poem type rules
  const POEM_TYPE_RULES = {
    soneto:       { min: 14, max: 14,  label: 'soneto' },
    acrostico:    { min: 2,  max: 50,  label: 'acróstico' },
    haiku:        { min: 3,  max: 3,   label: 'haiku' },
    'verso-libre':{ min: 1,  max: 200, label: 'verso libre' },
  };

  const typeKey = (poemType && POEM_TYPE_RULES[poemType]) ? poemType : 'soneto';
  const rules = POEM_TYPE_RULES[typeKey];

  if (lines.length < rules.min || lines.length > rules.max) {
    const msg = rules.min === rules.max
      ? `El ${rules.label} debe tener ${rules.min} versos (tiene ${lines.length})`
      : `El ${rules.label} debe tener entre ${rules.min} y ${rules.max} versos (tiene ${lines.length})`;
    return new Response(msg, { status: 400 });
  }

  // ── Build poem data ──
  const cleanTitle = title.trim();
  const slug = cleanTitle
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // strip accents
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  const now = new Date();
  const date = originalDate || now.toISOString().split('T')[0];
  const cleanDedication = (dedication && typeof dedication === 'string' && dedication.trim()) || null;

  let poemData;
  if (typeKey === 'soneto') {
    poemData = {
      type: 'soneto',
      title: cleanTitle,
      slug,
      date,
      createdAt: clientCreatedAt || now.toISOString(),
      dedication: cleanDedication,
      cuarteto1: lines.slice(0, 4),
      cuarteto2: lines.slice(4, 8),
      terceto1: lines.slice(8, 11),
      terceto2: lines.slice(11, 14),
    };
  } else {
    poemData = {
      type: typeKey,
      title: cleanTitle,
      slug,
      date,
      createdAt: clientCreatedAt || now.toISOString(),
      dedication: cleanDedication,
      verses: lines,
    };
  }

  const TYPE_COMMIT_LABELS = {
    soneto: 'soneto',
    acrostico: 'acróstico',
    haiku: 'haiku',
    'verso-libre': 'verso libre',
  };

  const fileContent = JSON.stringify(poemData, null, 2);
  const filePath = `sonnets/${date}-${slug}.json`;
  const ghUrl = `https://api.github.com/repos/${env.GITHUB_REPO}/contents/${filePath}`;

  console.log('Publishing poem:', {
    repo: env.GITHUB_REPO,
    filePath,
    title: cleanTitle,
    type: typeKey,
    hasToken: !!env.GITHUB_TOKEN,
  });

  try {
    // Check if file already exists (need SHA for update)
    let sha = null;
    const checkResponse = await fetch(ghUrl, {
      headers: {
        Authorization: `Bearer ${env.GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
        'User-Agent': 'AlvaroGarciaPoeta-Publisher',
      },
    });

    if (checkResponse.ok) {
      const existing = await checkResponse.json();
      sha = existing.sha;
      console.log('File exists, will update with SHA:', sha);
    } else if (checkResponse.status !== 404) {
      console.error('Unexpected response checking file:', checkResponse.status);
    }

    // Prepare the PUT body
    const commitLabel = TYPE_COMMIT_LABELS[typeKey] || 'poema';
    const putBody = {
      message: `Nuevo ${commitLabel}: ${cleanTitle}`,
      content: btoa(unescape(encodeURIComponent(fileContent))),
    };

    if (sha) {
      putBody.sha = sha;
    }

    const ghResponse = await fetch(ghUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
        'User-Agent': 'AlvaroGarciaPoeta-Publisher',
        Accept: 'application/vnd.github+json',
      },
      body: JSON.stringify(putBody),
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

    console.log('Poem published successfully');
    return new Response('Poema publicado', { status: 200 });
  } catch (error) {
    console.error('Publish error:', error.message, error.stack);
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
}
