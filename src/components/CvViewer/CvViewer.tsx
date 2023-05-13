import { Template } from './CvViewer.types';
import { Basic } from './Templates/Basic/Basic';
import { Modern } from './Templates/Modern/Modern';
import { ModernColumns } from './Templates/ModernColumns/ModernColumns';
import { useAppSelector } from '../../hooks/redux';

export const CvViewer = () => {
  const { template } = useAppSelector((state) => state.cv);

  switch (template) {
    case Template.Basic:
      return <Basic isReverse />;
    case Template.Modern:
      return <Modern />;
    case Template.ModernBlack:
      return <Modern isBlack />;
    case Template.ModernColumns:
      return <ModernColumns />;
    case Template.ModernColumnBlack:
      return <ModernColumns isBlack />;
    default:
      return <Basic />;
  }
};
