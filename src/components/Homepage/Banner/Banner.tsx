import React from 'react';

import { Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one/lib/TweenOne';

import css from './Banner.module.less';

export const Banner = () => (
  <div className={css.container}>
    <QueueAnim type={['bottom', 'top']} delay={200} className={css.textWrapper}>
      <div className={css.title}>
        <img src="https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png" width="100%" alt="img" />
      </div>
      <div className={css.content}>一个高效的页面动画解决方案</div>
      <Button ghost className={css.button}>
        Learn More
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
