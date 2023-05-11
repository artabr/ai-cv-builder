import css from './TwextWithHeading.module.css';

type TextWithHeadingProps = {
  heading?: string;
  text?: string;
  isSmallHeading?: boolean;
  isHrShow?: boolean;
};

export const TextWithHeading = ({ heading, text, isSmallHeading, isHrShow = true }: TextWithHeadingProps) => {
  return (
    <div className={css.wrapper}>
      {heading && !isSmallHeading && <h3 className={css.disableMargin}>{heading}</h3>}
      {heading && isSmallHeading && <h5 className={css.disableMargin}>{heading}</h5>}
      {isHrShow && <hr />}
      {text && <p>{text}</p>}
    </div>
  );
};
