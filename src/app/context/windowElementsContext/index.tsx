'use client';
import React, { createContext, useContext, useState } from 'react';
import { usePathname } from 'next/navigation';
// import { isMobile } from 'react-device-detect';

import { CommonWindowElementsContextProps, MakeSectionProps } from '@/types';
import { startingWindowElements, startingWindowElementsResume } from '@/assets/initialState';
import { changeWindowInitialPositionsForMobile } from '@/utils/windows';

const WindowElements = createContext<CommonWindowElementsContextProps>({ windowElements: [], setWindowElements: () => {}, historyClickedElements: [], setHistoryClickedElements: () => {} });

export function WindowElementsProvider({ isMobile, children } : { isMobile: boolean, children: React.ReactNode }) {
  const pathname = usePathname();

  let config: Array<MakeSectionProps>;

  if (pathname === '/resume') {
    config = startingWindowElementsResume;
  } else {
    config = startingWindowElements;
  }

  // Adjust positions for mobile to prevent overlapping
  config = changeWindowInitialPositionsForMobile(isMobile, config);

  const [windowElements, setWindowElements] = useState<Array<MakeSectionProps>>(config);
  const [historyClickedElements, setHistoryClickedElements] = useState<string[]>([]);

  return (
    <WindowElements value={{ windowElements, setWindowElements, historyClickedElements, setHistoryClickedElements }}>
      {children}
    </WindowElements>
  );
}

export const useWindowElementsContext = () => useContext(WindowElements);
