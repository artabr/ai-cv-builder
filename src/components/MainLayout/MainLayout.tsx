import React from 'react';
import { Layout } from 'antd';
import { LayoutHeader } from '../LayoutHeader';

import css from './MainLayout.module.less';

const { Content, Footer } = Layout;

export const MainLayout = (props: React.PropsWithChildren<unknown>) => {
  return (
    <Layout className="layout">
      <LayoutHeader />
      <Content style={{ padding: '0 50px' }}>
        <div className={css.siteLayoutContent}>{props.children}</div>
      </Content>
      <Footer style={{ textAlign: 'center' }} className={css.footer}>
        AI CV Builder
      </Footer>
    </Layout>
  );
};
