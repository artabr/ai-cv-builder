import { useEffect, useState } from 'react';

import { debounce } from 'lodash';

export enum ResolutionTypes {
  DESKTOP = 1439,
  TABLET = 1279,
  TABLET_SMALL = 1023,
  MOBILE = 639,
  MOBILE_SMALL = 479,
  MOBILE_SMALLEST = 320
}

export const Breakpoints = {
  mobileSmallest: {
    name: 'Mobile Smallest',
    styles: {
      width: '320px',
      height: '600px'
    }
  },
  mobileSmall: {
    name: 'Mobile Small',
    styles: {
      width: '479px',
      height: '600px'
    }
  },
  mobile: {
    name: 'Mobile',
    styles: {
      width: '639px',
      height: '900px'
    }
  },
  tabletSmall: {
    name: 'Tablet Small',
    styles: {
      width: '1023px',
      height: '900px'
    }
  },
  tablet: {
    name: 'Tablet',
    styles: {
      width: '1279px',
      height: '900px'
    }
  },
  desktopLarge: {
    name: 'Desktop Large',
    styles: {
      width: '1439px',
      height: '900px'
    }
  },
  desktopWide: {
    name: 'Desktop Wide',
    styles: {
      width: '1441px',
      height: '900px'
    }
  }
};

export const useViewportDetect = (defaultViewport = 0) => {
  const [windowWidth, setWindowWidth] = useState(defaultViewport);

  useEffect(() => {
    const getWindowInnerWidth = () => {
      return window.innerWidth;
    };

    setWindowWidth(getWindowInnerWidth());

    const handleWindowResize = debounce(() => {
      setWindowWidth(getWindowInnerWidth());
    }, 100);

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    window.addEventListener('resize', handleWindowResize);

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return {
    // current viewport width
    windowWidth,

    // 320 (MOBILE_SMALLEST) >= windowWidth
    isMobileSmallest: ResolutionTypes.MOBILE_SMALLEST >= windowWidth,

    // 479 (MOBILE_SMALL) >= windowWidth
    isMobileSmall: ResolutionTypes.MOBILE_SMALL >= windowWidth,

    // RANGE 320 (MOBILE_SMALLEST) <= windowWidth <= 479 (MOBILE_SMALL)
    isMobileSmallStrict: ResolutionTypes.MOBILE_SMALL >= windowWidth && ResolutionTypes.MOBILE_SMALLEST <= windowWidth,

    // 639 (MOBILE) >= windowWidth
    isMobile: ResolutionTypes.MOBILE >= windowWidth,

    // RANGE: 320 (MOBILE_SMALLEST) <= windowWidth <= 639 (MOBILE)
    isMobileStrict: ResolutionTypes.MOBILE >= windowWidth && ResolutionTypes.MOBILE_SMALLEST <= windowWidth, // CHECK

    // RANGE: 480 (MOBILE_SMALL) < windowWidth <= 639 (MOBILE)
    isMobileLandscapeStrict: ResolutionTypes.MOBILE >= windowWidth && ResolutionTypes.MOBILE_SMALL < windowWidth,

    // 1023 (TABLET_SMALL) >= windowWidth
    isTabletSmall: ResolutionTypes.TABLET_SMALL >= windowWidth,

    // RANGE: 639 (MOBILE) < windowWidth <= 1023 (TABLET_SMALL)
    isTabletSmallStrict: ResolutionTypes.TABLET_SMALL >= windowWidth && ResolutionTypes.MOBILE < windowWidth,

    // 1279 (TABLET) >= windowWidth
    isTablet: ResolutionTypes.TABLET >= windowWidth,

    // RANGE: 1023 (TABLET_SMALL) < windowWidth <= 1279 (TABLET)
    isTabletStrict: ResolutionTypes.TABLET >= windowWidth && ResolutionTypes.TABLET_SMALL < windowWidth,

    // 1439 (DESKTOP) >= windowWidth
    isDesktop: ResolutionTypes.DESKTOP >= windowWidth,

    // RANGE: 1279 (TABLET) < windowWidth <= 1439 (DESKTOP)
    isDesktopStrict: ResolutionTypes.DESKTOP >= windowWidth && ResolutionTypes.TABLET < windowWidth,

    // 1279 (TABLET) < windowWidth
    isDesktopAny: ResolutionTypes.TABLET < windowWidth,

    // 1439 (DESKTOP) < windowWidth
    isDesktopWide: ResolutionTypes.DESKTOP < windowWidth
  };
};
