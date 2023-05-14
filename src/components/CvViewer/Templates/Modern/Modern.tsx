import cx from 'classnames';
import { BaseCVReviewTemplateProps } from '../../CvViewer.types';
import { TextWithHeading } from '../../TextWithHeading/TextWithHeading';
import { WorkBlock } from '../../WorkBlock/WorkBlock';
import { StringArrayViewer } from '../../StringArrayViewer/StringArrayViewer';
import css from './Modern.module.css';
import { PersonalInfo } from '../../PersonalInfo/PersonalInfo';
import { ModernHeader } from './ModernHeader/ModernHeader';

type CvViewerProps = BaseCVReviewTemplateProps & {
  isBlack?: boolean;
};

export const Modern = ({ cv, isBlack = false, targetRef }: CvViewerProps) => {
  return (
    <div className={cx(isBlack && css.black)} ref={targetRef}>
      <div>
        <ModernHeader {...cv.personalInfo} isBlack={isBlack} />
      </div>
      <div className={css.mainBlock}>
        <PersonalInfo {...cv.personalInfo} isInline />
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
        <StringArrayViewer items={cv.skills} />
        <TextWithHeading heading="Hobbies" />
        <StringArrayViewer items={cv.hobbies} />
        {(cv.additionalBlocks || []).map((el) => (
          <TextWithHeading key={el.title} heading={el.title} text={el.description} />
        ))}
      </div>
    </div>
  );
};
