'use client';
import React, { createContext, useContext, useState } from 'react';
import { Dispatch, SetStateAction } from "react";

import { SectionPageElement, CommonWindowProps } from '../../models';
import { WindowElementsType } from '@/app/_const';

interface CommonWindowElementsContextProps {
    windowElements: CommonWindowProps[];
    setWindowElements: Dispatch<SetStateAction<CommonWindowProps[]>>;
}

// TODO: Remove this when we instantiate the elements dinamically
const initialStateElement: SectionPageElement = {
    visible: true,
    onTop: false,
    position: null,
};

// const initialElements: Array<string> = [
//   ElementsType.about,
//   ElementsType.contact,
//   ElementsType.skills,
// ]

const startingWindowElements: Array<CommonWindowProps> = 
  [
    {
      id: WindowElementsType.ABOUT,
      element: initialStateElement,
      title: 'About',
    },
    {
      id: WindowElementsType.CONTACT,
      element: initialStateElement,
      title: 'Contact',
    },
    {
      id: WindowElementsType.SKILLS,
      element: initialStateElement,
      title: 'Skills',
    },
  ];
// END TODO

const WindowElements = createContext<CommonWindowElementsContextProps>({ windowElements: [], setWindowElements: () => {} });

export function ElementsProvider({ children } : { children: React.ReactNode }) {
  const [windowElements, setWindowElements] = useState<Array<CommonWindowProps>>(startingWindowElements);

  return (
    <WindowElements value={{ windowElements, setWindowElements }}>
      {children}
    </WindowElements>
  );
}

export const useWindowElementsContext = () => useContext(WindowElements);
