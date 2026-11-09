export async function onRequest(context) {
  const { request, env } = context;
  if (!env.KAYAHIRING_STORAGE || request.method !== 'POST') return new Response('Not found', { status: 404 });
  const filename = decodeURIComponent(request.headers.get('X-Filename') || 'resume');
  const safe = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
  const key = `resumes/${crypto.randomUUID()}-${safe}`;
  await env.KAYAHIRING_STORAGE.put(key, request.body, { httpMetadata: { contentType: request.headers.get('Content-Type') || 'application/octet-stream' } });
  return Response.json({ ok: true, key });
}
