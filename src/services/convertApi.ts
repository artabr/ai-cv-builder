import ConvertAPI from 'convertapi';

class ConvertApi {
  static instance: ConvertAPI | null = null;

  static getInstance() {
    if (!ConvertApi.instance) {
      ConvertApi.instance = new ConvertAPI(process.env.CONVERT_API_KEY || '', {
        conversionTimeout: 60,
        uploadTimeout: 60,
        downloadTimeout: 60
      });
    }
    return ConvertApi.instance;
  }
}

export const convertApi = ConvertApi.getInstance();
