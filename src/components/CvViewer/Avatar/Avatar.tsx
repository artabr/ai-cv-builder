type AvatarProps = {
  avatar?: string;
  isShowAvatar?: boolean;
  className?: string;
};

export const Avatar = ({ avatar, isShowAvatar, className }: AvatarProps) => {
  if (!isShowAvatar || !avatar) return null;
  return <img src={`data:image/png;base64,${avatar}`} className={className} />;
};
