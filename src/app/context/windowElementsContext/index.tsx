'use client';
import React, { createContext, useContext, useState } from 'react';
import { usePathname } from 'next/navigation';

import { CommonWindowElementsContextProps, MakeSectionProps } from '@/types';
import { startingWindowElements, startingWindowElementsResume } from '@/assets/initialState';
import { hideWindowInitialStateForMobile, changeWindowInitialPositionsForMobile } from '@/utils/windows';

const WindowElements = createContext<CommonWindowElementsContextProps>({ windowElements: [], setWindowElements: () => {}, historyClickedElements: [], setHistoryClickedElements: () => {} });

export function WindowElementsProvider({ isMobile, children } : { isMobile: boolean, children: React.ReactNode }) {
  const pathname = usePathname();

  let config: Array<MakeSectionProps>;

  if (pathname === '/resume') {
  // Hide all displayed windows in mobile to avoid filling up the screen
    config = hideWindowInitialStateForMobile(isMobile, startingWindowElementsResume);
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
