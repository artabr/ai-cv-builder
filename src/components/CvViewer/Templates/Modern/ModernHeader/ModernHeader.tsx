import cx from 'classnames';

import { Avatar } from '../../../Avatar/Avatar';
import css from './ModernHeader.module.css';
import { TextWithHeading } from '../../../TextWithHeading/TextWithHeading';

type ModernHeaderProps = {
  avatar?: string;
  isShowAvatar?: boolean;
  description?: string;
  fullName?: string;
  isBlack?: boolean;
  className?: string;
  jobTitle?: string;
};
export const ModernHeader = ({
  isBlack = false,
  avatar,
  isShowAvatar,
  description,
  fullName,
  jobTitle,
  className
}: ModernHeaderProps) => {
  return (
    <div
      className={cx(
        isBlack ? css.blackWrapper : css.wrapper,
        isShowAvatar ? css.withAvatar : css.withoutAvatar,
        className
      )}
    >
      <Avatar avatar={avatar} isShowAvatar={isShowAvatar} className={css.avatar} />
      <div>
        <h2>{fullName}</h2>
        {jobTitle && <h3>{jobTitle}</h3>}
        <TextWithHeading text={description} />
      </div>
    </div>
  );
};
