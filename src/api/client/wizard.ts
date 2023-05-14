import axios from 'axios';

export type SectionFromAPIResponse = {
  result: string;
};

export const fetchSectionFromAPI = async (values: Record<string, unknown>, part: string): Promise<string> => {
  try {
    const { data } = await axios.post<SectionFromAPIResponse>(`/api/wizard/${part}`, values, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('OpenAI result on the FE: ', data.result);
    return data.result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      return error.message;
    }
    console.log('unexpected error: ', error);
    return 'An unexpected error occurred';
  }
};
