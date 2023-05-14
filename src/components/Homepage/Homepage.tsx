import React from 'react';

import { Banner } from './Banner';
import { About } from './About';
import { Steps } from './Steps';
import { Benefits } from './Benefits';

import { mockedStepsList } from './Steps/Steps.mock';
import { mockedBenefitsList } from './Benefits/Benefits.mock';

import { useViewportDetect } from '../../services/viewportManager';

import css from './Homepage.module.less';

export const Homepage = () => {
  const { isTabletSmallest } = useViewportDetect();
  return (
    <div className={css.container}>
      <Banner />
      <About isMobile={isTabletSmallest} />
      <Benefits items={mockedBenefitsList} />
      <Steps items={mockedStepsList} isMobile={isTabletSmallest} />
    </div>
  );
};
