import axios from 'axios';
import { SectionFromAPIResponse } from './client/wizard';

export type OpenAIResponse = {
  data: {
    id: string;
    choices: {
      finish_reason: string; // stop
      index: number; // 0
      message: {
        content: string;
        role: string; // assistant
      };
    }[];
    created: number; // timestamp
    model: string; // gpt-3.5-turbo
    object: string; // chat.completion
    usage: {
      completion_token: string;
      prompt_tokens: string;
      total_tokens: string;
    };
  };
};

export type ConversationHistory = Array<{ role: 'user' | 'assistant' | 'system'; content: string }> | null | undefined;

export const callOpenAI = async (messages: ConversationHistory, maxTokens?: number): Promise<string> => {
  try {
    const body = {
      messages,
      max_tokens: maxTokens
    };
    const { data } = await axios.post<SectionFromAPIResponse>('/api/openai', body, {
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

export const addContext = async (history: ConversationHistory, text: string): Promise<string | undefined> => {
  const messages: ConversationHistory = [...(history?.length ? history : []), { role: 'user', content: text }];

  const res = await callOpenAI(messages);

  if (res) {
    return res;
  }
  return undefined;
};
