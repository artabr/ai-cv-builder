import React, { createContext, useState, useContext, useMemo } from 'react';
import merge from 'lodash/merge';
import { ResumeViewerType } from '../components/CvViewer/CvViewer.types';
import { cvDataMock } from '../components/CvViewer/CvViewer.stub';
import { useResumeFormContext } from './ResumeFormContext';

type AuthContextType = {
  cvData: ResumeViewerType;
  setCvData: (data: ResumeViewerType) => void;
};

export const CvContext = createContext<AuthContextType>({
  cvData: { personalInfo: {} },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setCvData: () => {}
});

export const CvContextProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    introSectionFormData,
    workSectionFormData,
    educationSectionFormData,
    skillsSectionFormData,
    introResultFromAI,
    workResultFromAI,
    educationResultFromAI,
    skillsResultFromAI
  } = useResumeFormContext();
  const cvDataFromWizard: ResumeViewerType = {
    personalInfo: {
      fullName: introSectionFormData.name,
      description: introResultFromAI
    },
    workExperience: [
      {
        companyName: workSectionFormData.employer ?? '',
        position: workSectionFormData.employer ?? '',
        // TODO: remove address
        adress: '',
        isCurrentWork: false,
        startDate: 0,
        endDate: 0,
        description: workResultFromAI
      }
    ],
    education: [
      {
        universityName: educationSectionFormData.institution ?? '',
        speciality: educationSectionFormData.institution ?? '',
        startDate: 0,
        endDate: 0,
        description: educationResultFromAI,
        isCurrentEducation: false
      }
    ],
    skills: skillsSectionFormData.skills?.map((item) => item),
    hobbies: skillsSectionFormData.hobbies?.map((item) => item),
    additionalBlocks: [
      {
        title: 'More info about me',
        description: skillsResultFromAI
      }
    ]
  };
  const defaultCvData = merge(cvDataMock, cvDataFromWizard);

  const [cvData, setCvData] = useState<ResumeViewerType>(defaultCvData);

  const value = useMemo(() => {
    return {
      cvData,
      setCvData
    };
  }, [cvData]);

  return <CvContext.Provider value={value}>{children}</CvContext.Provider>;
};

export function useCvContext() {
  const context = useContext(CvContext);
  if (!context) {
    throw new Error('CvContext must be written in CvContextProvider');
  }
  return context;
}
