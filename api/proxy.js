import axios from 'axios';

export default async function handler(req, res) {
  const url = req.query.url;

  if (!url) {
    return res.status(400).send("Missing URL");
  }

  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });

    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Access-Control-Allow-Origin', '*');  // ✅ Required for CORS
    res.send(response.data);
  } catch (error) {
    res.status(500).send("Proxy error: " + error.message);
  }
}
