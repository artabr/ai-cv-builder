import { useState } from 'react';
import {
  ProCard,
  ProFormDateRangePicker,
  ProFormText,
  ProFormTextArea,
  ProForm,
  ProFormList,
  ProFormGroup,
  ProFormSelect
} from '@ant-design/pro-components';
import { Collapse, Select } from 'antd';
import { CvViewer } from '../../components/CvViewer/CvViewer';
import { useCvContext } from '../../context/CvContext';
import { Paper } from '../../components/Paper';
import { useResumeFormContext } from '../../context/ResumeFormContext';
import { Template } from '../../components/CvViewer/CvViewer.types';
import { addContext, ConversationHistory } from '../../api/api';
import './builder.less';

const { Panel } = Collapse;

const dontDoTemplate =
  'Please rewrite the following text with slight changes and RETURN ONLY THE REVISED TEXT and dont write me Revised Text:';

type AIResumeTypes = 'workExperience' | 'education';

export default function BuilderPage() {
  const { cvData, setCvData } = useCvContext();
  const {
    introSectionFormData: { name, country, job },
    skillsSectionFormData: { skills, hobbies },
    workSectionFormData: { employer, position, dateTime, remark },
    educationSectionFormData: { institution, field, studyDateTime, studyRemark }
  } = useResumeFormContext();
  const [messagesHistory, setMessagesHistory] = useState<Record<AIResumeTypes, ConversationHistory> | null>({
    workExperience: [{ role: 'assistant', content: cvData.workExperience?.[0].description ?? '' }],
    education: [{ role: 'assistant', content: cvData.education?.[0].description ?? '' }]
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
    setCvData({ ...cvData, [context]: [{ ...cvData[context][0], description: answer }] || [] });
  };

  const handleChange = async (value: string, context: AIResumeTypes = 'workExperience') => {
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
          onChange={(value) => setCvData({ ...cvData, template: value })}
          value={cvData.template}
        />
      </div>
      <ProCard gutter={8} style={{ marginBlockStart: 8 }}>
        <ProCard colSpan={12} layout="center">
          <Collapse style={{ width: '100%' }} defaultActiveKey={['1']}>
            <Panel header="Main info" key="1">
              <ProForm
                onFinish={async (values) => {
                  console.log('Received values of form:', values);
                }}
                initialValues={{ name, job, country, skills, hobbies }}
              >
                <ProFormText name="name" label="Your name" width="md" placeholder="John Doe" />
                <ProFormText name="job" label="What's your job?" width="md" placeholder="Software Engineer" />
                <ProFormText name="country" label="Where do you live?" width="md" placeholder="Planet Earth" />
                <ProFormSelect mode="tags" name="skills" label="Your key skills" placeholder="React, TypeScript" />
                <ProFormSelect mode="tags" name="hobbies" label="Your hobbies" placeholder="Music, Sports, Traveling" />
              </ProForm>
            </Panel>
            <Panel header="Work experience" key="2">
              <ProForm
                onFinish={async (values) => {
                  console.log('Received values of form:', values);
                }}
              >
                <ProFormList
                  name="users"
                  creatorButtonProps={{
                    position: 'bottom',
                    creatorButtonText: 'Add new work experience'
                  }}
                  initialValue={[{ employer, position, dateTime, remark }]}
                >
                  <ProFormGroup key="group">
                    <ProFormText name="employer" label="Your last employer" width="md" placeholder="EPAM" />
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
                  </ProFormGroup>
                </ProFormList>
              </ProForm>
              <Select
                placeholder="Customize your experience"
                style={{ width: 200, marginTop: 20 }}
                onChange={(value) => handleChange(value, 'workExperience')}
                options={selectOptions}
              />
            </Panel>
            <Panel header="Education" key="3">
              <ProForm
                onFinish={async (values) => {
                  console.log('Received values of form:', values);
                }}
              >
                <ProFormList
                  name="users"
                  creatorButtonProps={{
                    position: 'bottom',
                    creatorButtonText: 'Add new education'
                  }}
                  initialValue={[{ institution, field, studyDateTime, studyRemark }]}
                >
                  <ProFormGroup key="group">
                    <ProFormText name="institution" label="Where did you study?" width="md" placeholder="MIT" />
                    <ProFormText name="field" label="Field of study?" width="md" placeholder="Computer Science" />
                    <ProFormDateRangePicker name="studyDateTime" label="Period of education" />
                    <ProFormTextArea
                      name="studyRemark"
                      label="Key points about your education"
                      width="lg"
                      placeholder="In short phrases tell us about what you did there"
                    />
                  </ProFormGroup>
                </ProFormList>
              </ProForm>
            </Panel>
          </Collapse>
        </ProCard>
        <ProCard colSpan={12} layout="center">
          <Paper>
            <CvViewer cv={cvData} />
          </Paper>
        </ProCard>
      </ProCard>
    </div>
  );
}
