import { ResumeViewerType } from '../../CvViewer.types';
import css from './Basic.module.css';
import { TextWithHeading } from '../../TextWithHeading/TextWithHeading';
import { WorkBlock } from '../../WorkBlock/WorkBlock';
import { Skills } from '../../Skills/Skills';
import { Hobbies } from '../../Hobbies/Hobbies';
import { Avatar } from '../../Avatar/Avatar';
import { PersonalInfo } from '../../PersonalInfo/PersonalInfo';
import { Social } from '../../Social/Social';

type CvViewerProps = {
  cv: ResumeViewerType;
  isReverse?: boolean;
};
export const Basic = ({ cv, isReverse = false }: CvViewerProps) => {
  const { personalInfo, workExperience, education, skills, hobbies, additionalBlocks } = cv;

  return (
    <div className={isReverse ? css.wrapperReverse : css.wrapper}>
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
        <Skills items={skills || []} />
        <TextWithHeading heading="Hobbies" />
        <Hobbies items={hobbies || []} />
        {(additionalBlocks || []).map((el) => (
          <TextWithHeading key={el.title} heading={el.title} text={el.description} />
        ))}
      </div>
      <div className={css.rightColumn}>
        <h2 className={css.title}>{personalInfo.fullName}</h2>
        <Avatar avatar={personalInfo.avatar} isShowAvatar={personalInfo.isShowAvatar} className={css.avatar} />
        <PersonalInfo {...personalInfo} />
        <Social {...personalInfo.social} isShowTitle={false} />
      </div>
    </div>
  );
};