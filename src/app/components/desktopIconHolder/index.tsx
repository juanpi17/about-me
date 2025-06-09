import { MouseEvent, TouchEvent } from "react";

import { useWindowElementsContext } from "@/context/windowElementsContext";
import { getWindowElement, isWindowLoaded, setWIndowsOnTopFalse, updateWindowElement } from "@/utils/windows";
import { MakeSectionProps } from "@/types";
import { updateClickedElements } from "@/utils/events";

export const DesktopIconHolder = ({ id, icon, legend } : { id:string, icon: React.JSX.Element, legend: string }) => {
  const { windowElements, setWindowElements, setHistoryClickedElements } = useWindowElementsContext();
  
  const loadSection = (id: string, isMobileTouch: boolean) => {
    const isLoaded = isWindowLoaded(id, windowElements);

    setWIndowsOnTopFalse(windowElements);

    const windowElement = getWindowElement(id, windowElements);
    if (windowElement) {
      const xMultiplier = isMobileTouch ? 0 : 15;
      const yMultiplier = isMobileTouch ? 25 : 25;
      const numberWindowsLoaded = windowElements.filter((w) => w.element.isLoaded).length;
      const newWindowElement = 
      {
        ...windowElement,
        element: {
          ...windowElement.element,
          visible: true,
          onTop: true,
          ...(!isLoaded && { isLoaded: true }),
          ...(!isLoaded && { 
            position: {
              ...windowElement.element.position,
              left: windowElement.element.position!.left + (numberWindowsLoaded * xMultiplier),
              top: windowElement.element.position!.top + (numberWindowsLoaded * yMultiplier),
            }
          }),
        }
      } as MakeSectionProps;

      updateClickedElements(id, setHistoryClickedElements);

      const updatedElements = updateWindowElement(newWindowElement, windowElements);
      setWindowElements(updatedElements);
    }
  };

  const handleIconClick = (e: MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();

    if (e.detail === 2) {
      loadSection(id, false);
    }
  }

  const handleIconTouch = (e: TouchEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();

    loadSection(id, true);
  }
  
  return (
    <button type='button' onClick={(e) => handleIconClick(e, id)} onTouchStart={(e) => handleIconTouch(e, id)} className='flex flex-col wrap w-30 items-center m-3 font-[family-name:var(--font-custom)] cursor-default focus:bg-gray-400'>
      <div className='w-fit h-fit mb-1'>
        {icon}
      </div>
      <p className='text-center text-sm text-white'>{legend}.txt</p>
    </button>
  );
}
