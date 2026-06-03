import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: "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",
  baseURL: "https://api.groq.com/openai/v1"
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    const completion = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: message }]
    });
    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.log(error);
    res.status(500).json({ reply: "Error backend" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, "0.0.0.0", () => console.log(`Servidor en puerto ${PORT}`));



