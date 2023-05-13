import cx from 'classnames';
import css from './PersonalInfo.module.css';

type PersonalInfoProps = {
  email?: string;
  phone?: string;
  address?: string;
  englishLevel?: string;
  isInline?: boolean;
  className?: string;
};
export const PersonalInfo = ({
  email,
  phone,
  address,
  englishLevel,
  isInline = false,
  className
}: PersonalInfoProps) => {
  return (
    <div className={cx(isInline ? css.inlineWrapper : css.wrapper, className)}>
      {email && (
        <p>
          <b>E-mail: </b> {email}
        </p>
      )}
      {phone && (
        <p>
          <b>Phone: </b> {phone}
        </p>
      )}
      {address && (
        <p>
          <b>Adress: </b> {address}
        </p>
      )}
      {englishLevel && (
        <p>
          <b>EN level: </b> {englishLevel}
        </p>
      )}
    </div>
  );
};
