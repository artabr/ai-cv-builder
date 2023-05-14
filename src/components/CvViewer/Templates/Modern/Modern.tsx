import cx from 'classnames';
import { BaseCVReviewTemplateProps } from '../../CvViewer.types';
import { TextWithHeading } from '../../TextWithHeading/TextWithHeading';
import { CVExperienceBlock } from '../../WorkBlock/CVExperienceBlock';
import { StringArrayViewer } from '../../StringArrayViewer/StringArrayViewer';
import css from './Modern.module.css';
import { PersonalInfo } from '../../PersonalInfo/PersonalInfo';
import { ModernHeader } from './ModernHeader/ModernHeader';

type CvViewerProps = BaseCVReviewTemplateProps & {
  isBlack?: boolean;
};

export const Modern = ({ cv, isBlack = false, targetRef }: CvViewerProps) => {
  console.log(cv);
  return (
    <div className={cx(isBlack && css.black)} ref={targetRef}>
      <div>
        <ModernHeader {...cv.personalInfo} isBlack={isBlack} />
      </div>
      <div className={css.mainBlock}>
        <PersonalInfo {...cv.personalInfo} isInline />
        <TextWithHeading heading="Work experience" />
        {(cv.workExperience || []).map((el) => (
          <CVExperienceBlock
            key={el.companyName}
            title={el.companyName}
            subtitle={el.position}
            startDate={el.dateTime?.[0]}
            endDate={el.dateTime?.[1]}
            description={el.description}
          />
        ))}
        <TextWithHeading heading="Education" />
        {(cv.education || []).map((el) => (
          <CVExperienceBlock
            key={el.universityName}
            title={el.universityName}
            subtitle={el.speciality}
            startDate={el.dateTime?.[0]}
            endDate={el.dateTime?.[1]}
            description={el.description}
          />
        ))}
        <TextWithHeading heading="Skills" />
        <StringArrayViewer items={cv.skills} />
        <TextWithHeading heading="Hobbies" />
        <StringArrayViewer items={cv.hobbies} />
        <TextWithHeading heading="Summary" text={cv.summary} />
      </div>
    </div>
  );
};
