"use client";
import { generateCaptions } from "@/utils/generateCaptions";
import { generateImage } from "@/utils/generateImage";
import Image from "next/image";
import React, { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState({
    url: "",
    caption: "",
  });
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    try {
      setLoading(true);
      const imageUrl = await generateImage(prompt);
      const caption = await generateCaptions(prompt);
      if (imageUrl && caption) {
        setGeneratedImage({ url: imageUrl, caption });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-start justify-center min-h-screen pt-10 bg-gray-100">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          AI Image Generator
        </h1>
        <div className="flex items-center space-x-2 mb-6">
          <input
            type="text"
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your prompt..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white rounded-lg px-6 py-3 font-medium transition duration-200 hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            onClick={handleGenerate}
            disabled={loading || !prompt}
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-4">
            <div className="w-8 h-8 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
          </div>
        )}

        {generatedImage && generatedImage.url && generatedImage.caption && (
          <div className="mt-8 text-center">
            <Image
              src={generatedImage.url}
              alt="Generated Image"
              width={512}
              height={512}
              className="rounded-lg shadow-lg mx-auto"
            />
            <p className="mt-4 text-gray-600 font-medium">
              <span className="font-semibold text-gray-800">
                {generatedImage.caption}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
