import type { NextApiRequest, NextApiResponse } from 'next';
import { getEducationSectionFromAI } from '../../../api/server/wizard';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { institution, field, studyDateTime, studyRemark } = req.body;

  try {
    const result = await getEducationSectionFromAI(institution, field, studyDateTime, studyRemark);

    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error });
  }
}
