import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());

const PORT = 3000; // Change if needed

// Paste your cookies and user-agent here
const COOKIE = "cf_clearance=5.KVmm1PZ8ypKOC67KiCtwl4F6dYrVZEDSPMK.Ug.Nk-1757998170-1.2.1.1-44AQsPavIZY82.8ZnG3FrgWkm627BN1wMMExKgwLOvzGLkG04wA0RorSSkok4yJVv07EXX7rXM5YdxpdKOVyEdeOf0Y8zCQ7r7GHgI2l8k9EePDxLobSspPPpVNz8YAn.kE6CnC2hR3DHlycT3CJ_RnqSawBtjKU_XYQWkmd1Q_fAAgeEZa1rEqw2GzWnxTDHlLhUEdS__TIBDl5.zVFy.JdANsslW0cPomRbE852LU; FCNEC=%5B%5B%22AKsRol-....%22%5D%5D";
const USER_AGENT = "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36";

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
      author: "ＮＩＲＯＢ ᶻ 𝗓 𐰁", // Your name
      title: data?.title || "CAPCUT VIDEO DOWNLOADER",
      thumbnail: data?.coverUrl || null,
      url: data.originalVideoUrl ? "https://3bic.com" + data.originalVideoUrl : null,
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

// Root endpoint for testing
app.get("/", (req, res) => {
  res.send("🚀 CapCut Downloader API is running!");
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
