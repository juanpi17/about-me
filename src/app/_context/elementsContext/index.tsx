'use client';
import React, { createContext, useContext, useState } from 'react';
import { Dispatch, SetStateAction } from "react";

import { SectionPageElement } from '../../models';
import { ElementsType } from '../../_const';

interface SectionPageElementsContextProps {
    elements: SectionPageElement[];
    setElements: Dispatch<SetStateAction<SectionPageElement[]>>;
}

const initialStateElement: SectionPageElement = {
    id: '',
    visible: true,
    onTop: false,
    position: null,
};

const initialElements: Array<string> = [
  ElementsType.about,
  ElementsType.contact,
  ElementsType.skills,
]

const allowedElements: Array<SectionPageElement> = 
  initialElements.map((el) => {
    return {
      ...initialStateElement,
      id: el,
    }
  });

const SectionPageElements = createContext<SectionPageElementsContextProps>({ elements: [], setElements: () => {} });

export function ElementsProvider({ children } : { children: React.ReactNode }) {
  const [elements, setElements] = useState<Array<SectionPageElement>>(allowedElements);

  return (
    <SectionPageElements value={{ elements, setElements }}>
      {children}
    </SectionPageElements>
  );
}

export const useElementsContext = () => useContext(SectionPageElements);
