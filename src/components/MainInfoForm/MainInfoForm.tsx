import React, { FC, useState } from 'react';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { Button, Space } from 'antd';
import { useAppDispatch } from '../../hooks/redux';
import { setFullName } from '../../features/cv/cvSlice';
import { Button, Select, Space } from 'antd';

export type AIResumeTypes = 'workExperience' | 'education' | 'profile';
import { setFullName, setJob, setAddress, setSkills, setHobbies } from '../../features/cv/cvSlice';
import { setFullName, setJob, setAddress } from '../../features/cv/cvSlice';

type MainInfoFormProps = {
  jobTitle?: string;
  fullName?: string;
  address?: string;
  skills?: string[];
  hobbies?: string[];
  handleSelectChange: (value: string, context: AIResumeTypes) => Promise<void>;
  selectOptions: { value: string; label: string }[];
};

export const MainInfoForm: FC<MainInfoFormProps> = (props) => {
  const [infoEdited, setInfoEdited] = useState(false);
  const dispatch = useAppDispatch();

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
      <Space wrap>{infoEdited && <Button type="primary">Regenerate description</Button>}</Space>
    </ProForm>
  );
};
