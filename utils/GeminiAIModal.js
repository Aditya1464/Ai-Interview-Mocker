// // utils/GeminiAIModal.js

// export const chatSession = {
//   sendMessage: async (prompt) => {
//     try {
//       const res = await fetch("/api/feedback", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ prompt }),
//       });

//       if (!res.ok) {
//         throw new Error("Gemini API call failed");
//       }

//       const data = await res.json();

//       return {
//         response: {
//           text: () => data.response,
//         },
//       };
//     } catch (err) {
//       console.error("chatSession.sendMessage Error:", err);
//       return {
//         response: {
//           text: () =>
//             JSON.stringify({
//               rating: "N/A",
//               feedback: "Could not generate feedback due to an error.",
//             }),
//         },
//       };
//     }
//   },
// };

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GIMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  const safetySettings=[
    {
        category:HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold:HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category:HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold:HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category:HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold:HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category:HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold:HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    }
  ];

  export const chatSession = model.startChat({
      generationConfig,
      safetySettings,
    });

