import type { NextApiRequest, NextApiResponse } from 'next';
import { getWorkSectionFromAI } from '../../../api/server/wizard';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { companyName, dateTime, position, description } = req.body;

  try {
    const result = await getWorkSectionFromAI(companyName, dateTime, position, description);

    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error });
  }
}
