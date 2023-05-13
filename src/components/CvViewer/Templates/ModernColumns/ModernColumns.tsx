import cx from 'classnames';
import css from './ModernColumns.module.css';
import { ModernHeader } from '../Modern/ModernHeader/ModernHeader';
import { PersonalInfo } from '../../PersonalInfo/PersonalInfo';
import { TextWithHeading } from '../../TextWithHeading/TextWithHeading';
import { CVExperienceBlock } from '../../WorkBlock/CVExperienceBlock';
import { StringArrayViewer } from '../../StringArrayViewer/StringArrayViewer';
import { getDateFromTimeStampInDay } from '../../formatters/date.formatters';
import { useAppSelector } from '../../../../hooks/redux';

type ModernColumnsProps = {
  isBlack?: boolean;
};

export const ModernColumns = ({ isBlack = false }: ModernColumnsProps) => {
  const { cv, chat } = useAppSelector((state) => state);

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
            <TextWithHeading key={el.title} heading={el.title} text={el.description} />
          ))}
        </div>
      </div>
    </div>
  );
};
