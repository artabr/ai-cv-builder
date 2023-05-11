import { ResumeViewerType } from './CvViewer.types';
import { Basic } from './Templates/Basic/Basic';
import { Modern } from './Templates/Modern/Modern';

type CvViewerProps = {
  cv: ResumeViewerType;
};
export const CvViewer = ({ cv }: CvViewerProps) => {
  switch (cv.template) {
    case 'basic reverse':
      return <Basic cv={cv} isReverse />;
    case 'modern':
      return <Modern cv={cv} />;
    default:
      return <Basic cv={cv} isReverse={false} />;
  }
};
