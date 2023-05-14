import React, { useState } from 'react';
import { ProForm, ProFormSelect } from '@ant-design/pro-components';
import { Button, Space } from 'antd';
import { useAppDispatch } from '../../hooks/redux';
import { setHobbies, setSkills } from '../../features/cv/cvSlice';

type SkillsFormProps = {
  skills?: string[];
  hobbies?: string[];
};

export const SkillsForm: React.FC<SkillsFormProps> = (props) => {
  const [skillsEdited, setSkillsEdited] = useState(false);
  const dispatch = useAppDispatch();

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
      <Space wrap>{skillsEdited && <Button type="primary">Regerate skills info</Button>}</Space>
    </ProForm>
  );
};
