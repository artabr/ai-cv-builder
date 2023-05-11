// eslint-disable-next-line no-shadow
export enum Template {
  Basic = 'basic',
  BasicReverse = 'basic reverse',
  Modern = 'modern'
}

export type ResumeViewerType = {
  template?: Template; // ...
  personalInfo: {
    fullName?: string;
    // or surname and name
    birthDate?: number; // timestamp
    email?: string;
    phone?: string;
    address?: string;
    avatar?: string;
    englishLevel?: string; // A1, A2, B1, B2, C1, C2
    salaryExpectation?: string;
    isShowAvatar?: boolean;
    social?: {
      github?: string;
      linkedin?: string;
      facebook?: string;
      twitter?: string;
      instagram?: string;
      youtube?: string;
      website?: string;
    };
    description?: string; // richText? or just string
  };
  workExperience?: {
    companyName: string;
    position: string; // job title
    adress: string;
    startDate: number; // timestamp
    endDate: number; // timestamp
    isCurrentWork: boolean;
    description: string; // richText? or just string
  }[];
  education?: {
    universityName: string;
    speciality: string;
    startDate: number; // timestamp
    endDate: number; // timestamp
    isCurrentEducation: boolean;
    description: string; // richText? or just string
  }[];
  skills?: {
    name: string;
    level: number; // 1-5m or in percent from 0 to 100
  }[];
  hobbies?: {
    name: string;
    icon: string; // url
  }[];
  additionalBlocks?: {
    title: string;
    description: string; // richText? or just string
  }[];
};
