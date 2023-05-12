import css from './Paper.module.less';

export const Paper = (props: React.PropsWithChildren) => <div className={css.paper}>{props.children}</div>;
