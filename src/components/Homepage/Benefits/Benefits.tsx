import React from 'react';

import { Row, Col } from 'antd';

import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one/lib/TweenOne';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';

import css from './Benefits.module.less';

export type BenefitItem = {
  icon: {
    src: string;
  };
  title: string;
  description: string;
};

export type BenefitstProps = {
  items: BenefitItem[];
  isMobile?: boolean;
};

export const Benefits = ({ items, isMobile }: BenefitstProps) => {
  const getDelay = (e: number, b: number) => (e % b) * 100 + Math.floor(e / b) * 100 + b * 100;

  const children = items.map(({ icon, title, description }, i) => {
    let clearFloatNum = 0;
    const itemMd = 8;
    const itemXs = 24;
    const delay = isMobile ? i * 50 : getDelay(i, 24 / itemMd);
    const liAnim = {
      opacity: 0,
      type: 'from',
      ease: 'easeOutQuad',
      delay
    };
    const childrenAnim = { ...liAnim, x: '+=10', delay: delay + 100 };
    clearFloatNum += itemMd;
    clearFloatNum = clearFloatNum > 24 ? 0 : clearFloatNum;

    return (
      <TweenOne
        component={Col}
        animation={liAnim as any}
        key={title}
        componentProps={{ md: itemMd, xs: itemXs }}
        className={!clearFloatNum ? css.blockWithClear : css.block}
      >
        <TweenOne
          animation={{
            x: '-=10',
            opacity: 0,
            type: 'from',
            ease: 'easeOutQuad'
          }}
          className={css.blockIcon}
        >
          <img src={icon.src} width="100%" alt="img" />
        </TweenOne>
        <div className={css.blockText}>
          <TweenOne animation={childrenAnim as any} component="h2" className={css.blockTitle}>
            {title}
          </TweenOne>
          <TweenOne
            animation={{ ...childrenAnim, delay: delay + 200 } as any}
            component="div"
            className={css.blockDescription}
          >
            {description}
          </TweenOne>
        </div>
      </TweenOne>
    );
  });

  return (
    <div className={css.container}>
      <div className={css.content}>
        <div className={css.titleWrapper}>
          <h1 className={css.titleName}>蚂蚁金融云提供专业的服务</h1>
          <div className={css.titleContent}>基于阿里云强大的基础资源</div>
        </div>
        <OverPack playScale={0.3}>
          <QueueAnim type="bottom">
            <Row className={css.blockWrapper}>{children}</Row>
          </QueueAnim>
        </OverPack>
      </div>
    </div>
  );
};
