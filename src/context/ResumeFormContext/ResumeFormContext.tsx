import React, { useState, useMemo, useContext, PropsWithChildren } from 'react';

export type ResumeFormData = {
  country?: string;
  dateTime?: string[];
  employer?: string;
  hobbies?: string[];
  job?: string;
  name?: string;
  position?: string;
  remark?: string;
  skills?: string[];
};

export type ResumeFormContextType = {
  resumeFormData: ResumeFormData;
  setResumeFormData: React.Dispatch<ResumeFormData>;
};

export const ResumeFormContext = React.createContext<ResumeFormContextType>({} as ResumeFormContextType);

export const ResumeFormProvider = ({ children }: PropsWithChildren) => {
  const [resumeFormData, setResumeFormData] = useState({} as ResumeFormData);

  const value = useMemo(
    () => ({
      resumeFormData,
      setResumeFormData
    }),
    [resumeFormData]
  );

  return <ResumeFormContext.Provider value={value}>{children}</ResumeFormContext.Provider>;
};

export const useResumeFormContext = () => useContext(ResumeFormContext);
