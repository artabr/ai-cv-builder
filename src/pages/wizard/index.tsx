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
import { useRouter } from 'next/router';
import {
  EducationSectionResumeFormData,
  IntroSectionResumeFormData,
  SkillsSectionResumeFormData,
  useResumeFormContext,
  WorkSectionResumeFormData
} from '../../context/ResumeFormContext';
import { fetchSectionFromAPI } from '../../api/client/wizard';

export default function WizardPage() {
  const formRef = useRef<ProFormInstance>();
  const router = useRouter();

  const {
    setIntroSectionFormData,
    setWorkSectionFormData,
    setEducationSectionFormData,
    setSkillsSectionFormData,
    setIntroResultFromAI,
    setWorkResultFromAI,
    setEducationResultFromAI,
    setSkillsResultFromAI
  } = useResumeFormContext();

  const handleIntroStep = async (values: IntroSectionResumeFormData) => {
    setIntroSectionFormData(values);
    const introSection = await fetchSectionFromAPI(values, 'intro');
    setIntroResultFromAI(introSection);
    return true;
  };

  const handleWorkStep = async (values: WorkSectionResumeFormData) => {
    setWorkSectionFormData(values);
    const workSection = await fetchSectionFromAPI(values, 'work');
    setWorkResultFromAI(workSection);
    return true;
  };

  const handleEducationStep = async (values: EducationSectionResumeFormData) => {
    setEducationSectionFormData(values);
    const educationSection = await fetchSectionFromAPI(values, 'education');
    setEducationResultFromAI(educationSection);
    return true;
  };

  const handleSkillsStep = async (values: SkillsSectionResumeFormData) => {
    setSkillsSectionFormData(values);
    const skillsSection = await fetchSectionFromAPI(values, 'skills');
    setSkillsResultFromAI(skillsSection);
    return true;
  };

  return (
    <ProCard>
      <StepsForm
        formRef={formRef}
        onFinish={async (values) => {
          message.success('Success!');
          router.push('/builder');
        }}
      >
        <StepsForm.StepForm<IntroSectionResumeFormData>
          name="intro"
          title="Introduce yourself"
          onFinish={async (values) => {
            await handleIntroStep(values);
            return true;
          }}
        >
          <ProFormText name="name" label="Your name" width="md" placeholder="John Doe" />
          <ProFormText name="job" label="What's your job?" width="md" placeholder="Software Engineer" />
          <ProFormText name="country" label="Where do you live?" width="md" placeholder="Planet Earth" />
        </StepsForm.StepForm>
        <StepsForm.StepForm<WorkSectionResumeFormData>
          name="work"
          title="Work experience"
          onFinish={async (values) => {
            await handleWorkStep(values);
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
        <StepsForm.StepForm<EducationSectionResumeFormData>
          name="education"
          title="Education"
          onFinish={async (values) => {
            await handleEducationStep(values);
            return true;
          }}
        >
          <ProFormText name="institution" label="Where did you study" width="md" placeholder="MIT" />
          <ProFormText name="field" label="Field of study" width="md" placeholder="Computer Science" />
          <ProFormDateRangePicker name="studyDateTime" label="Period of education" />
          <ProFormTextArea
            name="studyRemark"
            label="Key points about your education"
            width="lg"
            placeholder="In short phrases tell us about what you did there"
          />
        </StepsForm.StepForm>
        <StepsForm.StepForm<SkillsSectionResumeFormData>
          name="time"
          title="Skills and expertise"
          onFinish={async (values) => {
            await handleSkillsStep(values);
            return true;
          }}
        >
          <ProFormSelect mode="tags" name="skills" label="Your key skills" placeholder="React, TypeScript" />
          <ProFormSelect mode="tags" name="hobbies" label="Your hobbies" placeholder="Music, Sports, Traveling" />
        </StepsForm.StepForm>
      </StepsForm>
    </ProCard>
  );
}
