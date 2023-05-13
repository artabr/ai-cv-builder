import { Typography } from 'antd';
import css from './UserCard.module.css';

type UserCardProps = {
  name: string;
  title: string;
  avatar: string;
  mail: string;
};

export const UserCard = ({ name, avatar, mail, title }: UserCardProps) => {
  const { Title, Paragraph } = Typography;

  return (
    <div className={css.wrapper}>
      <img src={avatar} className={css.avatar} />
      <div className={css.info}>
        <Title level={4}>{name}</Title> <Paragraph>{title}</Paragraph>
        <a href={`mailto:${mail}`}>{mail}</a>
      </div>
    </div>
  );
};
