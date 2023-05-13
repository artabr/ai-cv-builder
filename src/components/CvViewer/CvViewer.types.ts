// eslint-disable-next-line no-shadow
export enum Template {
  Basic = 'basic',
  BasicReverse = 'basic reverse',
  Modern = 'modern',
  ModernBlack = 'modern black',
  ModernColumns = 'modern columns',
  ModernColumnBlack = 'modern column black'
}

export type PersonalInfoType = {
  jobTitle?: string;
  fullName?: string;
  email?: string;
  address?: string;
  avatar?: string;
  isShowAvatar?: boolean;
  description?: string; // richText? or just string
};

export type WorkExperienceType = {
  id: string | number;
  companyName: string;
  position: string; // job title
  startDate?: number;
  endDate?: number;
  dateTime?: string[];
  isCurrentWork?: boolean;
  description?: string; // richText? or just string
}[];

export type EducationType = {
  universityName: string;
  speciality: string;
  startDate: number; // timestamp
  endDate: number; // timestamp
  isCurrentEducation: boolean;
  description: string; // richText? or just string
}[];

export type ResumeViewerType = {
  template?: Template; // ...
  personalInfo: PersonalInfoType;
  workExperience?: WorkExperienceType;
  education?: EducationType;
  skills?: string[];
  hobbies?: string[];
  additionalBlocks?: {
    title: string;
    description: string; // richText? or just string
  }[];
};
