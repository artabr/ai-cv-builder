/* eslint-disable */
import githubIcon from './Icons/github.png';
import linkedinIcon from './Icons/linkedin.png';
import facebookIcon from './Icons/facebook.png';
import twitterIcon from './Icons/twitter.png';
import insttagrammIcon from './Icons/instagram.png';
import youtubeIcon from './Icons/youtube.png';
import websiteIcon from './Icons/website.png';
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
};

export const Social = ({ github, linkedin, facebook, twitter, instagram, youtube, website }: SocialProps) => {
  return <p>social icons</p>;
  // return (
  //   <div>
  //     <h3>Social</h3>
  //     <div className={css.iconsWrapper}>
  //       <SocialItem link={github} icon={githubIcon} />
  //       <SocialItem link={linkedin} icon={linkedinIcon} />
  //       <SocialItem link={facebook} icon={facebookIcon} />
  //       <SocialItem link={twitter} icon={twitterIcon} />
  //       <SocialItem link={instagram} icon={insttagrammIcon} />
  //       <SocialItem link={youtube} icon={youtubeIcon} />
  //       <SocialItem link={website} icon={websiteIcon} />
  //     </div>
  //   </div>
  // );
};
