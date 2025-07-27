import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GIMINI_API_KEY,
});

export async function POST(req) {
  try {
    const { jobRole, jobDescription, yearsOfExperience } = await req.json();

    if (!jobRole || !jobDescription || !yearsOfExperience) {
      return new Response(
        JSON.stringify({ error: "Missing required input fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const questionCount = process.env.NEXT_PUBLIC_QUESTION_NUMBER || 5;

    const prompt = `
You are an AI assistant helping job seekers prepare for interviews.

Job Position: ${jobRole}
Years of Experience: ${yearsOfExperience}
Job Description/Tech Stack: ${jobDescription}

Based on this, generate ${questionCount} interview questions in JSON format.
Each item should have a "question" and an "answer".
Return only JSON. No markdown, no commentary.
`;

    const contents = [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ];

    const result = await genAI.models.generateContentStream({
      model: "gemini-2.0-flash",
      config: { responseMimeType: "text/plain" },
      contents,
    });

    let output = "";
    for await (const chunk of result) {
      output += chunk.text;
    }

    // 🌟 Handle both wrapped and raw JSON
    let cleaned = output.trim();

    // Remove triple backticks if present
    if (cleaned.startsWith("```json")) {
      cleaned = cleaned.replace(/^```json/, "").replace(/```$/, "").trim();
    } else if (cleaned.startsWith("```")) {
      cleaned = cleaned.replace(/^```/, "").replace(/```$/, "").trim();
    }

    let questions;
    try {
      questions = JSON.parse(cleaned);
    } catch (parseErr) {
      console.error("❌ JSON parsing failed. Raw Gemini response:\n", output);
      return new Response(
        JSON.stringify({ error: "Gemini returned invalid JSON format" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(JSON.stringify({ questions }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("💥 Gemini API error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to generate questions" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}