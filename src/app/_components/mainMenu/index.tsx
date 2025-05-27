import { useWindowElementsContext } from "@/app/_context/windowElementsContext";
import { CommonWindowProps } from "@/app/models";
import { useState } from "react";

export const MainMenu = () => {
  const { windowElements, setWindowElements } = useWindowElementsContext();
  const [ lastClickedWindowElement, setLastClickedWindowElement ] = useState<CommonWindowProps | null>(null);

  return (
    <div className="absolute w-48 top-0 right-0 shadow-lg p-4 px-2 bg-[#d8d8d8]">
      {windowElements.map((element) => (
        <div
          key={element.id}
          className={`p-2 m-1 border border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer ${element.element.onTop ? 'bg-blue-100' : ''}`}
          onClick={() => {
            // Handle click event for the menu item
            const current = windowElements.find((w) => w.id === element.id);
            if (current) {
              const updatedElements = windowElements.map((w) => ({
                ...w,
                element: {
                  ...w.element,
                  visible: w.id === current.id ? !w.element.visible : w.element.visible,
                  onTop: w.id === current.id && current.element.visible ? true : current.id && !current.element.visible ? false : w.element.onTop,
                },
              }));

              const noOnTopSet = updatedElements.every((w) => !w.element.onTop);

              if (noOnTopSet && lastClickedWindowElement) {
                // If no window is set on top, set the last clicked window element on top
                updatedElements.forEach((w) => {
                  if (w.id === lastClickedWindowElement.id) {
                    w.element.onTop = true;
                  } else {
                    w.element.onTop = false;
                  }
                }
                );
              }

              // Update the context with the new state
              setWindowElements(updatedElements);
              setLastClickedWindowElement(current);
            }
          }}
        >
          <p className="text-sm">{element.titleName}</p>
          </div>
        ))}
    </div>
  );
}
