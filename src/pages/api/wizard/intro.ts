import type { NextApiRequest, NextApiResponse } from 'next';
import { getIntroSectionFromAI } from '../../../api/server/wizard';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { job, country } = req.body;

  try {
    const result = await getIntroSectionFromAI(job, country);

    console.log('OpenAI result on the BE: ', result);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error });
  }
}
