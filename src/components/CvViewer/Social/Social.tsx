import { SocialItem } from './SocialItem/SocialItem';
import css from './Social.module.css';

type SocialProps = {
  github?: string;
  linkedin?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  youtube?: string;
  website?: string;
  isShowTitle?: boolean;
};

export const Social = ({
  github,
  linkedin,
  facebook,
  twitter,
  instagram,
  youtube,
  website,
  isShowTitle = true
}: SocialProps) => {
  return (
    <div>
      {isShowTitle && <h3>Social</h3>}
      <div className={css.iconsWrapper}>
        <SocialItem link={github} icon="/Icons/github.png" />
        <SocialItem link={linkedin} icon="/Icons/linkedin.png" />
        <SocialItem link={facebook} icon="/Icons/facebook.png" />
        <SocialItem link={twitter} icon="/Icons/twitter.png" />
        <SocialItem link={instagram} icon="/Icons/instagram.png" />
        <SocialItem link={youtube} icon="/Icons/youtube.png" />
        <SocialItem link={website} icon="/Icons/website.png" />
      </div>
    </div>
  );
};
