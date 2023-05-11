import { Configuration, OpenAIApi } from 'openai';

/**
 * This should not be called from the frontend.
 * Only use it inside API routes since it exposes the API key.
 */
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
export const openai = new OpenAIApi(configuration);
