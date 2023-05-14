export type IntroSectionResumeFormData = {
  fullName?: string;
  jobTitle?: string;
  address?: string;
};

export type WorkSectionResumeFormData = {
  companyName?: string;
  position?: string;
  dateTime?: string[];
  remark?: string;
};

export type EducationSectionResumeFormData = {
  institution?: string;
  field?: string;
  studyDateTime?: string[];
  studyRemark?: string;
};

export type SkillsSectionResumeFormData = {
  skills?: string[];
  hobbies?: string[];
};
