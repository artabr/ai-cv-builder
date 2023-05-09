import { ProCard } from '@ant-design/pro-components';
import { Collapse } from 'antd';

const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

export default function BuilderPage() {
  return (
    <div>
      <h1>Builder Page</h1>
      <ProCard gutter={8} style={{ marginBlockStart: 8 }}>
        <ProCard colSpan={12} layout="center">
          <Collapse defaultActiveKey={['1']}>
            <Panel header="This is panel header 1" key="1">
              <p>{text}</p>
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
          colSpan-6
        </ProCard>
      </ProCard>
    </div>
  );
}
