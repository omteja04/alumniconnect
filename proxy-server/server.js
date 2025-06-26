// proxy-server/server.js
import express from 'express'
import cors from 'cors';
const app = express();
app.use(cors()); // allow all origins (or configure specific origins)
app.use(express.json()); // parse JSON bodies

app.post("/mentorship", async (req, res) => {
    try {
        // use global fetch (Node 20+)
        const snowRes = await fetch(
            "https://dev290737.service-now.com/api/now/table/u_mentorship_requests",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // base64-encode your SNOW creds
                    Authorization:
                        "Basic " + Buffer.from("admin:rF%JT8v3pc!A").toString("base64"),
                },
                body: JSON.stringify(req.body),
            }
        );

        const data = await snowRes.json();
        res.status(snowRes.status).json(data);
    } catch (err) {
        console.error("Proxy Error:", err);
        res.status(500).json({ error: "Proxy failure" });
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
    console.log(`Proxy listening on http://localhost:${PORT}`)
);
