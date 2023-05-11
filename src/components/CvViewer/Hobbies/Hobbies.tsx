import css from './Hobbies.module.css';

type HobbiesProps = {
  items: {
    name: string;
    icon: string; // url
  }[];
};

export const Hobbies = ({ items }: HobbiesProps) => {
  return (
    <div>
      {items.map((el) => (
        <div className={css.ItemWrapper} key={el.name}>
          <img src={el.icon} className={css.img} alt="" />
          <h5 className={css.title}>{el.name}</h5>
        </div>
      ))}
    </div>
  );
};
