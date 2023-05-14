import React from 'react';
import {
  ProForm,
  ProFormDateRangePicker,
  ProFormGroup,
  ProFormList,
  ProFormText,
  ProFormTextArea
} from '@ant-design/pro-components';
// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuidv4 } from 'uuid';
// eslint-disable-next-line import/no-extraneous-dependencies
import { FormListActionGuard } from '@ant-design/pro-form/es/components/List/ListItem';
import { Button } from 'antd';
import { EducationType } from '../CvViewer/CvViewer.types';
import { addEducation, updateEducation, removeEducation } from '../../features/cv/cvSlice';
import { useAppDispatch } from '../../hooks/redux';
import { fetchSectionFromAPI } from '../../api/client/wizard';

type EducationFormProps = {
  education: EducationType[];
};

export const EducationForm: React.FC<EducationFormProps> = ({ education }) => {
  const dispatch = useAppDispatch();
  const [loadingIdx, setLoadingIdx] = React.useState<string | null>(null);

  const actionGuard = {
    beforeAddRow: (defaultValue: EducationType) => {
      const id = uuidv4();
      const emptyEducation: EducationType = {
        id,
        universityName: 'University name',
        speciality: 'Field of study',
        remark: ''
      };
      // eslint-disable-next-line no-param-reassign
      defaultValue.id = id;
      // eslint-disable-next-line no-param-reassign
      defaultValue.universityName = 'University name';
      // eslint-disable-next-line no-param-reassign
      defaultValue.speciality = 'Field of study';
      dispatch(addEducation({ ...emptyEducation }));
      return true;
    },
    beforeRemoveRow: async (index: number) => {
      const { id } = education[index] || {};
      dispatch(removeEducation(id));
      return true;
    }
  };

  const handleUpdateCV = async (data: EducationType) => {
    const { universityName, speciality, remark, dateTime, id } = data;
    setLoadingIdx(id);
    const AIEducationDescription = await fetchSectionFromAPI(
      { universityName, speciality, remark, dateTime },
      'education'
    );
    dispatch(updateEducation({ id, description: AIEducationDescription }));
    setLoadingIdx(null);
  };

  return (
    <ProForm
      onValuesChange={(changeValues) => {
        const index = changeValues.education.findIndex((item: Record<string, unknown>) => !!item);
        const { id } = education[index];
        dispatch(updateEducation({ id, ...changeValues.education[index] }));
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
        initialValue={education}
        copyIconProps={false}
        actionGuard={actionGuard as FormListActionGuard}
      >
        {(meta, index, action) => {
          const data = action.getCurrentRowData();

          return (
            <ProFormGroup key="group" style={{ marginBottom: 10, paddingBottom: 20, borderBottom: '1px solid #ccc' }}>
              <ProFormText name="universityName" label="Where did you study?" width="md" placeholder="MIT" />
              <ProFormText name="speciality" label="Field of study?" width="md" placeholder="Computer Science" />
              <ProFormDateRangePicker name="dateTime" label="Period of education" />
              <ProFormTextArea
                name="remark"
                label="Key points about your education"
                width="lg"
                placeholder="In short phrases tell us about what you did there"
              />
              <Button type="primary" loading={loadingIdx === data?.id} onClick={() => handleUpdateCV(data)}>
                Update description
              </Button>
            </ProFormGroup>
          );
        }}
      </ProFormList>
    </ProForm>
  );
};
