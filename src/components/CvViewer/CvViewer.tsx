import { ResumeViewerType, Template } from './CvViewer.types';
import { Basic } from './Templates/Basic/Basic';
import { Modern } from './Templates/Modern/Modern';
import { ModernColumns } from './Templates/ModernColumns/ModernColumns';

type CvViewerProps = {
  cv: ResumeViewerType;
};
export const CvViewer = ({ cv }: CvViewerProps) => {
  switch (cv.template) {
    case Template.Basic:
      return <Basic cv={cv} isReverse />;
    case Template.Modern:
      return <Modern cv={cv} />;
    case Template.ModernBlack:
      return <Modern cv={cv} isBlack />;
    case Template.ModernColumns:
      return <ModernColumns cv={cv} />;
    case Template.ModernColumnBlack:
      return <ModernColumns cv={cv} isBlack />;
    default:
      return <Basic cv={cv} />;
  }
};
