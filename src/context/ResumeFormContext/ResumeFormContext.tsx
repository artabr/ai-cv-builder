import React, { useState, useMemo, useContext, PropsWithChildren } from 'react';

export type IntroSectionResumeFormData = {
  name?: string;
  job?: string;
  country?: string;
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

export type ResumeFormContextType = {
  // this is the original form data from wizard from
  introSectionFormData: IntroSectionResumeFormData;
  workSectionFormData: WorkSectionResumeFormData;
  educationSectionFormData: EducationSectionResumeFormData;
  skillsSectionFormData: SkillsSectionResumeFormData;
  // this is the result generated by AI from the original form data
  introResultFromAI: string;
  workResultFromAI: string;
  educationResultFromAI: string;
  skillsResultFromAI: string;

  setIntroSectionFormData: React.Dispatch<IntroSectionResumeFormData>;
  setWorkSectionFormData: React.Dispatch<WorkSectionResumeFormData>;
  setEducationSectionFormData: React.Dispatch<EducationSectionResumeFormData>;
  setSkillsSectionFormData: React.Dispatch<SkillsSectionResumeFormData>;
  setIntroResultFromAI: React.Dispatch<string>;
  setWorkResultFromAI: React.Dispatch<string>;
  setEducationResultFromAI: React.Dispatch<string>;
  setSkillsResultFromAI: React.Dispatch<string>;
};

export const ResumeFormContext = React.createContext<ResumeFormContextType>({} as ResumeFormContextType);

export const ResumeFormProvider = ({ children }: PropsWithChildren) => {
  // TODO: useReducer
  const [introSectionFormData, setIntroSectionFormData] = useState({} as IntroSectionResumeFormData);
  const [workSectionFormData, setWorkSectionFormData] = useState({} as WorkSectionResumeFormData);
  const [educationSectionFormData, setEducationSectionFormData] = useState({} as EducationSectionResumeFormData);
  const [skillsSectionFormData, setSkillsSectionFormData] = useState({} as SkillsSectionResumeFormData);
  const [introResultFromAI, setIntroResultFromAI] = useState('');
  const [workResultFromAI, setWorkResultFromAI] = useState('');
  const [educationResultFromAI, setEducationResultFromAI] = useState('');
  const [skillsResultFromAI, setSkillsResultFromAI] = useState('');

  const value = useMemo(
    () => ({
      introSectionFormData,
      workSectionFormData,
      educationSectionFormData,
      skillsSectionFormData,
      introResultFromAI,
      workResultFromAI,
      educationResultFromAI,
      skillsResultFromAI,
      setIntroSectionFormData,
      setWorkSectionFormData,
      setEducationSectionFormData,
      setSkillsSectionFormData,
      setIntroResultFromAI,
      setWorkResultFromAI,
      setEducationResultFromAI,
      setSkillsResultFromAI
    }),
    [
      introSectionFormData,
      workSectionFormData,
      educationSectionFormData,
      skillsSectionFormData,
      introResultFromAI,
      workResultFromAI,
      educationResultFromAI,
      skillsResultFromAI
    ]
  );

  return <ResumeFormContext.Provider value={value}>{children}</ResumeFormContext.Provider>;
};

export const useResumeFormContext = () => useContext(ResumeFormContext);
