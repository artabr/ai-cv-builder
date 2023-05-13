import { useState } from 'react';
import { ProCard } from '@ant-design/pro-components';
import { Collapse, Select } from 'antd';
import { CvViewer } from '../../components/CvViewer/CvViewer';
import { Paper } from '../../components/Paper';
import { useResumeFormContext } from '../../context/ResumeFormContext';
import { Template } from '../../components/CvViewer/CvViewer.types';
import { addContext, ConversationHistory } from '../../api/api';
import './builder.less';
import { MainInfoForm, AIResumeTypes } from '../../components/MainInfoForm';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { SkillsForm } from '../../components/SkillsForm';
import { setTemplate } from '../../features/cv/cvSlice';
import { WorkExperienceForm } from '../../components/WorkExperienceForm';
import { EducationForm } from '../../components/EducationForm';

const { Panel } = Collapse;

const dontDoTemplate =
  'Please rewrite the following text with slight changes and RETURN ONLY THE REVISED TEXT and dont write me Revised Text:';

export default function BuilderPage() {
  const cvDataFromRedux = useAppSelector((state) => state.cv);
  const dispatch = useAppDispatch();

  const {
    educationSectionFormData: { institution, field, studyDateTime, studyRemark },
    introResultFromAI,
    setIntroResultFromAI,
    workResultFromAI,
    setWorkResultFromAI,
    educationResultFromAI,
    setEducationResultFromAI
  } = useResumeFormContext();
  const [messagesHistory, setMessagesHistory] = useState<Record<AIResumeTypes, ConversationHistory> | null>({
    profile: [{ role: 'assistant', content: introResultFromAI ?? '' }],
    workExperience: [{ role: 'assistant', content: workResultFromAI ?? '' }],
    education: [{ role: 'assistant', content: educationResultFromAI ?? '' }]
  });
  const [isWriting, setIsWriting] = useState(false);
  const templatesSelectOptions = [
    Template.Basic,
    Template.BasicReverse,
    Template.Modern,
    Template.ModernBlack,
    Template.ModernColumns,
    Template.ModernColumnBlack
  ].map((el) => ({
    text: el,
    value: el
  }));
  const selectOptions = [
    { value: 'add more details', label: 'Add more details', disabled: isWriting },
    { value: 'add less details', label: 'Add less details', disabled: isWriting },
    { value: 'make more fun', label: 'Make more fun', disabled: isWriting },
    { value: 'make more serious', label: 'Make more serious', disabled: isWriting }
  ];

  const addNewContextToAI = async (newRequest: string, context: AIResumeTypes) => {
    const newRequestWithTemplate = `${dontDoTemplate}, and ${newRequest}`;
    setIsWriting(true);
    const answer = await addContext(messagesHistory?.[context], newRequestWithTemplate);
    setIsWriting(false);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setMessagesHistory((prevState) => {
      const prevContext = Array.isArray(prevState?.[context]) ? prevState?.[context] : [];
      return {
        ...prevState,
        [context]: [
          ...(prevContext as Array<{ role: 'user' | 'assistant' | 'system'; content: string }>),
          { role: 'user', content: newRequestWithTemplate },
          { role: 'assistant', content: answer ?? '' }
        ]
      };
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    switch (context) {
      case 'workExperience':
        setWorkResultFromAI(answer || '');
        break;
      case 'education':
        setEducationResultFromAI(answer || '');
        break;
      case 'profile':
        setIntroResultFromAI(answer || '');
        break;
      default:
        break;
    }
  };

  const handleSelectChange = async (value: string, context: AIResumeTypes = 'workExperience') => {
    setIsWriting(true);
    await addNewContextToAI(value, context);
    setIsWriting(false);
  };

  return (
    <div>
      <div className="page-header">
        <h1>Builder Page</h1>
        <Select
          style={{ width: 200 }}
          placeholder="Choose template"
          options={templatesSelectOptions}
          onChange={(value) => dispatch(setTemplate(value))}
          value={cvDataFromRedux.template}
        />
      </div>
      <ProCard gutter={8} style={{ marginBlockStart: 8 }}>
        <ProCard colSpan={12} layout="center">
          <Collapse style={{ width: '100%' }} defaultActiveKey={['1']}>
            <Panel header="Main info" key="1">
              <MainInfoForm
                fullName={cvDataFromRedux.personalInfo.fullName}
                address={cvDataFromRedux.personalInfo.address}
                jobTitle={cvDataFromRedux.personalInfo.jobTitle}
                handleSelectChange={handleSelectChange}
                selectOptions={selectOptions}
              />
            </Panel>
            <Panel header="Work experience" key="2">
              <WorkExperienceForm workExperience={cvDataFromRedux.workExperience} />{' '}
            </Panel>
            <Panel header="Education" key="3">
              <EducationForm education={cvDataFromRedux.education} />
            </Panel>
            <Panel header="Skills and hobbies" key="4">
              <SkillsForm skills={cvDataFromRedux.skills} hobbies={cvDataFromRedux.hobbies} />
            </Panel>
          </Collapse>
        </ProCard>
        <ProCard colSpan={12} layout="center">
          <Paper>
            <CvViewer cv={cvDataFromRedux} />
          </Paper>
        </ProCard>
      </ProCard>
    </div>
  );
}
