import "jsr:@std/dotenv/load";
import { OpenAI } from "openai";

const AI_TOKEN = Deno.env.get("GITHUB_AI_API");
const systemPrompt = "You are a travel agent. Be descriptive and helpful";
const userPrompt = "Tell me about San Francisco";

export async function main() {
   const api = new OpenAI({
      baseURL: "https://models.inference.ai.azure.com",
      apiKey: AI_TOKEN,
   });

   const response = await api.chat.completions.create({
      messages: [
         { role: "system", content: systemPrompt },
         { role: "user", content: userPrompt },
      ],
      model: "gpt-4o",
      temperature: 0.7,
      max_tokens: 4096,
   });

   console.log(response.choices[0].message.content);
}

main().catch((err) => {
   console.error("The sample encountered an error:", err);
});