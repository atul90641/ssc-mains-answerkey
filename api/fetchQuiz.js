import axios from "axios";

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "URL parameter is required" });
  }

  try {
    console.log(`Fetching URL: ${url}`);
    const response = await axios.get(url, { timeout: 10000 });
    res.status(200).send(response.data);
  } catch (error) {
    console.error("Error details:", error.toJSON ? error.toJSON() : error.message);
    res.status(500).json({ error: "Error fetching data", details: error.message });
  }
}
