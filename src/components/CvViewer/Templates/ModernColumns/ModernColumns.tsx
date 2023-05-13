import cx from 'classnames';
import css from './ModernColumns.module.css';
import { ModernHeader } from '../Modern/ModernHeader/ModernHeader';
import { PersonalInfo } from '../../PersonalInfo/PersonalInfo';
import { TextWithHeading } from '../../TextWithHeading/TextWithHeading';
import { CVExperienceBlock } from '../../WorkBlock/CVExperienceBlock';
import { StringArrayViewer } from '../../StringArrayViewer/StringArrayViewer';
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
        <PersonalInfo {...cv.personalInfo} className={cx(isBlack ? css.personalInfoBlack : css.personalInfo)} />
        <div className={css.mainContent}>
          <TextWithHeading heading="Work experience" />
          {(cv.workExperience || []).map((el) => (
            <CVExperienceBlock key={el.companyName} {...el} />
          ))}
          <TextWithHeading heading="Education" />
          {(cv.education || []).map((el) => (
            <CVExperienceBlock
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
