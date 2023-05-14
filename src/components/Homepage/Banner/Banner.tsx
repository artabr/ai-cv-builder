import React from 'react';

import { useRouter } from 'next/router';

import { Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one/lib/TweenOne';

import css from './Banner.module.less';

export const Banner = () => {
  const router = useRouter();

  return (
    <div className={css.container}>
      <QueueAnim type={['bottom', 'top']} delay={200} className={css.textWrapper}>
        <div className={css.image}>
          <img src="images/logo_svg.svg" width="100%" alt="img" />
        </div>
        <div className={css.title}>Resumesaurus Rexes</div>
        <Button ghost className={css.button} onClick={() => router.push('/wizard')}>
          Create a CV
        </Button>
      </QueueAnim>
      <TweenOne
        animation={{
          y: '-=20',
          yoyo: true,
          repeat: -1,
          duration: 1000
        }}
        className={css.icon}
      >
        <DownOutlined />
      </TweenOne>
    </div>
  );
};
