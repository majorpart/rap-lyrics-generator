export default async function handler(req, res) {
    if (req.method === 'HEAD') return res.status(200).end();
    if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed. Only GET is supported.' });
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    return res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
}


