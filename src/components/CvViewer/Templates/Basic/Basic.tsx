import css from './Basic.module.css';
import { TextWithHeading } from '../../TextWithHeading/TextWithHeading';
import { CVExperienceBlock } from '../../WorkBlock/CVExperienceBlock';
import { StringArrayViewer } from '../../StringArrayViewer/StringArrayViewer';
import { Avatar } from '../../Avatar/Avatar';
import { PersonalInfo } from '../../PersonalInfo/PersonalInfo';
import { useAppSelector } from '../../../../hooks/redux';
import { getDateFromTimeStampInDay } from '../../formatters/date.formatters';

type CvViewerProps = {
  isReverse?: boolean;
};

export const Basic = ({ isReverse = false }: CvViewerProps) => {
  const { cv, chat } = useAppSelector((state) => state);
  const { personalInfo, workExperience, education, skills, hobbies, additionalBlocks } = cv;

  return (
    <div className={isReverse ? css.wrapperReverse : css.wrapper}>
      <div className={css.leftBlock}>
        <TextWithHeading heading="Description" text={personalInfo.description} />
        <TextWithHeading heading="Work experience" />
        {(workExperience || []).map((el) => (
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
        {(education || []).map((el) => (
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
        <StringArrayViewer items={skills} />
        <TextWithHeading heading="Hobbies" />
        <StringArrayViewer items={hobbies} />
        {(additionalBlocks || []).map((el) => (
          <TextWithHeading key={el.title} heading={el.title} text={el.description} />
        ))}
      </div>
      <div className={css.rightColumn}>
        <h2 className={css.title}>{personalInfo.fullName}</h2>
        {personalInfo.jobTitle && <h3 className={css.subTitle}>{personalInfo.jobTitle}</h3>}
        <Avatar avatar={personalInfo.avatar} isShowAvatar={personalInfo.isShowAvatar} className={css.avatar} />
        <PersonalInfo {...personalInfo} />
      </div>
    </div>
  );
};
