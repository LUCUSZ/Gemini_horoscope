// /pages/api/generatePoem.ts
import type { NextApiRequest, NextApiResponse } from 'next';
const { TextGenerationModel } = require('@google/generative-ai');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const model = new TextGenerationModel({
        apiKey: "AIzaSyCANOr-8VLCuvKEkC9rTUZnX6ooR9ldGiM", // Use your API key from an environment variable
        modelName: 'gemini-1.5-flash',
        
      });

      const response = await model.generate({
        prompt: req.body.prompt || "Write a poem about a robot who dreams of being human.",
      });

      res.status(200).json({ text: response.text });
    } catch (error) {
      console.error('Error generating text:', error);
      res.status(500).json({ error: 'Failed to generate poem' });
    }
  } else {  
    res.status(405).json({ message: 'Method not allowed' });
  }
}
