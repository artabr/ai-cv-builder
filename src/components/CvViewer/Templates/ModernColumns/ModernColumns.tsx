import cx from 'classnames';

import css from './ModernColumns.module.css';
import { ModernHeader } from '../Modern/ModernHeader/ModernHeader';
import { PersonalInfo } from '../../PersonalInfo/PersonalInfo';
import { TextWithHeading } from '../../TextWithHeading/TextWithHeading';
import { WorkBlock } from '../../WorkBlock/WorkBlock';
import { Skills } from '../../Skills/Skills';
import { Hobbies } from '../../Hobbies/Hobbies';
import { Social } from '../../Social/Social';
import { ResumeViewerType } from '../../CvViewer.types';

type ModernColumnsProps = {
  cv: ResumeViewerType;
  isBlack?: boolean;
};

export const ModernColumns = ({ cv, isBlack = false }: ModernColumnsProps) => {
  return (
    <div className={cx(isBlack && css.black)}>
      <div>
        <ModernHeader
          {...cv.personalInfo}
          isBlack={isBlack}
          className={cx(isBlack ? css.lawrenciumBackground : css.goldBackground)}
        />
      </div>
      <div className={css.mainBlock}>
        <PersonalInfo
          {...cv.personalInfo}
          isInline
          className={cx(isBlack ? css.personalInfoBlack : css.personalInfo)}
        />
        <div className={css.mainContent}>
          <TextWithHeading heading="Work experience" />
          {(cv.workExperience || []).map((el) => (
            <WorkBlock key={el.companyName} {...el} />
          ))}
          <TextWithHeading heading="Education" />
          {(cv.education || []).map((el) => (
            <WorkBlock
              key={el.universityName}
              companyName={el.universityName}
              position={el.speciality}
              isCurrentWork={el.isCurrentEducation}
              {...el}
            />
          ))}
          <TextWithHeading heading="Skills" />
          <Skills items={cv.skills || []} />
          <TextWithHeading heading="Hobbies" />
          <Hobbies items={cv.hobbies || []} />
          {(cv.additionalBlocks || []).map((el) => (
            <TextWithHeading key={el.title} heading={el.title} text={el.description} />
          ))}
        </div>
        <div className={css.social}>
          <Social {...cv.personalInfo.social} isShowTitle={false} />
        </div>
      </div>
    </div>
  );
};
