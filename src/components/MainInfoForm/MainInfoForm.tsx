import React, { FC, useState } from 'react';
import { ProForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { Button, Space } from 'antd';
import { useAppDispatch } from '../../hooks/redux';
import { setFullName } from '../../features/cv/cvSlice';
import { Button, Select, Space } from 'antd';

export type AIResumeTypes = 'workExperience' | 'education' | 'profile';

type MainInfoFormProps = {
  onJobChange?: (job: string) => void;
  onCountryChange?: (country: string) => void;
  onSkillsChange?: (skills: string[]) => void;
  onHobbiesChange?: (hobbies: string[]) => void;
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
  const [skillsEdited, setSkillsEdited] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <ProForm
      onValuesChange={(changeValues) => {
        switch (true) {
          case 'name' in changeValues:
            dispatch(setFullName(changeValues.name));
            break;
          case 'job' in changeValues:
            props.onJobChange?.(changeValues.job);
            setInfoEdited(true);
            break;
          case 'country' in changeValues:
            props.onCountryChange?.(changeValues.country);
            setInfoEdited(true);
            break;
          case 'skills' in changeValues:
            props.onSkillsChange?.(changeValues.skills);
            setSkillsEdited(true);
            break;
          case 'hobbies' in changeValues:
            props.onHobbiesChange?.(changeValues.hobbies);
            setSkillsEdited(true);
            break;
          default:
            break;
        }
      }}
      initialValues={{
        name: props.fullName,
        job: props.jobTitle,
        country: props.address,
        skills: props.skills?.map((item) => ({ value: item })),
        hobbies: props.hobbies?.map((item) => ({ value: item }))
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
      <ProFormSelect mode="tags" name="skills" label="Your key skills" placeholder="React, TypeScript" />
      <ProFormSelect mode="tags" name="hobbies" label="Your hobbies" placeholder="Music, Sports, Traveling" />
      <Space wrap>
        {infoEdited && <Button type="primary">Regenerate description</Button>}
        {skillsEdited && <Button type="primary">Regerate skills info</Button>}
      </Space>
    </ProForm>
  );
};
