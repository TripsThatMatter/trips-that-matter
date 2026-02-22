import OpenAI from "openai";

export default async function handler(req, res) {

const openai = new OpenAI({
apiKey: process.env.OPENAI_API_KEY
});

const { destination, duration, budget, style, purpose, pace } = req.body;

const prompt = `
Create a detailed, transformational travel itinerary.

Destination: ${destination}
Duration: ${duration}
Budget: ${budget}
Style: ${style}
Purpose: ${purpose}
Pace: ${pace}

Include:
- Day-by-day plan
- Cultural immersion experiences
- Transformational elements
- Specific locations
`;

const completion = await openai.chat.completions.create({

model: "gpt-4o-mini",

messages: [
{ role: "system", content: "You are a transformational travel designer." },
{ role: "user", content: prompt }
],

temperature: 0.7

});

res.json({
itinerary: completion.choices[0].message.content
});

}
