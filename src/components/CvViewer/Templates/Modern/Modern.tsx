import cx from 'classnames';
import { ResumeViewerType } from '../../CvViewer.types';
import { TextWithHeading } from '../../TextWithHeading/TextWithHeading';
import { CVExperienceBlock } from '../../WorkBlock/CVExperienceBlock';
import { StringArrayViewer } from '../../StringArrayViewer/StringArrayViewer';
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
      <div className={css.mainBlock}>
        <PersonalInfo {...cv.personalInfo} isInline />
        <TextWithHeading heading="Work experience" />
        {(cv.workExperience || []).map((el) => (
          <CVExperienceBlock
            key={el.companyName}
            title={el.companyName}
            subtitle={el.position}
            startDate={el.startDate}
            endDate={el.endDate}
            description={el.description}
          />
        ))}
        <TextWithHeading heading="Education" />
        {(cv.education || []).map((el) => (
          <CVExperienceBlock
            key={el.universityName}
            title={el.universityName}
            subtitle={el.speciality}
            startDate={el.startDate}
            endDate={el.endDate}
            description={el.description}
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
