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
// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuidv4 } from 'uuid';
import { fetchSectionFromAPI } from '../../api/client/wizard';
import { useAppDispatch } from '../../hooks/redux';
import {
  addEducation,
  addWorkExperience,
  setAddress,
  setFullName,
  setJob,
  setSkills,
  setHobbies,
  setSummary,
  setDescription
} from '../../features/cv/cvSlice';
import {
  EducationSectionResumeFormData,
  IntroSectionResumeFormData,
  SkillsSectionResumeFormData,
  WorkSectionResumeFormData
} from '../../models/types';

export default function WizardPage() {
  const formRef = useRef<ProFormInstance>();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleIntroStep = async ({ fullName = '', jobTitle = '', address = '' }: IntroSectionResumeFormData) => {
    dispatch(setFullName(fullName));
    dispatch(setJob(jobTitle));
    dispatch(setAddress(address));
    const introSection = await fetchSectionFromAPI({ jobTitle, address }, 'intro');
    dispatch(setDescription(introSection));
    return true;
  };

  const handleWorkStep = async (values: WorkSectionResumeFormData) => {
    const { companyName = '', position = '', remark = '', dateTime } = values;
    const workSection = await fetchSectionFromAPI({ companyName, position, remark, dateTime }, 'work');
    dispatch(addWorkExperience({ id: uuidv4(), companyName, position, remark, dateTime, description: workSection }));
    return true;
  };

  const handleEducationStep = async (values: EducationSectionResumeFormData) => {
    const { institution = '', field = '', studyRemark = '', studyDateTime } = values;
    const educationSection = await fetchSectionFromAPI(values, 'education');
    dispatch(
      addEducation({
        id: uuidv4(),
        universityName: institution,
        speciality: field,
        remark: studyRemark,
        dateTime: studyDateTime,
        description: educationSection
      })
    );
    return true;
  };

  const handleSkillsStep = async (values: SkillsSectionResumeFormData) => {
    const { skills, hobbies } = values;
    dispatch(setSkills(skills ?? []));
    dispatch(setHobbies(hobbies ?? []));
    const skillsSection = await fetchSectionFromAPI(values, 'skills');
    dispatch(setSummary(skillsSection));
    return true;
  };

  return (
    <ProCard>
      <StepsForm
        formRef={formRef}
        onFinish={async () => {
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
          <ProFormText name="fullName" label="Your full name" width="md" placeholder="John Doe" />
          <ProFormText name="jobTitle" label="What's your job?" width="md" placeholder="Software Engineer" />
          <ProFormText name="address" label="Where do you live?" width="md" placeholder="Planet Earth" />
        </StepsForm.StepForm>
        <StepsForm.StepForm<WorkSectionResumeFormData>
          name="work"
          title="Work experience"
          onFinish={async (values) => {
            await handleWorkStep(values);
            return true;
          }}
        >
          <ProFormText name="companyName" label="Your last employer" width="md" placeholder="EPAM" />
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
