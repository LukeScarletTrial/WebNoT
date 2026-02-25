import express from 'express';
import cors from 'cors';
import { OpenAI } from "openai";
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const client = new OpenAI({
    baseURL: "https://router.huggingface.co/v1",
    apiKey: "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",
});

app.post('/generate', async (req, res) => {
    try {
        const chatCompletion = await client.chat.completions.create({
            model: "Qwen/Qwen3-Coder-Next",
            messages: [
                { role: "system", content: "You are a coding assistant. Return only code." },
                { role: "user", content: req.body.prompt }
            ],
        });
        res.json({ result: chatCompletion.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log(`Go to: http://localhost:3000`));
