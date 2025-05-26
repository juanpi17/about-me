'use client';
import React, { createContext, useContext, useState } from 'react';
import { Dispatch, SetStateAction } from "react";

import { Element } from '../../models';
import { ElementsType } from '../../_const';

interface ElementsContextProps {
    elements: Element[];
    setElements: Dispatch<SetStateAction<Element[]>>;
}

const initialStateElement: Element = {
    id: '',
    visible: true,
    onTop: false,
    position: null,
};

const initialElements: Array<string> = [
  ElementsType.about,
  ElementsType.contact,
]

const allowedElements: Array<Element> = 
  initialElements.map((el) => {
    return {
      ...initialStateElement,
      id: el,
    }
  });

export const ElementsContext = createContext<ElementsContextProps>({ elements: [], setElements: () => {} });

export function ElementsProvider({ children } : { children: React.ReactNode }) {
  // const [elements, setElements] = useState<Element[]>([]);
  const [elements, setElements] = useState<Array<Element>>(allowedElements);

  return (
    <ElementsContext.Provider value={{ elements, setElements }}>
      {children}
    </ElementsContext.Provider>
  );
}

export const useElementsContext = () => useContext(ElementsContext);
