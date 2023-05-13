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
  SkillsSectionResumeFormData,
  useResumeFormContext
} from '../../context/ResumeFormContext';
import { fetchSectionFromAPI } from '../../api/client/wizard';
import { PersonalInfoType, WorkExperienceType } from '../../components/CvViewer/CvViewer.types';
import { useAppDispatch } from '../../hooks/redux';
import { addWorkingExperience, setAddress, setFullName, setJob } from '../../features/cv/cvSlice';
import { setIntroResultFromAI, setWorkResultFromAI } from '../../features/chat/chatSlice';
import { ArrayElementType } from '../../store/store';

export default function WizardPage() {
  const formRef = useRef<ProFormInstance>();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { setEducationSectionFormData, setSkillsSectionFormData, setEducationResultFromAI, setSkillsResultFromAI } =
    useResumeFormContext();

  const handleIntroStep = async ({ fullName = '', jobTitle = '', address = '' }: PersonalInfoType) => {
    dispatch(setFullName(fullName));
    dispatch(setJob(jobTitle));
    dispatch(setAddress(address));
    const introSection = await fetchSectionFromAPI({ jobTitle, address }, 'intro');
    dispatch(setIntroResultFromAI(introSection));
    return true;
  };

  const handleWorkStep = async ({
    companyName = '',
    position = '',
    description = '',
    dateTime = []
  }: ArrayElementType<WorkExperienceType>) => {
    dispatch(addWorkingExperience({ id: 1, companyName, position, description, dateTime }));
    const workSection = await fetchSectionFromAPI(
      { companyName, position, description, dateTime: [dateTime?.[0], dateTime?.[1]] },
      'work'
    );
    dispatch(setWorkResultFromAI(workSection));
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
        <StepsForm.StepForm<PersonalInfoType>
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
        <StepsForm.StepForm<ArrayElementType<WorkExperienceType>>
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
            name="description"
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
