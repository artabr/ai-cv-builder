import React from 'react';

import { Banner } from './Banner';
import { About } from './About';
import { Benefits } from './Benefits';
import { Team } from './Team';

import { mockedBenefitsList } from './Benefits/Benefits.mock';
import { mockedTeamMembersList } from './Team/Team.mock';

import { useViewportDetect } from '../../services/viewportManager';

import css from './Homepage.module.less';

export const Homepage = () => {
  const { isMobile } = useViewportDetect();
  return (
    <div className={css.container}>
      <Banner />
      <About isMobile={isMobile} />
      <Benefits items={mockedBenefitsList} isMobile={isMobile} />
      <Team items={mockedTeamMembersList} />
    </div>
  );
};
