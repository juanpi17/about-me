import { useShowHelpContext } from "@/context/helpContext";
import { useWindowElementsContext } from "@/context/windowElementsContext";
import { handleOnClickItemMenu } from "@/utils/events";

export const MainMenu = () => {
  const { windowElements, historyClickedElements, setWindowElements } = useWindowElementsContext();
  const { showHelp, setShowHelp } = useShowHelpContext();

  const customHandleOnClickItemMenu = (currentWindowId: string) => {
    if (showHelp) {
      setShowHelp(false);
    }
    handleOnClickItemMenu({ currentWindowId, windowElements, setWindowElements, historyClickedElements});
  };

  return (
    <div className="absolute w-52 top-1 right-1 border border-gray-800 shadow-lg bg-[#d8d8d8] font-[family-name:var(--font-inconsolata)] z-5">
      <p className="text-lg font-semibold p-2 mb-2 text-center uppercase">Juan Pablo Lepore</p>
      <div className="flex flex-col p-1 w-full bg-gray-200 border border-gray-400 text-sm text-center">
        {/* <p className="text-center">Interactive CV</p> */}
        <div className="flex flex-row flex-wrap w-full h-8 gap-2 justify-center">
          {windowElements.map((el) => (
              el.element.isLoaded ? (
                <span key={el.id + 'tray-icon'} className="w-8 h-8 scale-30">{el.icon}</span>
               ) : null
              )
            )}
        </div>
      </div>
      {windowElements.map((el, index) => {
        return (
          <div key={el.id+index}>
          {el.element.isLoaded ? (
            <div
              className={`p-2 m-2 w-full max-w-46 hover:bg-gray-200 cursor-pointer hover:transition-all duration-300 ${el.element.onTop && el.element.visible ? 'bg-gray-100 outline outline-gray-800 font-bold' : ''}`}
              onClick={() => customHandleOnClickItemMenu(el.id)}
            >
              <span className="">{el.titleName}</span>
            </div>
          ): <></>}
        </div>
        )
      })}
    </div>
  );
}
