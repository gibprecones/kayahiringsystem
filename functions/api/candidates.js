const KEY = 'candidates.json';

export async function onRequest(context) {
  const { request, env } = context;
  if (!env.KAYAHIRING_STORAGE) return new Response('R2 binding KAYAHIRING_STORAGE is missing', { status: 500 });
  if (request.method === 'GET') {
    const object = await env.KAYAHIRING_STORAGE.get(KEY);
    if (!object) return Response.json([]);
    return new Response(await object.text(), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
  }
  if (request.method === 'PUT') {
    const data = await request.json();
    if (!Array.isArray(data)) return Response.json({ error: 'Expected an array' }, { status: 400 });
    await env.KAYAHIRING_STORAGE.put(KEY, JSON.stringify(data), { httpMetadata: { contentType: 'application/json' } });
    return Response.json({ ok: true });
  }
  return new Response('Method not allowed', { status: 405 });
}
