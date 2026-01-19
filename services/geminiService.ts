

import { GoogleGenAI, Type, Schema, Modality } from "@google/genai";
import { SearchResult } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const searchResultSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    results: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          filename: { type: Type.STRING },
          size: { type: Type.STRING },
          type: { type: Type.STRING },
          bitrate: { type: Type.STRING },
          speed: { type: Type.STRING },
          artist: { type: Type.STRING },
          album: { type: Type.STRING },
          quality: { type: Type.INTEGER, description: "Rating from 1 to 5" },
        },
        required: ["filename", "size", "type", "bitrate", "speed", "artist", "quality"]
      }
    }
  }
};

// Added schema for forum thread generation
const forumThreadSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    posts: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          user: { type: Type.STRING },
          rank: { type: Type.STRING },
          avatarType: { type: Type.STRING },
          content: { type: Type.STRING },
          signature: { type: Type.STRING },
        },
        required: ["user", "rank", "avatarType", "content", "signature"]
      }
    }
  },
  required: ["title", "posts"]
};

export const searchGeminiFiles = async (query: string): Promise<SearchResult[]> => {
  try {
    const model = "gemini-3-flash-preview";
    const response = await ai.models.generateContent({
      model,
      contents: `Generate 15 realistic early 2000s era P2P search results for the query: "${query}". 
      Include a mix of high quality and lower quality files. 
      Use nostalgic file naming conventions (underscores, 'rip', 'full album', maybe a fake .exe virus or two labeled as the song).
      Ensure file sizes are realistic for the era (e.g. 3-5MB for MP3s, 700MB for movies).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: searchResultSchema,
        systemInstruction: "You are a simulator of the LimeWire Gnutella network in 2005."
      }
    });

    const data = JSON.parse(response.text || '{ "results": [] }');
    return data.results.map((item: any, index: number) => ({
      ...item,
      id: `res-${Date.now()}-${index}`,
    }));
  } catch (error) {
    console.error("Gemini Search Error:", error);
    return [
      { id: 'fallback-1', filename: 'Linkin_Park_Numb.mp3', size: '3.4 MB', type: 'mp3', bitrate: '128kbps', speed: 'T3', artist: 'Linkin Park', album: 'Meteora', quality: 5 },
      { id: 'fallback-2', filename: 'funny_cats_compilation.wmv', size: '12.1 MB', type: 'wmv', bitrate: '-', speed: 'Cable', artist: 'Unknown', album: '-', quality: 3 }
    ];
  }
};

export const generateAssistantReply = async (assistantName: 'Clippy' | 'Bonzi', userText: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: `You are ${assistantName}, a nostalgic Windows XP era desktop assistant. 
            The user says: "${userText}". 
            If you are Clippy: be overly helpful but slightly annoying/condescending.
            If you are Bonzi: be a bit chaotic, use 'purple' energy, and act like you are helpful but probably spying. 
            Keep it under 20 words.`,
        });
        return response.text || "I am here to help!";
    } catch (e) {
        return assistantName === 'Clippy' ? "It looks like you're having internet trouble!" : "I cannot reach the banana server!";
    }
}

export const generateChatReply = async (lastMessage: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: `The user said: "${lastMessage}" in a 2005 internet chatroom. Reply as a random internet stranger from that era. 
            Use leet speak, abbreviations (lol, rofl, asl, brb), and reference 2005 culture. Keep it short (under 15 words).`,
        });
        return response.text || "lol wut";
    } catch (e) { return "brb mom calling"; }
}

// Added generateForumThread to fix import error in ForumWindow.tsx
export const generateForumThread = async (topic: string): Promise<any> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: `Generate a funny, nostalgic vBulletin forum thread about: "${topic}". 
            Make it feel like a mid-2000s tech or file-sharing forum. 
            Include some heated arguments (flame wars) and helpful but slightly wrong advice.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: forumThreadSchema,
                systemInstruction: "You are a simulator of the P2P Scene forums in 2005."
            }
        });
        return JSON.parse(response.text || '{}');
    } catch (e) {
        return {
            title: topic,
            posts: [
                { user: 'Admin', rank: 'Administrator', avatarType: 'Standard XP Logo', content: 'Welcome to the thread. Please keep it civil.', signature: 'Sent from my computer.' }
            ]
        };
    }
};

export const generateSpeech = async (text: string): Promise<string | null> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: { parts: [{ text }] },
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } },
      },
    });
    const parts = response.candidates?.[0]?.content?.parts;
    return parts && parts[0]?.inlineData?.data ? parts[0].inlineData.data : null;
  } catch (error) { return null; }
};