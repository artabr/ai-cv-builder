import React, { ForwardRefExoticComponent } from 'react';

import { Row, Col } from 'antd';

import QueueAnim from 'rc-queue-anim';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';

import css from './Team.module.less';

export type TeamMember = {
  icon: {
    src: string;
  };
  title: string;
  description: string;
};

export type TeamProps = {
  items: TeamMember[];
};

export const Team = ({ items }: TeamProps) => {
  return (
    <div className={css.container}>
      <div className={css.content}>
        <div className={css.titleWrapper}>
          <h1 className={css.titleName}>产品与服务</h1>
        </div>
        <OverPack playScale={0.3}>
          <QueueAnim
            type="bottom"
            key="block"
            leaveReverse
            component={Row as ForwardRefExoticComponent<unknown>}
            className={css.blockList}
          >
            {items.map((block) => {
              const { icon, title, description } = block;
              return (
                <Col key={title} className={css.blockWraper} md={8} xs={24}>
                  <div className={css.block}>
                    <img src={icon.src} className={css.blockIcon} />
                    <h1 className={css.blockTitle}>{title}</h1>
                    <div className={css.blockDescription}>{description}</div>
                  </div>
                </Col>
              );
            })}
          </QueueAnim>
        </OverPack>
      </div>
    </div>
  );
};
