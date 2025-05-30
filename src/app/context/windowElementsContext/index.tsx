'use client';
import React, { createContext, useContext, useState } from 'react';
import { usePathname } from 'next/navigation';

import { CommonWindowElementsContextProps, MakeSectionProps } from '@/types';
import { startingWindowElements, startingWindowElementsResume } from '@/assets/initialState';

const WindowElements = createContext<CommonWindowElementsContextProps>({ windowElements: [], setWindowElements: () => {}, historyClickedElements: [], setHistoryClickedElements: () => {} });

export function WindowElementsProvider({ children } : { children: React.ReactNode }) {
  const pathname = usePathname();
  let config: Array<MakeSectionProps>;

  if (pathname === '/resume') {
    config = startingWindowElementsResume;
  } else {
    config = startingWindowElements;
  }

  const [windowElements, setWindowElements] = useState<Array<MakeSectionProps>>(config);
  const [historyClickedElements, setHistoryClickedElements] = useState<string[]>([]);

  return (
    <WindowElements value={{ windowElements, setWindowElements, historyClickedElements, setHistoryClickedElements }}>
      {children}
    </WindowElements>
  );
}

export const useWindowElementsContext = () => useContext(WindowElements);
