import cx from 'classnames';
import css from './ModernColumns.module.css';
import { ModernHeader } from '../Modern/ModernHeader/ModernHeader';
import { PersonalInfo } from '../../PersonalInfo/PersonalInfo';
import { TextWithHeading } from '../../TextWithHeading/TextWithHeading';
import { WorkBlock } from '../../WorkBlock/WorkBlock';
import { StringArrayViewer } from '../../StringArrayViewer/StringArrayViewer';
import { BaseCVReviewTemplateProps } from '../../CvViewer.types';

type ModernColumnsProps = BaseCVReviewTemplateProps & {
  isBlack?: boolean;
};

export const ModernColumns = ({ cv, isBlack = false, targetRef }: ModernColumnsProps) => {
  return (
    <div className={cx(isBlack && css.black)} ref={targetRef}>
      <div>
        <ModernHeader
          {...cv.personalInfo}
          isBlack={isBlack}
          className={cx(isBlack ? css.lawrenciumBackground : css.goldBackground)}
        />
      </div>
      <div className={css.mainBlock}>
        <PersonalInfo {...cv.personalInfo} className={cx(isBlack ? css.personalInfoBlack : css.personalInfo)} />
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
          <StringArrayViewer items={cv.skills} />
          <TextWithHeading heading="Hobbies" />
          <StringArrayViewer items={cv.hobbies} />
          {(cv.additionalBlocks || []).map((el) => (
            <TextWithHeading key={el.title} heading={el.title} text={el.description} />
          ))}
        </div>
      </div>
    </div>
  );
};
