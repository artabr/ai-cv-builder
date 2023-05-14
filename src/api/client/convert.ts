import axios from 'axios';

type SectionFromAPIResponse = {
  result: string;
};

export const convertToPdf = async (html: string): Promise<string | undefined> => {
  try {
    const blob = new Blob([html], { type: 'text/html' });
    const file = new File([blob], 'generated_CV.html');

    const formData = new FormData();
    formData.append('file', file);

    const { data } = await axios.post<SectionFromAPIResponse>('/api/convert', formData, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    });

    return data.result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('error message: ', error.message);
    }
    console.error('unexpected error: ', error);
    return undefined;
  }
};
