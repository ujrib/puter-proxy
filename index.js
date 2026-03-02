const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());

app.post("/v1/chat/completions", async (req, res) => {
    try {
        const response = await fetch("https://js.puter.com/v2/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: req.body.messages
            })
        });

        const data = await response.json();

        res.json({
            choices: [
                {
                    message: {
                        content: data.choices?.[0]?.message?.content || "No response"
                    }
                }
            ]
        });

    } catch (err) {
        res.status(500).json({ error: err.toString() });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));
