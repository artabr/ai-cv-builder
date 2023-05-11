import React, { createContext, useState, useContext, useMemo } from 'react';
import { ResumeViewerType } from '../components/CvViewer/CvViewer.types';
import { CvData } from '../components/CvViewer/CvViewer.stub';

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
  const [cvData, setCvData] = useState<ResumeViewerType>(CvData);

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
