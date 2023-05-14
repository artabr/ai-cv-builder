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
  description?: string;
};

export type WorkExperienceType = {
  id: string;
  companyName?: string;
  position?: string;
  dateTime?: string[]; // american date format
  startDate?: string; // american date format
  endDate?: string; // american date format
  isCurrentWork?: boolean;
  description?: string;
  remark?: string;
};

export type EducationType = {
  id: string;
  universityName?: string;
  speciality?: string;
  dateTime?: string[]; // american date format
  startDate?: string; // american date format
  endDate?: string; // american date format
  isCurrentEducation?: boolean;
  description?: string;
  remark?: string;
};

export type ResumeViewerType = {
  template?: Template; // ...
  personalInfo: PersonalInfoType;
  workExperience: WorkExperienceType[];
  education: EducationType[];
  skills: string[];
  hobbies: string[];
  summary?: string;
};

export type BaseCVReviewTemplateProps = {
  cv: ResumeViewerType;
};
