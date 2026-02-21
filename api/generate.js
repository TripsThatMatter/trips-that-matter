import OpenAI from "openai";

export default async function handler(req,res){
    try{
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });

        const { destination, duration } = req.body;

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: `Create a transformational travel itinerary to ${destination} for ${duration}. Include cultural experiences, personal growth, and reflection opportunities.`
                }
            ]
        });

        res.status(200).json({ result: completion.choices[0].message.content });

    } catch(err){
        console.error(err);
        res.status(500).json({ result: "Error generating itinerary" });
    }
}
