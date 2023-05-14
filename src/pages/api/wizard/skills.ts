import type { NextApiRequest, NextApiResponse } from 'next';
import { getSkillsSectionFromAI } from '../../../api/server/wizard';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { skills, languages } = req.body;

  try {
    const result = await getSkillsSectionFromAI(skills, languages);

    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error });
  }
}
