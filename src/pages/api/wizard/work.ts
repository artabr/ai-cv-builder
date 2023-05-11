import type { NextApiRequest, NextApiResponse } from 'next';
import { getWorkSectionFromAI } from '../../../api/server/wizard';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { employer, dateTime, position, remark } = req.body;

  try {
    const result = await getWorkSectionFromAI(employer, dateTime, position, remark);

    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error });
  }
}
