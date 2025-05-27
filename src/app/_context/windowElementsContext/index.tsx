'use client';
import React, { createContext, useContext, useState } from 'react';
import { Dispatch, SetStateAction } from "react";

import { SectionPageElement, CommonWindowProps } from '../../models';
import { WindowElementsType } from '@/app/_const';

import { about, contact, skills } from '../../_text/es';

interface CommonWindowElementsContextProps {
    windowElements: CommonWindowProps[];
    setWindowElements: Dispatch<SetStateAction<CommonWindowProps[]>>;
}

// TODO: Remove this when we instantiate the elements dinamically
export const initialStateElement: SectionPageElement = {
  visible: true,
  onTop: false,
  position: null,
};

export const initialStateWindowElement: CommonWindowProps = {
  id: '',
  element: initialStateElement,
};

const startingWindowElements: Array<CommonWindowProps> = 
  [
    {
      id: WindowElementsType.ABOUT,
      element: initialStateElement,
      titleName: about.title,
      info: about,
    },
    {
      id: WindowElementsType.CONTACT,
      element: initialStateElement,
      titleName: contact.title,
      info: contact,
    },
    {
      id: WindowElementsType.SKILLS,
      element: initialStateElement,
      titleName: skills.title,
      info: skills,
    },
  ];
// END TODO

const WindowElements = createContext<CommonWindowElementsContextProps>({ windowElements: [], setWindowElements: () => {} });

export function WindowElementsProvider({ children } : { children: React.ReactNode }) {
  const [windowElements, setWindowElements] = useState<Array<CommonWindowProps>>(startingWindowElements);

  return (
    <WindowElements value={{ windowElements, setWindowElements }}>
      {children}
    </WindowElements>
  );
}

export const useWindowElementsContext = () => useContext(WindowElements);
