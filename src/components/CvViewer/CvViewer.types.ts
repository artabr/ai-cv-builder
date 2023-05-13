// eslint-disable-next-line no-shadow
export enum Template {
  Basic = 'basic',
  BasicReverse = 'basic reverse',
  Modern = 'modern',
  ModernBlack = 'modern black',
  ModernColumns = 'modern columns',
  ModernColumnBlack = 'modern column black'
}

export type ResumeViewerType = {
  template?: Template; // ...
  personalInfo: {
    jobTitle?: string;
    fullName?: string;
    email?: string;
    address?: string;
    avatar?: string;
    isShowAvatar?: boolean;
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
  skills?: string[];
  hobbies?: string[];
  additionalBlocks?: {
    title: string;
    description: string; // richText? or just string
  }[];
};
