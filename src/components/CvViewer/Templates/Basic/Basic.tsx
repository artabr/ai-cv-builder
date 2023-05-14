import { BaseCVReviewTemplateProps } from '../../CvViewer.types';
import css from './Basic.module.css';
import { TextWithHeading } from '../../TextWithHeading/TextWithHeading';
import { WorkBlock } from '../../WorkBlock/WorkBlock';
import { StringArrayViewer } from '../../StringArrayViewer/StringArrayViewer';
import { Avatar } from '../../Avatar/Avatar';
import { PersonalInfo } from '../../PersonalInfo/PersonalInfo';

type CvViewerProps = BaseCVReviewTemplateProps & {
  isReverse?: boolean;
};

export const Basic = ({ cv, isReverse = false, targetRef }: CvViewerProps) => {
  const { personalInfo, workExperience, education, skills, hobbies, additionalBlocks } = cv;

  return (
    <div className={isReverse ? css.wrapperReverse : css.wrapper} ref={targetRef}>
      <div className={css.leftBlock}>
        <TextWithHeading heading="Description" text={personalInfo.description} />
        <TextWithHeading heading="Work experience" />
        {(workExperience || []).map((el) => (
          <WorkBlock key={el.companyName} {...el} />
        ))}
        <TextWithHeading heading="Education" />
        {(education || []).map((el) => (
          <WorkBlock
            key={el.universityName}
            companyName={el.universityName}
            position={el.speciality}
            isCurrentWork={el.isCurrentEducation}
            {...el}
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
