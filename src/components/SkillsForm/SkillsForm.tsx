import React, { useState } from 'react';
import { ProForm, ProFormSelect } from '@ant-design/pro-components';
import { Button, Space } from 'antd';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setHobbies, setSkills, setSummary } from '../../features/cv/cvSlice';
import { SkillsSectionResumeFormData } from '../../models/types';
import { fetchSectionFromAPI } from '../../api/client/wizard';

type SkillsFormProps = {
  skills?: string[];
  hobbies?: string[];
};

export const SkillsForm: React.FC<SkillsFormProps> = (props) => {
  const [skillsEdited, setSkillsEdited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const cvDataFromRedux = useAppSelector((state) => state.cv);
  const dispatch = useAppDispatch();

  const handleClick = async () => {
    setIsLoading(true);
    const values: SkillsSectionResumeFormData = {
      skills: cvDataFromRedux.skills,
      hobbies: cvDataFromRedux.hobbies
    };
    const skillsSection = await fetchSectionFromAPI(values, 'skills');
    dispatch(setSummary(skillsSection));
    setIsLoading(false);
    return true;
  };

  return (
    <ProForm
      onValuesChange={(changeValues) => {
        switch (true) {
          case 'skills' in changeValues:
            dispatch(setSkills(changeValues.skills));
            setSkillsEdited(true);
            break;
          case 'hobbies' in changeValues:
            dispatch(setHobbies(changeValues.hobbies));
            setSkillsEdited(true);
            break;
          default:
            break;
        }
      }}
      initialValues={{
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
      <ProFormSelect mode="tags" name="skills" label="Your key skills" placeholder="React, TypeScript" />
      <ProFormSelect mode="tags" name="hobbies" label="Your hobbies" placeholder="Music, Sports, Traveling" />
      <Space wrap>
        {skillsEdited && (
          <Button type="primary" onClick={handleClick} loading={isLoading}>
            Regerate skills info
          </Button>
        )}
      </Space>
    </ProForm>
  );
};
