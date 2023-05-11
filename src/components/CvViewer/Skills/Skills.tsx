import { StarRaring } from './StarRating/StarRating';
import css from './Skills.module.css';

type SkillsProps = {
  items: {
    name: string;
    level: number; // 1-5m or in percent from 0 to 100
  }[];
};

export const Skills = ({ items }: SkillsProps) => {
  return (
    <div>
      {items.map((el) => (
        <div className={css.ItemWrapper} key={el.name}>
          <h5 className={css.title}>{el.name}</h5> <StarRaring value={el.level} />
        </div>
      ))}
    </div>
  );
};
