export async function onRequest(context) {
  const { request, env } = context;
  if (!env.KAYAHIRING_STORAGE) return new Response('R2 binding KAYAHIRING_STORAGE is missing', { status: 500 });
  if (request.method === 'GET') {
    const key = new URL(request.url).searchParams.get('key') || '';
    if (!key.startsWith('resumes/')) return new Response('Invalid key', { status: 400 });
    const object = await env.KAYAHIRING_STORAGE.get(key);
    if (!object) return new Response('Not found', { status: 404 });
    return new Response(object.body, { headers: { 'Content-Type': object.httpMetadata?.contentType || 'application/pdf', 'Cache-Control': 'private, no-store' } });
  }
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 });
  const filename = decodeURIComponent(request.headers.get('X-Filename') || 'resume');
  const safe = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
  const key = `resumes/${crypto.randomUUID()}-${safe}`;
  await env.KAYAHIRING_STORAGE.put(key, request.body, { httpMetadata: { contentType: request.headers.get('Content-Type') || 'application/octet-stream' } });
  return Response.json({ ok: true, key });
}
