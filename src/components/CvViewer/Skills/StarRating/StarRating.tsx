import css from './StartRating.module.css';

type StarRatingProps = {
  value: number;
};
export const StarRaring = ({ value }: StarRatingProps) => {
  return (
    <div className={css.starRating}>
      <span className={value >= 1 ? css.faStar : css.starRatingUnchecked} />
      <span className={value >= 2 ? css.faStar : css.starRatingUnchecked} />
      <span className={value >= 3 ? css.faStar : css.starRatingUnchecked} />
      <span className={value >= 4 ? css.faStar : css.starRatingUnchecked} />
      <span className={value >= 5 ? css.faStar : css.starRatingUnchecked} />
    </div>
  );
};
