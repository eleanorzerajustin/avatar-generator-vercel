export default async function handler(req, res) {
    const targetUrl = req.query.url;
    if (!targetUrl) {
      return res.status(400).json({ error: "Missing URL" });
    }
  
    try {
      const response = await fetch(targetUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0",
        },
      });
  
      if (!response.ok) {
        return res.status(response.status).send("Failed to fetch");
      }
  
      const contentType = response.headers.get("content-type");
      res.setHeader("Content-Type", contentType);
      const buffer = await response.arrayBuffer();
      res.status(200).send(Buffer.from(buffer));
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
  }
  