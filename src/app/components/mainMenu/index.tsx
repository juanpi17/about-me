import React from "react";

import { noWindowsTitle, noWindowsActive } from "@/assets/content/es";
import { useWindowElementsContext } from "@/context/windowElementsContext";
import { handleOnClickItemMenu } from "@/utils/events";
import { isAnyWindowLoaded } from "@/utils/windows";

export const MainMenu = () => {
  const { windowElements, historyClickedElements, setWindowElements } = useWindowElementsContext();

  const customHandleOnClickItemMenu = (currentWindowId: string) => {
    handleOnClickItemMenu({ currentWindowId, windowElements, setWindowElements, historyClickedElements});
  };

  return (
    <div className="absolute w-52 top-1 right-1 border border-gray-800 shadow-lg bg-[#d8d8d8] rounded-sm font-[family-name:var(--font-inconsolata)] z-1">
      <div className="flex flex-row my-3 justify-center cursor-default">
        <span className="bg-(--default-yellow-soft) p-2 pl-3 text-gray-800 font-bold border rounded-r-3xl border-gray-800 uppercase z-1">Juan Pablo</span>
        <span className="bg-gray-600 p-2 pr-3 text-white border border-l-0 border-gray-800 -ml-5 pl-7 z-0">Lepore</span>
      </div>
      <div className="flex flex-col p-1 w-full bg-gray-200 border border-gray-400 text-sm text-center">
        <div className="flex flex-row flex-wrap w-full h-5.5 gap-2 justify-center cursor-default" title={`${noWindowsTitle}`}>
          {windowElements.map((el) => (
              el.element.isLoaded ? (
                <div key={el.id + 'tray-icon'} className="w-fit h-fit">{React.cloneElement(el.icon, { width: 22, height: 22 })}</div>
               ) : null
              )
            )}
          {!isAnyWindowLoaded(windowElements)
            ? <span>{noWindowsActive}</span>
            : null
          }
        </div>
      </div>
      {windowElements.map((el, index) => {
        return (
          <div key={el.id+index} className="m-2">
          {el.element.isLoaded ? (
            <div
              className={`p-2 hover:bg-gray-200 cursor-pointer hover:transition-all duration-300 ${el.element.onTop && el.element.visible ? 'bg-gray-100 outline outline-gray-800 font-bold' : ''}`}
              onClick={() => customHandleOnClickItemMenu(el.id)}
            >
              <span className="">{el.titleName}</span>
            </div>
          ): null}
        </div>
        )
      })}
    </div>
  );
}
