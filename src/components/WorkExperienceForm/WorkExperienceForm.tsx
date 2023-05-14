import React from 'react';
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
import { addWorkExperience, removeWorkExperience, updateWorkExperience } from '../../features/cv/cvSlice';

type WorkExperienceFormProps = {
  workExperience: WorkExperienceType[];
};

const emptyWorkExperience: WorkExperienceType = {
  id: '0',
  companyName: 'Company name',
  position: 'Position on the job',
  remark: ''
};

export const WorkExperienceForm: React.FC<WorkExperienceFormProps> = (props) => {
  const dispatch = useAppDispatch();
  const actionGuard = {
    beforeAddRow: (defaultValue, insertIndex) => {
      // eslint-disable-next-line no-param-reassign
      defaultValue.companyName = 'Company name';
      // eslint-disable-next-line no-param-reassign
      defaultValue.position = 'Position on the job';
      dispatch(addWorkExperience({ ...emptyWorkExperience, id: insertIndex.toString() }));
      return true;
    },
    beforeRemoveRow: async (index) => {
      dispatch(removeWorkExperience(index.toString()));
      return true;
    }
  };

  return (
    <ProForm
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
        actionGuard={actionGuard}
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
