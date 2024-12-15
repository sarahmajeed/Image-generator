"use server";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateCaptions = async (prompt: string) => {
  try {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "Generate Instagram-ready captions with hashtags and the caption should not be more than 100 words.",
        },
        {
          role: "user",
          content: `Generate a caption for the following: "${prompt}"`,
        },
      ],
      model: "gpt-4o-mini",
    });

    if (response?.choices[0]?.message?.content) {
      return response.choices[0].message.content.trim();
    }
  } catch (error) {
    console.error("Error generating caption:", error);
    throw new Error("Caption generation failed.");
  }
};
