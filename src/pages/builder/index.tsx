import { useState } from 'react';
import { ProCard } from '@ant-design/pro-components';
import { Collapse, Button } from 'antd';
import { addContext, ConversationHistory, getWorkingExperience } from '../../api/api';
import { useResumeFormContext } from '../../context/ResumeFormContext';

const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

export default function BuilderPage() {
  const [workingExperienceHistory, setWorkingExperienceHistory] = useState<ConversationHistory>([]);

  const { resumeFormData } = useResumeFormContext();

  console.log({ resumeFormData });
  const handleWorkingExperience = async () => {
    const experience = await getWorkingExperience(
      workingExperienceHistory,
      'Senior Software Engineer',
      'EPAM',
      '2021-now',
      'React, Next.js, Node.js'
    );
    setWorkingExperienceHistory((prevState) => {
      return [...prevState, { role: 'assistant', content: experience ?? '' }];
    });
  };

  const handleImproveWorkingExperience = async () => {
    const experience = await addContext(workingExperienceHistory, 'Add to my experience that I worked at MacDonalds');
    setWorkingExperienceHistory((prevState) => {
      return [...prevState, { role: 'assistant', content: experience ?? '' }];
    });
  };

  return (
    <div>
      <h1>Builder Page</h1>
      <ProCard gutter={8} style={{ marginBlockStart: 8 }}>
        <ProCard colSpan={12} layout="center">
          <Collapse defaultActiveKey={['1']}>
            <Panel header="This is panel header 1" key="1">
              <Button type="primary" size="large" onClick={handleWorkingExperience}>
                Get working experience
              </Button>
              <Button type="primary" size="large" onClick={handleImproveWorkingExperience}>
                Improve it
              </Button>
            </Panel>
            <Panel header="This is panel header 2" key="2">
              <p>{text}</p>
            </Panel>
            <Panel header="This is panel header 3" key="3">
              <p>{text}</p>
            </Panel>
          </Collapse>
        </ProCard>
        <ProCard colSpan={12} layout="center">
          <div>
            <h2>Working Experience:</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: workingExperienceHistory[workingExperienceHistory.length - 1]?.content
                  .split('\n\n')
                  .map((paragraph) => `<p>${paragraph.replace(/\n/g, '<br>')}</p>`)
                  .join('')
              }}
            />
          </div>
        </ProCard>
      </ProCard>
    </div>
  );
}
