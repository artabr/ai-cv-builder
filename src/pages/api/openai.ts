import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const apiKey = process.env.OPENAI_API_KEY;
  const url = 'https://api.openai.com/v1/chat/completions';

  const data = {
    model: 'gpt-3.5-turbo',
    messages: req.body.messages,
    max_tokens: req.body.max_tokens || undefined, // length of the answer
    temperature: 0.7 // is a parameter that controls the randomness of the generated text output, 0.7 is common
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify(data)
  });

  const result = await response.json();
  res.status(response.status).json(result);
}
