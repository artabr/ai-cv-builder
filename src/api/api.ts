import { IntroSectionResumeFormData } from '../context/ResumeFormContext';

export type OpenAIResponse = {
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

export type ConversationHistory = { role: 'user' | 'assistant' | 'system'; content: string }[];

export const callOpenAI = async (
  messages: ConversationHistory,
  maxTokens?: number
): Promise<OpenAIResponse | undefined> => {
  try {
    const response = await fetch('/api/openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages,
        max_tokens: maxTokens
      })
    });

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
  return undefined;
};

export const addContext = async (history: ConversationHistory, text: string): Promise<string | undefined> => {
  const messages: ConversationHistory = [...history, { role: 'user', content: text }];

  const res = await callOpenAI(messages);

  if (res) {
    return res.choices[0].message.content;
  }
  return undefined;
};

export const getGeneratedDescription = async (
  history: ConversationHistory,
  introSectionFormData: IntroSectionResumeFormData
) => {
  const TEMPLATE = `I need a professional and concise description for a CV with the following data:
    Name: ${introSectionFormData.name},
    Country: ${introSectionFormData.country},
    Job: ${introSectionFormData.job},

    Please provide a summary of these qualifications and experience, emphasizing the candidate's strengths and accomplishments.
    Write from the first person perspective, as if you were the candidate.
  `;

  const messages: ConversationHistory = [...history, { role: 'user', content: TEMPLATE }];

  const res = await callOpenAI(messages);

  if (res) {
    return res.choices[0].message.content;
  }
  return undefined;
};

export const getWorkingExperience = async (
  history: ConversationHistory,
  jobTitle: string,
  company: string,
  duration: string,
  technologies: string
): Promise<string | undefined> => {
  const TEMPLATE = `Please generate a detailed work experience entry for a CV of a software engineer with the following background:
  - Job Title: ${jobTitle || 'Senior Software Engineer'}
  - Company: ${company}
  - Duration: ${duration}
  - Main Technologies: ${technologies}

  Describe the candidate's key responsibilities, achievements, and contributions in this role, highlighting their technical expertise and positive impact on the team and the projects they have worked on.
  `;

  const messages: ConversationHistory = [...history, { role: 'user', content: TEMPLATE }];

  const res = await callOpenAI(messages);

  if (res) {
    return res.choices[0].message.content;
  }
  return undefined;
};

export const getEducationExperience = async (
  history: ConversationHistory,
  degree: string,
  university: string,
  graduationYear: number | string,
  additionalInfo: string
) => {
  const TEMPLATE = `Please generate an education entry for a CV of a candidate with the following educational background:
  - Degree: ${degree}
  - University: ${university}
  - Graduation Year: ${graduationYear}
  - Additional Info: ${additionalInfo}

  Describe the candidate's educational experience, emphasizing their strong foundation in computer science and the key coursework that has prepared them for a career in software development.
  `;

  const messages: ConversationHistory = [...history, { role: 'user', content: TEMPLATE }];

  const res = await callOpenAI(messages);

  if (res) {
    return res.choices[0].message.content;
  }
  return undefined;
};
