import { useState } from 'react';
import { ProCard } from '@ant-design/pro-components';
import { Collapse, Button } from 'antd';
import { addContext, ConversationHistory, getWorkingExperience } from '../../api/api';
import { useResumeFormContext } from '../../context/ResumeFormContext';
import { EditForm } from '../../components/EditForm/EditForm';
import { CvViewer } from '../../components/CvViewer/CvViewer';
import { useCvContext } from '../../context/CvContext';

const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

export default function BuilderPage() {
  const { cvData } = useCvContext();
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
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1200px' }}>
      <div style={{ border: '1px solid red', width: '100%', height: '100%' }}>
        <EditForm />
      </div>
      <div style={{ border: '1px solid red', width: '100%', height: '100%' }}>
        <CvViewer cv={cvData} />
      </div>
    </div>
  );
}
