import type { ProFormInstance } from '@ant-design/pro-components';
import {
  ProCard,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm
} from '@ant-design/pro-components';
import { message } from 'antd';
import { useRef } from 'react';

const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default function WizardPage() {
  const formRef = useRef<ProFormInstance>();

  return (
    <ProCard>
      <StepsForm<{
        name: string;
      }>
        formRef={formRef}
        onFinish={async () => {
          await waitTime(1000);
          message.success('Success!');
        }}
        formProps={{
          validateMessages: {
            required: 'This field is required'
          }
        }}
      >
        <StepsForm.StepForm<{
          name: string;
        }>
          name="base"
          title="Introduce yourself"
          onFinish={async () => {
            await waitTime(2000);
            return true;
          }}
        >
          <ProFormText name="name" label="Your name" width="md" placeholder="John Doe" />
          <ProFormText name="job" label="What's your job?" width="md" placeholder="Software Engineer" />
          <ProFormText name="country" label="Where do you live?" width="md" placeholder="Planet Earth" />
        </StepsForm.StepForm>
        <StepsForm.StepForm<{
          checkbox: string;
        }>
          name="checkbox"
          title="Work experience"
          onFinish={async () => {
            return true;
          }}
        >
          <ProFormText name="employer" label="Your last employer" width="md" placeholder="EPAM" />
          <ProFormText name="position" label="Position on the job" width="md" placeholder="Senior Software Engineer" />
          <ProFormDateRangePicker name="dateTime" label="When did you work there" />
          <ProFormTextArea
            name="remark"
            label="Key points about this job"
            width="lg"
            placeholder="In short phrases tell us about what you did there"
          />
        </StepsForm.StepForm>
        <StepsForm.StepForm name="time" title="Skills and expertise">
          <ProFormSelect mode="tags" name="skills" label="Your key skills" placeholder="React, TypeScript" />
          <ProFormSelect mode="tags" name="hobbies" label="Your hobbies" placeholder="Music, Sports, Traveling" />
        </StepsForm.StepForm>
      </StepsForm>
    </ProCard>
  );
}
