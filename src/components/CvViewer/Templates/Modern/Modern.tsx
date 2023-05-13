import cx from 'classnames';
import { TextWithHeading } from '../../TextWithHeading/TextWithHeading';
import { CVExperienceBlock } from '../../WorkBlock/CVExperienceBlock';
import { StringArrayViewer } from '../../StringArrayViewer/StringArrayViewer';
import css from './Modern.module.css';
import { PersonalInfo } from '../../PersonalInfo/PersonalInfo';
import { ModernHeader } from './ModernHeader/ModernHeader';
import { useAppSelector } from '../../../../hooks/redux';
import { getDateFromTimeStampInDay } from '../../formatters/date.formatters';

type CvViewerProps = {
  isBlack?: boolean;
};

export const Modern = ({ isBlack = false }: CvViewerProps) => {
  const { cv, chat } = useAppSelector((state) => state);

  return (
    <div className={cx(isBlack && css.black)}>
      <div>
        <ModernHeader {...cv.personalInfo} description={chat.introResultFromAI} isBlack={isBlack} />
      </div>
      <div className={css.mainBlock}>
        <PersonalInfo {...cv.personalInfo} isInline />
        <TextWithHeading heading="Work experience" />
        {(cv.workExperience || []).map((el) => (
          <CVExperienceBlock
            key={el.companyName}
            title={el.companyName}
            subtitle={el.position}
            startDate={getDateFromTimeStampInDay(el.startDate)}
            endDate={getDateFromTimeStampInDay(el.endDate)}
            description={chat.workResultFromAI}
          />
        ))}
        <TextWithHeading heading="Education" />
        {(cv.education || []).map((el) => (
          <CVExperienceBlock
            key={el.universityName}
            title={el.universityName}
            subtitle={el.speciality}
            startDate={getDateFromTimeStampInDay(el.startDate)}
            endDate={getDateFromTimeStampInDay(el.endDate)}
            description={chat.educationResultFromAI}
          />
        ))}
        <TextWithHeading heading="Skills" />
        <StringArrayViewer items={cv.skills} />
        <TextWithHeading heading="Hobbies" />
        <StringArrayViewer items={cv.hobbies} />
        {(cv.additionalBlocks || []).map((el) => (
          <TextWithHeading key={el.title} heading={el.title} text={chat.skillsResultFromAI} />
        ))}
      </div>
    </div>
  );
};
