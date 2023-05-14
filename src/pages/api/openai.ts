import type { NextApiRequest, NextApiResponse } from 'next';
import { openai } from '../../services/openai';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: req.body.messages,
      max_tokens: req.body.max_tokens || undefined, // length of the answer
      temperature: 0.7 // is a parameter that controls the randomness of the generated text output, 0.7 is common
    });

    res.status(200).json({ result: completion.data.choices[0].message?.content });
  } catch (error) {
    res.status(500).json({ error });
  }
}
