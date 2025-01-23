import axios from "axios";

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "URL parameter is required" });
  }

  try {
    const response = await axios.get(url, { timeout: 5000 }); // Optional: Set a timeout
    res.status(200).send(response.data);
  } catch (error) {
    // Log the error to understand what went wrong
    console.error('Error fetching data:', error.response || error.message);
    
    // Return more details in the error response
    res.status(500).json({
      error: "Error fetching data",
      details: error.response ? error.response.data : error.message
    });
  }
}
