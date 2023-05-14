import css from './Paper.module.less';

type PaperProps = React.PropsWithChildren & {
  targetRef?: React.RefObject<HTMLDivElement>;
};

export const Paper = ({ targetRef, children }: PaperProps) => (
  <div className={css.paper} ref={targetRef}>
    {children}
  </div>
);
