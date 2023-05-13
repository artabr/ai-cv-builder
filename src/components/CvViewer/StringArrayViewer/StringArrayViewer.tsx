import css from './StringArrayViewer.module.css';

type HobbiesProps = {
  items?: string[];
};

export const StringArrayViewer = ({ items = [] }: HobbiesProps) => {
  return (
    <div>
      {items.map((el) => (
        <h5 className={css.title} key={el}>
          {el}
        </h5>
      ))}
    </div>
  );
};
