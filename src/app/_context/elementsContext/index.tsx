'use client';
import { createContext } from 'react';
import { Element } from '../../models';
import { Dispatch, SetStateAction } from "react";

interface ElementsContextProps {
    elements: Element[];
    setElements: Dispatch<SetStateAction<Element[]>>;
}

export const ElementsContext = createContext<ElementsContextProps>({ elements: [], setElements: () => {} });

// import { createContext, useContext, useState } from 'react';
// import { Dispatch, SetStateAction } from "react";

// interface ElementsContextProps {
//     elements: Element[];
//     setElements: Dispatch<SetStateAction<Element[]>>;
// }


// const SidebarContext = createContext<ElementsContextProps>({ elements: [], setElements: () => {} });

// export function Sidebar() {
//   const [elements, setElements] = useState<Element[]>([]);

//   return (
//     <SidebarContext.Provider value={{ elements, setElements }}>
//       <SidebarNav />
//     </SidebarContext.Provider>
//   );
// }

// function SidebarNav() {
//   const { elements } = useContext(SidebarContext);

//   return (
//     <div>
//       <p>Home</p>

//       {elements && <h1>Aqui esta el context</h1>}
//     </div>
//   );
// }