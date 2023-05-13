import cx from 'classnames';
import { ResumeViewerType } from '../../CvViewer.types';
import { TextWithHeading } from '../../TextWithHeading/TextWithHeading';
import { CVExperienceBlock } from '../../WorkBlock/CVExperienceBlock';
import { StringArrayViewer } from '../../StringArrayViewer/StringArrayViewer';
import css from './Modern.module.css';
import { PersonalInfo } from '../../PersonalInfo/PersonalInfo';
import { ModernHeader } from './ModernHeader/ModernHeader';
import { useResumeFormContext } from '../../../../context/ResumeFormContext';

type CvViewerProps = {
  cv: ResumeViewerType;
  isBlack?: boolean;
};

export const Modern = ({ cv, isBlack = false }: CvViewerProps) => {
  const {
    workSectionFormData: { employer = '', position = '', dateTime = [] },
    educationSectionFormData: { institution = '', field = '', studyDateTime = [] },
    workResultFromAI,
    educationResultFromAI
  } = useResumeFormContext();

  return (
    <div className={cx(isBlack && css.black)}>
      <div>
        <ModernHeader {...cv.personalInfo} isBlack={isBlack} />
      </div>
      <div className={css.mainBlock}>
        <PersonalInfo {...cv.personalInfo} isInline />
        <TextWithHeading heading="Work experience" />
        <CVExperienceBlock
          title={employer}
          subtitle={position}
          startDate={dateTime[0]}
          endDate={dateTime[1]}
          description={workResultFromAI}
        />
        <TextWithHeading heading="Education" />
        <CVExperienceBlock
          title={institution}
          subtitle={field}
          startDate={studyDateTime[0]}
          endDate={studyDateTime[1]}
          description={educationResultFromAI}
        />
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
