'use client';
import React, { createContext, useContext, useState } from 'react';

import { CommonWindowProps, CommonWindowElementsContextProps } from '@/types';
import { startingWindowElements } from '@/assets/initialState';

const WindowElements = createContext<CommonWindowElementsContextProps>({ windowElements: [], setWindowElements: () => {}, historyClickedElements: [], setHistoryClickedElements: () => {} });

export function WindowElementsProvider({ children } : { children: React.ReactNode }) {
  const [windowElements, setWindowElements] = useState<Array<CommonWindowProps>>(startingWindowElements);
  const [historyClickedElements, setHistoryClickedElements] = useState<string[]>([]);

  return (
    <WindowElements value={{ windowElements, setWindowElements, historyClickedElements, setHistoryClickedElements }}>
      {children}
    </WindowElements>
  );
}

export const useWindowElementsContext = () => useContext(WindowElements);
