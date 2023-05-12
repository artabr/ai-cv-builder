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
import { Collapse } from 'antd';
import { EditForm } from '../../components/EditForm/EditForm';
import { CvViewer } from '../../components/CvViewer/CvViewer';
import { useCvContext } from '../../context/CvContext';
import { Paper } from '../../components/Paper/Paper';

const { Panel } = Collapse;

export default function BuilderPage() {
  const { cvData } = useCvContext();

  return (
    <div>
      <h1>Builder Page</h1>
      <ProCard gutter={8} style={{ marginBlockStart: 8 }}>
        <ProCard colSpan={12} layout="center">
          <Collapse style={{ width: '100%' }} defaultActiveKey={['1']}>
            <Panel header="Main info" key="1">
              <ProForm
                onFinish={async (values) => {
                  console.log('Received values of form:', values);
                }}
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
                >
                  <ProFormGroup key="group">
                    <ProFormText name="name" label="Your name" width="md" placeholder="John Doe" />
                    <ProFormText name="job" label="What's your job?" width="md" placeholder="Software Engineer" />
                    <ProFormText name="country" label="Where do you live?" width="md" placeholder="Planet Earth" />
                  </ProFormGroup>
                </ProFormList>
              </ProForm>
            </Panel>
            <Panel header="Old form" key="4">
              <EditForm />
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
