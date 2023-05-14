import { NextApiRequest, NextApiResponse } from 'next';

import fs from 'fs';
import multer from 'multer';

import { convertApi } from '../../services/convertApi';

type ErrorResponseType = {
  error: string;
};

type FileType = {
  file: {
    filename: string;
    path: string;
    size: number;
  };
};

const PATH_TO_HTML_FOLDER = 'src/pages/api/uploads/html';
const LAST_SYMBOLS_TO_REMOVE = -5;

/**
 * Removes the .html extension from file's name
 */
const truncateFileName = (fileName: string) => fileName.slice(0, LAST_SYMBOLS_TO_REMOVE);

const upload = multer({
  storage: multer.diskStorage({
    destination: PATH_TO_HTML_FOLDER,
    filename: (req, file: { originalname: string }, cb: (...args: any) => void) =>
      cb(null, `${truncateFileName(file.originalname)}_${new Date().getTime()}.html`)
  })
});

export default async function handler(req: NextApiRequest & FileType, res: NextApiResponse) {
  try {
    await new Promise<void>((resolve, reject) => {
      upload.single('file')(req, res, (error: ErrorResponseType) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });

    const { file } = req;

    const stream = fs.createReadStream(file.path);

    const uploadResult = convertApi.upload(stream, file.filename);

    const convertionResult = await convertApi.convert('pdf', { File: uploadResult });

    fs.unlinkSync(`${PATH_TO_HTML_FOLDER}/${file.filename}`);

    res.status(200).send({ result: convertionResult.file.url });
  } catch (error) {
    res.status(500).json({ error });
  }
}

export const config = {
  api: {
    bodyParser: false
  }
};
