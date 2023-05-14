import type { NextApiRequest, NextApiResponse } from 'next';
import { getIntroSectionFromAI } from '../../../api/server/wizard';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { jobTitle, address } = req.body;

  try {
    const result = await getIntroSectionFromAI(jobTitle, address);

    console.log('OpenAI result on the BE: ', result);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error });
  }
}
