"use server";

import OpenAI from "openai";

// export const maxDuration = 60;

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Please set the OPENAI_API_KEY environment variable.");
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateImage = async (prompt: string) => {
  const image = await openai.images.generate({
    model: "dall-e-3",
    prompt: prompt,
    n: 1,
  });
  console.log(image.data);
  return image.data[0]?.url;
};
