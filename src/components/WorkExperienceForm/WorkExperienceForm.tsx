import React, { FC } from 'react';
import {
  ProForm,
  ProFormDateRangePicker,
  ProFormGroup,
  ProFormList,
  ProFormText,
  ProFormTextArea
} from '@ant-design/pro-components';
import { WorkExperienceType } from '../CvViewer/CvViewer.types';
import { useAppDispatch } from '../../hooks/redux';
import { updateWorkExperience } from '../../features/cv/cvSlice';

type WorkExperienceFormProps = {
  workExperience: WorkExperienceType[];
};

export const WorkExperienceForm: FC<WorkExperienceFormProps> = (props) => {
  const dispatch = useAppDispatch();

  return (
    <ProForm
      onFinish={async (values) => {
        console.log('Received values of form:', values);
      }}
      onValuesChange={(changeValues) => {
        const index = changeValues.workExperience.findIndex((item) => !!item);
        console.log('changeValues index', index);
        dispatch(updateWorkExperience({ id: index.toString(), ...changeValues.workExperience[index] }));
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
      <ProFormList
        name="workExperience"
        creatorButtonProps={{
          position: 'bottom',
          creatorButtonText: 'Add new work experience'
        }}
        initialValue={props.workExperience}
        copyIconProps={false}
      >
        <ProFormGroup key="group">
          <ProFormText name="companyName" label="Your last employer" width="md" placeholder="EPAM" />
          <ProFormText name="position" label="Position on the job" width="md" placeholder="Senior Software Engineer" />
          <ProFormDateRangePicker name="dateTime" label="When did you work there" />
          <ProFormTextArea
            name="remark"
            label="Key points about this job"
            width="lg"
            placeholder="In short phrases tell us about what you did there"
          />
        </ProFormGroup>
      </ProFormList>
    </ProForm>
  );
};
