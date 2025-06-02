import { MouseEvent } from "react";

import { useWindowElementsContext } from "@/context/windowElementsContext";
import { isWindowLoaded } from "@/utils/windows";
import { WindowElementsType } from "@/assets/const";

import { initialStateElement } from '@/assets/initialState';
import { about } from '@/assets/content/es';


export const DesktopIconHolder = ({ id, icon, legend, scale = 'scale-85' } : { id:string, icon: React.JSX.Element, legend: string, scale?: string }) => {
  const { windowElements, setWindowElements } = useWindowElementsContext();

  const handleIconClick = (e: MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.detail === 2) {
      console.log("double click");
      console.log('windows is visible? ', isWindowLoaded(id, windowElements));
      if (!isWindowLoaded(id, windowElements)) {
        setWindowElements(
          [
            ...windowElements,
            {
              id: WindowElementsType.ABOUT,
              element: {
                ...initialStateElement,
                visible: true,
                onTop: true,
              },
              titleName: about.title,
              extendedClasses: ['w-140', 'h-fit'],
              content: about,
            },
          ]
        );
      }
    }
  }
  
  return (
    <button type='button' onClick={(e) => handleIconClick(e, id)} className='flex flex-col wrap w-30 items-center m-3 font-[family-name:var(--font-inconsolata)] cursor-default focus:bg-gray-400'>
      <div className={`${scale}`}>
        {icon}
      </div>
      <p className='text-center text-sm text-white'>{legend}.txt</p>
    </button>
  );
}
