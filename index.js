import express from "express";
import OpenAI from "openai";

const app = express();
app.use(express.json());

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/api/story", async (req, res) => {
  try {
    const { hero, sidekick, setting, goal, length } = req.body;
    const prompt = `Write a fun, kid-friendly story with a hero (${hero}), a sidekick (${sidekick}), set in ${setting}, where the goal is ${goal}. Story length: ${length}.`;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({ story: response.choices[0].message.content.trim() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate story" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API running on port ${port}`));
