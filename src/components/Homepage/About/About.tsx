import React, { ForwardRefExoticComponent } from 'react';

import { Row, Col } from 'antd';

import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one/lib/TweenOne';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';

import css from './About.module.less';

export type AboutProps = {
  isMobile?: boolean;
};

export const About = ({ isMobile }: AboutProps) => {
  const queueAnimType = isMobile ? 'bottom' : 'right';

  const tweenOneAnimation = isMobile
    ? {
        scaleY: '+=0.3',
        opacity: 0,
        type: 'from',
        ease: 'easeOutQuad'
      }
    : {
        x: '-=30',
        opacity: 0,
        type: 'from',
        ease: 'easeOutQuad'
      };

  return (
    <div className={css.container}>
      <OverPack className={css.content} playScale={0.3} component={Row as unknown as React.ReactNode}>
        <TweenOne
          animation={tweenOneAnimation as any}
          resetStyle
          className={css.image}
          component={Col}
          componentProps={{
            md: 10,
            xs: 24
          }}
        >
          <span>
            <img src="https://zos.alipayobjects.com/rmsportal/nLzbeGQLPyBJoli.png" width="100%" alt="img" />
          </span>
        </TweenOne>
        <QueueAnim
          type={queueAnimType}
          leaveReverse
          ease={['easeOutQuad', 'easeInQuad']}
          className={css.text}
          component={Col as ForwardRefExoticComponent<unknown>}
          componentProps={{
            md: 14,
            xs: 24
          }}
        >
          <h2 className={css.textTitle}>企业资源管理</h2>
          <div className={css.textContent}>
            云资源集中编排、弹性伸缩、持续发布和部署，高可用及容灾。云资源集中编排、弹性伸缩、持续发布和部署，高可用及容灾。云资源集中编排、弹性伸缩、持续发布和部署，高可用及容灾
          </div>
        </QueueAnim>
      </OverPack>
    </div>
  );
};
