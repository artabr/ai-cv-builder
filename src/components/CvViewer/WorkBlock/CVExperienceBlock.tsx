import { TextWithHeading } from '../TextWithHeading/TextWithHeading';
import css from './CVExperienceBlock.module.css';

type WorkBlockProps = {
  title: string;
  subtitle: string;
  description: string;
  startDate: number | string; // timestamp
  endDate: number | string; // timestamp
};

export const CVExperienceBlock = ({ title, subtitle, description, startDate = '', endDate = '' }: WorkBlockProps) => {
  const time = `${startDate} / ${endDate}`;

  return (
    <div className={css.wrapper}>
      <div className={css.heading}>
        <h4 className={css.title}>{title}</h4>
        <span className={css.time}>{time}</span>
      </div>
      <p>
        <i>{subtitle}</i>
      </p>
      <TextWithHeading text={description} isSmallHeading isHrShow={false} />
    </div>
  );
};
