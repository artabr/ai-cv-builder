/**
 * This should not be called from the frontend.
 * Only use it inside API routes since it exposes the API key.
 *
 * You can safely use it inside the API routes since they run only on the server.
 */
import { openai } from '../../services/openai';

export const getIntroSectionFromAI = async (job?: string, country?: string) => {
  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'You are a professional career advisor.' },
      {
        role: 'user',
        content: `I work as a ${job} and live in ${country}. Compose a paragraph where I describe myself to an employer.
        It should have no more than 5 sentences. Don't mention programming languages.`
      }
    ]
  });
  return completion.data.choices[0].message?.content;
};

export const getWorkSectionFromAI = async (
  companyName?: string,
  dateTime?: string[],
  position?: string,
  description?: string
) => {
  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'You are a professional career advisor.' },
      {
        role: 'user',
        content: `I worked at ${companyName} from ${dateTime?.join(' to ')} as a ${position}.
        The key things there were: ${description}.
        Compose a paragraph where I tell about my work experience.
        It should have no more than 5 sentences. Don't start from "As a".`
      }
    ]
  });
  return completion.data.choices[0].message?.content;
};

export const getEducationSectionFromAI = async (
  institution?: string,
  field?: string,
  studyDateTime?: string[],
  studyRemark?: string
) => {
  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'You are a professional career advisor.' },
      {
        role: 'user',
        content: `I studied ${field} at ${institution} from ${studyDateTime?.join(' to ')}.
        The key things there were: ${studyRemark}.
        Compose a paragraph where I tell about my education. It should have no more than 5 sentences.`
      }
    ]
  });
  return completion.data.choices[0].message?.content;
};

export const getSkillsSectionFromAI = async (skills?: string[], languages?: string[]) => {
  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'You are a professional career advisor.' },
      {
        role: 'user',
        content: `My main professional skills are ${skills?.join(' to ')}. My hobbies are ${languages?.join(' to ')}.
        Compose a paragraph where I tell about myself to an employer. It should have no more than 5 sentences.
        Don't start with a greeting. Don't start with "As a/an".`
      }
    ]
  });
  return completion.data.choices[0].message?.content;
};
