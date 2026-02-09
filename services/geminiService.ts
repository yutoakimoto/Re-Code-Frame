import { GoogleGenAI, Type } from "@google/genai";
import { EstimateState } from "../types";
import { FEATURES, PROJECT_SCALES, PROJECT_TYPES } from "../constants";

const getLabel = (id: string, list: any[]) => list.find(i => i.id === id)?.label || id;

export const generateProposal = async (state: EstimateState): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const projectTypeLabel = getLabel(state.projectType, PROJECT_TYPES);
    const scaleLabel = getLabel(state.projectScale, PROJECT_SCALES);
    const featureLabels = state.selectedFeatures.map(f => getLabel(f, FEATURES)).join(", ");

    const prompt = `
      You are a senior system architect.
      Create a professional, concise project proposal summary for a potential client.
      
      Project Parameters:
      - Type: ${projectTypeLabel}
      - Scale: ${scaleLabel}
      - Design Provided: ${state.isDesignProvided ? "Yes (Client provides assets)" : "No (Need to create from scratch)"}
      - Key Features: ${featureLabels || "Basic functionality only"}
      - Maintenance Required: ${state.maintenance ? "Yes" : "No"}

      Output format:
      Return a simple JSON object (no markdown code blocks) with the following structure:
      {
        "summary": "A professional summary of the project vision (max 2 sentences).",
        "technicalChallenges": ["Challenge 1", "Challenge 2"],
        "recommendedStack": ["Tech A", "Tech B", "Tech C"],
        "timelineEstimation": "Estimated duration (e.g., 2-3 months)"
      }
      
      Keep the tone professional, encouraging, and trustworthy. Japanese language ONLY.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            technicalChallenges: { type: Type.ARRAY, items: { type: Type.STRING } },
            recommendedStack: { type: Type.ARRAY, items: { type: Type.STRING } },
            timelineEstimation: { type: Type.STRING },
          }
        }
      }
    });

    return response.text || "{}";
  } catch (error) {
    console.error("Gemini generation error:", error);
    return JSON.stringify({
      summary: "システム要件に基づき、最適なプランをご提案します。",
      technicalChallenges: ["詳細要件の定義", "スケーラビリティの確保"],
      recommendedStack: ["React", "TypeScript", "Node.js"],
      timelineEstimation: "要相談"
    });
  }
};