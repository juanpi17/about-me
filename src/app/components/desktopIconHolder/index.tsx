import { MouseEvent } from "react";

import { useWindowElementsContext } from "@/context/windowElementsContext";
import { getWindowElement, isWindowLoaded, setWIndowsOnTopFalse, updateWindowElement } from "@/utils/windows";

export const DesktopIconHolder = ({ id, icon, legend } : { id:string, icon: React.JSX.Element, legend: string }) => {
  const { windowElements, setWindowElements } = useWindowElementsContext();

  const handleIconClick = (e: MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.detail === 2) {
      const isLoaded = isWindowLoaded(id, windowElements);

      setWIndowsOnTopFalse(windowElements);

      const windowElement = getWindowElement(id, windowElements);
      if (windowElement) {
        const newWindowElement = 
        {
          ...windowElement,
            element: {
              ...windowElement.element,
              visible: true,
              onTop: true,
              ...(!isLoaded && { isLoaded: true }),
            }
        };
        const updatedElements = updateWindowElement(newWindowElement, windowElements);
        setWindowElements(updatedElements);
      }
    }
  }
  
  return (
    <button type='button' onClick={(e) => handleIconClick(e, id)} className='flex flex-col wrap w-30 items-center m-3 font-[family-name:var(--font-inconsolata)] cursor-default focus:bg-gray-400'>
      <div className='w-fit h-fit'>
        {icon}
      </div>
      <p className='text-center text-sm text-white'>{legend}.txt</p>
    </button>
  );
}
