import React from 'react';
import {
  ProForm,
  ProFormDateRangePicker,
  ProFormGroup,
  ProFormList,
  ProFormText,
  ProFormTextArea
} from '@ant-design/pro-components';
import { Button } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuidv4 } from 'uuid';
// eslint-disable-next-line import/no-extraneous-dependencies
import { FormListActionGuard } from '@ant-design/pro-form/es/components/List/ListItem';
import { WorkExperienceType } from '../CvViewer/CvViewer.types';
import { useAppDispatch } from '../../hooks/redux';
import { addWorkExperience, removeWorkExperience, updateWorkExperience } from '../../features/cv/cvSlice';
import { fetchSectionFromAPI } from '../../api/client/wizard';

type WorkExperienceFormProps = {
  workExperience: WorkExperienceType[];
};

export const WorkExperienceForm: React.FC<WorkExperienceFormProps> = ({ workExperience }) => {
  const dispatch = useAppDispatch();
  const [loadingIdx, setLoadingIdx] = React.useState<string | null>(null);

  const actionGuard = {
    beforeAddRow: (defaultValue: WorkExperienceType) => {
      const id = uuidv4();
      const emptyWorkExperience: WorkExperienceType = {
        id,
        companyName: 'Company name',
        position: 'Position on the job',
        remark: ''
      };
      // eslint-disable-next-line no-param-reassign
      defaultValue.id = id;
      // eslint-disable-next-line no-param-reassign
      defaultValue.companyName = 'Company name';
      // eslint-disable-next-line no-param-reassign
      defaultValue.position = 'Position on the job';
      dispatch(addWorkExperience({ ...emptyWorkExperience }));
      return true;
    },
    beforeRemoveRow: async (index: number) => {
      const { id } = workExperience[index] || {};
      dispatch(removeWorkExperience(id));
      return true;
    }
  };

  const handleUpdateCV = async (data: WorkExperienceType) => {
    const { companyName, position, remark, dateTime, id } = data;
    setLoadingIdx(id);
    const AIWorkDescription = await fetchSectionFromAPI({ companyName, position, remark, dateTime }, 'work');
    dispatch(updateWorkExperience({ id, description: AIWorkDescription }));
    setLoadingIdx(null);
  };

  return (
    <ProForm
      onValuesChange={(changeValues) => {
        const index = changeValues.workExperience.findIndex((item: Record<string, unknown>) => !!item);
        const { id } = workExperience[index];
        dispatch(updateWorkExperience({ id, ...changeValues.workExperience[index] }));
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
        initialValue={workExperience}
        copyIconProps={false}
        actionGuard={actionGuard as FormListActionGuard}
      >
        {(meta, index, action) => {
          const data = action.getCurrentRowData();

          return (
            <ProFormGroup key="group" style={{ marginBottom: 10, paddingBottom: 20, borderBottom: '1px solid #ccc' }}>
              <ProFormText name="companyName" label="Your last employer" width="md" placeholder="EPAM" />
              <ProFormText
                name="position"
                label="Position on the job"
                width="md"
                placeholder="Senior Software Engineer"
              />
              <ProFormDateRangePicker name="dateTime" label="When did you work there" />
              <ProFormTextArea
                name="remark"
                label="Key points about this job"
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
