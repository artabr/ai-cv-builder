import React, { FC } from 'react';
import {
  ProForm,
  ProFormDateRangePicker,
  ProFormGroup,
  ProFormList,
  ProFormText,
  ProFormTextArea
} from '@ant-design/pro-components';
import { EducationType } from '../CvViewer/CvViewer.types';
import { addEducation, updateEducation, removeEducation } from '../../features/cv/cvSlice';
import { useAppDispatch } from '../../hooks/redux';

type EducationFormProps = {
  education: EducationType[];
};

const emptyEducation: EducationType = {
  id: '0',
  universityName: 'University name',
  speciality: 'Field of study',
  remark: ''
};

export const EducationForm: FC<EducationFormProps> = (props) => {
  const dispatch = useAppDispatch();
  const actionGuard = {
    beforeAddRow: (defaultValue, insertIndex) => {
      // eslint-disable-next-line no-param-reassign
      defaultValue.universityName = 'University name';
      // eslint-disable-next-line no-param-reassign
      defaultValue.speciality = 'Field of study';
      dispatch(addEducation({ ...emptyEducation, id: insertIndex.toString() }));
      return true;
    },
    beforeRemoveRow: async (index) => {
      dispatch(removeEducation(index.toString()));
      return true;
    }
  };

  return (
    <ProForm
      onValuesChange={(changeValues) => {
        const index = changeValues.education.findIndex((item) => !!item);
        console.log('changeValues index', index);
        dispatch(updateEducation({ id: index.toString(), ...changeValues.education[index] }));
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
        name="education"
        creatorButtonProps={{
          position: 'bottom',
          creatorButtonText: 'Add new education'
        }}
        initialValue={props.education}
        copyIconProps={false}
        actionGuard={actionGuard}
      >
        <ProFormGroup key="group">
          <ProFormText name="universityName" label="Where did you study?" width="md" placeholder="MIT" />
          <ProFormText name="speciality" label="Field of study?" width="md" placeholder="Computer Science" />
          <ProFormDateRangePicker name="dateTime" label="Period of education" />
          <ProFormTextArea
            name="remark"
            label="Key points about your education"
            width="lg"
            placeholder="In short phrases tell us about what you did there"
          />
        </ProFormGroup>
      </ProFormList>
    </ProForm>
  );
};
