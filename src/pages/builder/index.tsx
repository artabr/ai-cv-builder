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
import './builder.less';

const { Panel } = Collapse;

const dontDoTemplate =
  'Please rewrite the following text with slight changes and RETURN ONLY THE REVISED TEXT and dont write me Revised Text:';

export default function BuilderPage() {
  const { cvData, setCvData } = useCvContext();
  const {
    introSectionFormData: { name, country, job },
    skillsSectionFormData: { skills, hobbies },
    workSectionFormData: { employer, position, dateTime, remark },
    educationSectionFormData: { institution, field, studyDateTime, studyRemark }
  } = useResumeFormContext();
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
