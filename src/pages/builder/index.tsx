import { useState, useRef } from 'react';

import { ProCard } from '@ant-design/pro-components';
import { DownloadOutlined } from '@ant-design/icons';
import { Collapse, Select, Button, Space } from 'antd';

import { convertToPdf } from '../../api/client/convert';
import { addContext, ConversationHistory } from '../../api/api';

import { CvViewer } from '../../components/CvViewer/CvViewer';
import { Paper } from '../../components/Paper';
import { Template } from '../../components/CvViewer/CvViewer.types';
import { MainInfoForm, AIResumeTypes } from '../../components/MainInfoForm';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { SkillsForm } from '../../components/SkillsForm';
import { setDescription, setSummary, setTemplate } from '../../features/cv/cvSlice';
import { WorkExperienceForm } from '../../components/WorkExperienceForm';
import { EducationForm } from '../../components/EducationForm';
import { generateHtmlToConvert } from '../../utils/builder.utils';

import './builder.less';

const { Panel } = Collapse;

const dontDoTemplate =
  'Please rewrite the following text with slight changes and RETURN ONLY THE REVISED TEXT and dont write me Revised Text: or Original text: ';

export default function BuilderPage() {
  const cvDataFromRedux = useAppSelector((state) => state.cv);
  const dispatch = useAppDispatch();

  const [messagesHistory, setMessagesHistory] = useState<Record<AIResumeTypes, ConversationHistory> | null>({
    profile: [{ role: 'assistant', content: '' }],
    workExperience: [{ role: 'assistant', content: '' }],
    education: [{ role: 'assistant', content: '' }],
    skills: [{ role: 'assistant', content: '' }]
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
        // setWorkResultFromAI(answer || '');
        break;
      case 'education':
        // setEducationResultFromAI(answer || '');
        break;
      case 'profile':
        dispatch(setDescription(answer || ''));
        break;
      case 'skills':
        dispatch(setSummary(answer || ''));
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

  const [isLoading, setIsLoading] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);
  const downloadLinkRef = useRef<HTMLLinkElement>(null);

  const handleDownloadPdfClick = () => {
    if (!isLoading) {
      const htmlOftemplate = targetRef.current?.innerHTML;

      if (htmlOftemplate) {
        const converToPdfAsync = async () => {
          setIsLoading(true);

          const htmlToConvert = generateHtmlToConvert(htmlOftemplate);

          const result = await convertToPdf(htmlToConvert);

          if (result) {
            const link = downloadLinkRef.current;
            link?.setAttribute('href', result);
            link?.click();
          }

          setIsLoading(false);
        };

        converToPdfAsync();
      }
    }
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
              <SkillsForm
                skills={cvDataFromRedux.skills}
                hobbies={cvDataFromRedux.hobbies}
                handleSelectChange={handleSelectChange}
                selectOptions={selectOptions}
              />
            </Panel>
          </Collapse>
        </ProCard>
        <ProCard colSpan={12} layout="center">
          <Paper targetRef={targetRef}>
            <CvViewer cv={cvDataFromRedux} />
          </Paper>
        </ProCard>
      </ProCard>

      <ProCard colspan={12} gutter={8} style={{ marginBlockStart: 8 }}>
        <Space align="end">
          <Button type="primary" icon={<DownloadOutlined />} onClick={handleDownloadPdfClick}>
            {isLoading ? 'Downloading...' : 'Download PDF'}
          </Button>
          <Button style={{ visibility: 'hidden' }} href="" target="_blank" ref={downloadLinkRef} />
        </Space>
      </ProCard>
    </div>
  );
}
