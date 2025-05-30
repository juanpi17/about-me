import { useWindowElementsContext } from "@/context/windowElementsContext";
import { handleOnClickItemMenu } from "@/utils/events";

export const MainMenu = () => {
  const { windowElements, historyClickedElements, setWindowElements } = useWindowElementsContext();

  const customHandleOnClickItemMenu = (currentWindowId: string) => {
    handleOnClickItemMenu({ currentWindowId, windowElements, setWindowElements, historyClickedElements});
  };

  return (
    <div className="absolute w-52 top-1 right-1 border border-gray-800 shadow-lg bg-[#d8d8d8] font-[family-name:var(--font-inconsolata)]">
      <p className="text-lg font-semibold p-2 mb-2 text-center uppercase">Juan Pablo Lepore</p>
      <span className="p-1 w-full block bg-gray-200 border border-gray-400 text-sm text-center border-dashed">Interactive CV</span>
      {windowElements.map((element) => (
        <div
          key={element.id}
          className={`p-2 m-2 w-full max-w-46 hover:bg-gray-200 cursor-pointer hover:transition-all duration-300 ${element.element.onTop ? 'bg-gray-100 outline outline-gray-800 font-bold' : ''}`}
          onClick={() => customHandleOnClickItemMenu(element.id)}
        >
          <span className="">{element.titleName}</span>
        </div>
      ))}
    </div>
  );
}
