import cx from 'classnames';
import { ResumeViewerType } from '../../CvViewer.types';
import { TextWithHeading } from '../../TextWithHeading/TextWithHeading';
import { WorkBlock } from '../../WorkBlock/WorkBlock';
import { Skills } from '../../Skills/Skills';
import { Hobbies } from '../../Hobbies/Hobbies';
import { Social } from '../../Social/Social';
import css from './Modern.module.css';
import { PersonalInfo } from '../../PersonalInfo/PersonalInfo';
import { ModernHeader } from './ModernHeader/ModernHeader';

type CvViewerProps = {
  cv: ResumeViewerType;
  isBlack?: boolean;
};

export const Modern = ({ cv, isBlack = false }: CvViewerProps) => {
  return (
    <div className={cx(isBlack && css.black)}>
      <div>
        <ModernHeader {...cv.personalInfo} isBlack={isBlack} />
      </div>
      <div className={css.personalInfo}>
        <PersonalInfo {...cv.personalInfo} isInline />
      </div>
      <div className={css.mainBlock}>
        <div>
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
        <Social {...cv.personalInfo.social} isShowTitle={false} />
      </div>
    </div>
  );
};
