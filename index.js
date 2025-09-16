import express from "express";
import axios from "axios";
import 'dotenv/config';
import cors from "cors";

const app = express();
app.use(cors()); // allow cross-origin requests

const PORT = process.env.PORT || 3000;
const COOKIE = process.env.COOKIE;
const USER_AGENT = process.env.USER_AGENT;

app.get("/dl", async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: "Missing url parameter" });

    const response = await axios.post(
      "https://3bic.com/api/download",
      { url },
      {
        headers: {
          cookie: COOKIE,
          "user-agent": USER_AGENT,
          origin: "https://3bic.com",
          referer: "https://3bic.com/",
        },
      }
    );

    const data = response.data;
    const result = {
      author: "ghok ghok pokat tanvir",
      title: data?.title || "No title",
      thumbnail: data?.coverUrl || null,
      url: "https://3bic.com" + data.originalVideoUrl,
    };

    res.json(result);
  } catch (error) {
    console.error("❌ Error fetching data:", error.message);
    if (error.response) {
      res.status(error.response.status).json({
        error: true,
        status: error.response.status,
        data: error.response.data,
      });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
