import { useRouter } from 'next/router';
import { Layout, Menu } from 'antd';

import css from './LayoutHeader.module.less';

const { Header } = Layout;

const menuItems = [
  {
    key: '/',
    label: 'Home'
  },
  {
    key: '/wizard',
    label: 'Create a CV'
  },
  {
    key: '/builder',
    label: 'CV Builder'
  },
  {
    key: '/about',
    label: 'About us'
  }
];

export const LayoutHeader = () => {
  const router = useRouter();

  const handleMenuClick = ({ key }: { key: string }) => {
    router.push(`${key}`);
  };

  return (
    <Header>
      <div className={css.logo} />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={menuItems} onClick={handleMenuClick} />
    </Header>
  );
};
