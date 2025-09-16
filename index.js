import express from "express";
import axios from "axios";

const app = express();

// GET endpoint: /dl?url=
app.get("/dl", async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) {
      return res.status(400).json({ error: "Missing url parameter" });
    }

    const response = await axios.post(
      "https://3bic.com/api/download",
      { url },
      {
        headers: {
          "authority": "3bic.com",
          "accept-language": "en-US,en;q=0.9",
          "cache-control": "no-cache",
          "cookie": "FCOEC=%5B%5B%5B28%2C%22%5Bnull%2C%5Bnull%2C1%2C%5B1751693928%2C200781000%5D%5D%5D%22%5D%5D%5D; cf_clearance=n8lpZavw23f8DMUOYz84xLdgObynroBuony6Tv3umx0-1757962762-1.2.1.1-_6rcni4yQVcKAe039XGOWL1p1pvkCwuSnKXNZveQOTnS6IH8W4ZKAUKA7FKV8vTO_Ogl4XFFeAe3Ljo04TE_FrhvQ5qWFvclBewtShoFfZX6iMNaNzZidM9iSmlElX_dM8D5J9xopv9TCbvA14qt0fuwA9rxTJWrIa8yrCA9QQ90xDHqOYiYxtKFKiDiqOESxjZcV8q7_sCWTTl_WC_dpbBl83DPCOxYgFQloG18CCg; __gads=ID=a73f18b3bb3df516:T=1751693924:RT=1757962764:S=ALNI_MZQSRb-rIGp3vD3UI7cZIb4GZ7Glg; __gpi=UID=00001149dc0e272f:T=1751693924:RT=1757962764:S=ALNI_MZeGWYAEv5looa2ngRcpr71SU2c5w; __eoi=ID=ae9f7001386f3608:T=1751693924:RT=1757962764:S=AA-AfjbXyqzbbUfgmLwizv8i1laH; FCNEC=%5B%5B%22AKsRol-WXZU_0qDRC9oXbvT0v3t5VdLhuLU1yFYA9C3gMOKiiNUOPPsL1gQlENEPcPtbgWC5eIrJSS0J7teIIMS1Z5E3WWHmcE1Q5zAb11cHTPdcS11Y_O0XbVwsQ_m2bBkfup4ZsbmtRUDnFDLbwq-ik_n2TC3TAA%3D%3D%22%5D%5D", // replace with valid cookies
          "origin": "https://3bic.com",
          "pragma": "no-cache",
          "referer": "https://3bic.com/",
          "sec-ch-ua": "\"Chromium\";v=\"137\", \"Not/A)Brand\";v=\"24\"",
          "sec-ch-ua-mobile": "?1",
          "sec-ch-ua-platform": "\"Android\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "user-agent":
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36",
        },
      }
    );

    // extract needed fields
    const data = response.data;
    const urlx = "https://3bic.com" + data.originalVideoUrl;

    const result = {
      author: "ＮＩＲＯＢ ᶻ 𝗓 𐰁",
      title: data?.title || "LAV LOS NAI 🥰",
      thumbnail: data?.coverUrl || null,
      url: urlx || null,
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

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
