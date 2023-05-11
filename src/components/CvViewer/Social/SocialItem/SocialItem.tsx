import css from './SocialItem.module.css';

type SocialItemProps = {
  link?: string;
  icon: string;
};

export const SocialItem = ({ link, icon }: SocialItemProps) => {
  if (!link) return null;
  return (
    <a href={link}>
      <img src={icon} className={css.img} />
    </a>
  );
};
