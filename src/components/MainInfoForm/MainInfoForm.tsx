import React, { useState } from 'react';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { Button, Select, Space } from 'antd';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setFullName, setJob, setAddress, setDescription } from '../../features/cv/cvSlice';
import { fetchSectionFromAPI } from '../../api/client/wizard';
import { IntroSectionResumeFormData } from '../../models/types';

export type AIResumeTypes = 'workExperience' | 'education' | 'profile';

type MainInfoFormProps = {
  jobTitle?: string;
  fullName?: string;
  address?: string;
  handleSelectChange: (value: string, context: AIResumeTypes) => Promise<void>;
  selectOptions: { value: string; label: string }[];
};

export const MainInfoForm: React.FC<MainInfoFormProps> = (props) => {
  const [infoEdited, setInfoEdited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const cvDataFromRedux = useAppSelector((state) => state.cv);

  const handleIntroStep = async () => {
    setIsLoading(true);
    const values: IntroSectionResumeFormData = {
      fullName: cvDataFromRedux.personalInfo.fullName,
      jobTitle: cvDataFromRedux.personalInfo.jobTitle,
      address: cvDataFromRedux.personalInfo.address
    };
    const introSection = await fetchSectionFromAPI(values, 'intro');
    dispatch(setDescription(introSection));
    setIsLoading(false);
    return true;
  };

  return (
    <ProForm
      onValuesChange={(changeValues) => {
        switch (true) {
          case 'name' in changeValues:
            dispatch(setFullName(changeValues.name));
            break;
          case 'job' in changeValues:
            dispatch(setJob(changeValues.job));
            setInfoEdited(true);
            break;
          case 'country' in changeValues:
            dispatch(setAddress(changeValues.country));
            setInfoEdited(true);
            break;
          default:
            break;
        }
      }}
      initialValues={{
        name: props.fullName,
        job: props.jobTitle,
        country: props.address
      }}
      submitter={{
        resetButtonProps: {
          style: {
            display: 'none'
          }
        },
        submitButtonProps: {
          style: {
            display: 'none'
          }
        }
      }}
    >
      <Select
        placeholder="Customize your experience"
        style={{ width: 200, marginBottom: 20 }}
        onChange={(value) => props.handleSelectChange(value, 'profile')}
        options={props.selectOptions}
      />
      <ProFormText name="name" label="Your name" width="md" placeholder="John Doe" />
      <ProFormText name="job" label="What's your job?" width="md" placeholder="Software Engineer" />
      <ProFormText name="country" label="Where do you live?" width="md" placeholder="Planet Earth" />
      <Space wrap>
        {infoEdited && (
          <Button type="primary" onClick={handleIntroStep} loading={isLoading}>
            Regenerate description
          </Button>
        )}
      </Space>
    </ProForm>
  );
};
