import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GIMINI_API_KEY,
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { prompt } = body;

    if (!prompt) {
      return new Response(
        JSON.stringify({ error: "Prompt is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const contents = [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ];

    const result = await genAI.models.generateContent({
      model: "gemini-pro",
      contents,
    });

    let output = result.response.text().trim();

    // Remove backticks if present
    if (output.startsWith("```json")) {
      output = output.replace(/^```json/, "").replace(/```$/, "").trim();
    } else if (output.startsWith("```")) {
      output = output.replace(/^```/, "").replace(/```$/, "").trim();
    }

    return new Response(JSON.stringify({ response: output }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error("Gemini Feedback API Error:", err);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
