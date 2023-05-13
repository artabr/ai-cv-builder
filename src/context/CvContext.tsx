import React, { createContext, useState, useContext, useMemo } from 'react';
import merge from 'lodash/merge';
import { ResumeViewerType, Template } from '../components/CvViewer/CvViewer.types';
import { avatar, cvDataMock } from '../components/CvViewer/CvViewer.stub';
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
  console.log('data', cvDataMock);
  const [cvData, setCvData] = useState<ResumeViewerType>({
    template: Template.ModernBlack,
    personalInfo: {
      jobTitle: 'Frontend Developer',
      fullName: 'Bykau Yauheni',
      email: 'zoroo@mail.ru',
      address: 'Belarus, Brest Gogolya 85 - 105',
      avatar,
      isShowAvatar: true,
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
    },
    workExperience: [
      {
        companyName: 'EPAM',
        position: 'Frontend Developer',
        adress: 'The USA, NY',
        startDate: 1683619227518,
        endDate: 1683619227518,
        isCurrentWork: true,
        description: `t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).`
      }
    ],
    education: [
      {
        universityName: 'Grodno State Medical University',
        speciality: 'Doctor',
        startDate: 1683619227518,
        endDate: 1683619227518,
        isCurrentEducation: false,
        description: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`
      }
    ],
    skills: ['React', 'Next Js'],
    hobbies: ['Yoga', 'Gym'],
    additionalBlocks: [
      {
        title: 'Additional block title',
        description: `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.`
      }
    ]
  });

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
