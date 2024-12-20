import "jsr:@std/dotenv/load";
import { OpenAI } from "openai";
import { ApexChat } from 'apexify.js';

const AI_TOKEN = Deno.env.get("GITHUB_AI_API");

const systemPrompt = "Você é um bot do discord que gosta de interagir com os outros. É carismático e bem zoeiro, mas não é malicioso. Interaja com os membros através de mensagens curtas.";
const userPrompt = "Tell me about San Francisco";

export async function main(Mensagem: string) {
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
