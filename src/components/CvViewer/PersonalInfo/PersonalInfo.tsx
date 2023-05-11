import cx from 'classnames';
import { getDateFromTimeStampInDay } from '../formatters/date.formatters';
import css from './PersonalInfo.module.css';

type PersonalInfoProps = {
  birthDate?: number;
  email?: string;
  phone?: string;
  address?: string;
  englishLevel?: string;
  salaryExpectation?: string;
  isInline?: boolean;
  className?: string;
};
export const PersonalInfo = ({
  birthDate,
  email,
  phone,
  address,
  englishLevel,
  salaryExpectation,
  isInline = false,
  className
}: PersonalInfoProps) => {
  return (
    <div className={cx(isInline ? css.inlineWrapper : css.wrapper, className)}>
      {birthDate && (
        <p>
          <b>Birth date: </b> {getDateFromTimeStampInDay(birthDate)}
        </p>
      )}
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
      {salaryExpectation && (
        <p>
          <b>Salary expectation: </b> {salaryExpectation}
        </p>
      )}
    </div>
  );
};
