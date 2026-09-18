import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY || "";

let aiInstance = null;
if (apiKey) {
  try {
    aiInstance = new GoogleGenAI({ apiKey });
  } catch (err) {
    console.error("Failed to initialize GoogleGenAI SDK:", err.message);
  }
}

/**
 * Generate a 768-dim vector embedding using Gemini text-embedding-004
 * @param {string} text 
 * @returns {Promise<number[]>} 768-length float array
 */
export async function generateEmbedding(text) {
  if (!text || typeof text !== "string") {
    throw new Error("Text parameter is required for embedding generation.");
  }

  const cleanText = text.replace(/\n+/g, " ").trim();

  // Try official SDK first
  if (aiInstance) {
    try {
      const response = await aiInstance.models.embedContent({
        model: "text-embedding-004",
        contents: cleanText,
      });

      if (response?.embedding?.values) {
        return response.embedding.values;
      }
    } catch (err) {
      console.warn("GoogleGenAI SDK embedding failed, attempting REST fallback:", err.message);
    }
  }

  // REST Fallback directly calling Gemini REST API
  if (apiKey) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key=${apiKey}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "models/text-embedding-004",
        content: { parts: [{ text: cleanText }] },
      }),
    });

    if (res.ok) {
      const json = await res.json();
      if (json?.embedding?.values) {
        return json.embedding.values;
      }
    } else {
      const errText = await res.text();
      throw new Error(`Gemini Embedding API Error (${res.status}): ${errText}`);
    }
  }

  throw new Error("GEMINI_API_KEY missing or embedding service unavailable.");
}

/**
 * Generate completion / response from Gemini LLM
 * @param {string} prompt
 * @param {Array<{role: string, content: string}>} history
 * @returns {Promise<ReadableStream>}
 */
export async function generateChatStream(prompt, history = []) {
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?alt=sse&key=${apiKey}`;

  const contents = [
    ...history.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    })),
    {
      role: "user",
      parts: [{ text: prompt }],
    },
  ];

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents,
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 1024,
      },
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gemini Stream API Error (${res.status}): ${errText}`);
  }

  return res.body;
}
