import { BaseCVReviewTemplateProps } from '../../CvViewer.types';
import css from './Basic.module.css';
import { TextWithHeading } from '../../TextWithHeading/TextWithHeading';
import { CVExperienceBlock } from '../../WorkBlock/CVExperienceBlock';
import { StringArrayViewer } from '../../StringArrayViewer/StringArrayViewer';
import { Avatar } from '../../Avatar/Avatar';
import { PersonalInfo } from '../../PersonalInfo/PersonalInfo';

type CvViewerProps = BaseCVReviewTemplateProps & {
  isReverse?: boolean;
};

export const Basic = ({ cv, isReverse = false }: CvViewerProps) => {
  const { personalInfo, workExperience, education, skills, hobbies } = cv;

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
            startDate={el.dateTime?.[0]}
            endDate={el.dateTime?.[1]}
            description={el.description}
          />
        ))}
        <TextWithHeading heading="Education" />
        {(education || []).map((el) => (
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
        <StringArrayViewer items={skills} />
        <TextWithHeading heading="Hobbies" />
        <StringArrayViewer items={hobbies} />
        <TextWithHeading heading="Summary" text={cv.summary} />
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
