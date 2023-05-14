import { useRef, useState } from 'react';

import { Button, Space } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

import { ResumeViewerType, Template } from './CvViewer.types';
import { Basic } from './Templates/Basic/Basic';
import { Modern } from './Templates/Modern/Modern';
import { ModernColumns } from './Templates/ModernColumns/ModernColumns';

type CvViewerProps = {
  cv: ResumeViewerType;
  targetRef: React.RefObject<HTMLDivElement>;
};

export const CvViewer = (props: CvViewerProps) => {
  switch (props.cv.template) {
    case Template.Basic:
      return <Basic {...props} isReverse />;
    case Template.Modern:
      return <Modern {...props} />;
    case Template.ModernBlack:
      return <Modern {...props} isBlack />;
    case Template.ModernColumns:
      return <ModernColumns {...props} />;
    case Template.ModernColumnBlack:
      return <ModernColumns {...props} isBlack />;
    default:
      return <Basic {...props} />;
  }
};
