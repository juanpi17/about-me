import { useWindowElementsContext } from "@/context/windowElementsContext";
import { handleOnClickItemMenu } from "@/utils/events";

export const MainMenu = () => {
  const { windowElements, historyClickedElements, setWindowElements } = useWindowElementsContext();

  const customHandleOnClickItemMenu = (currentWindowId: string) => {
    handleOnClickItemMenu({ currentWindowId, windowElements, setWindowElements, historyClickedElements});
  };

  return (
    <div className="absolute w-48 top-0 right-0 shadow-lg p-4 px-2 bg-[#d8d8d8] font-[family-name:var(--font-inconsolata)]">
      <h2 className="text-lg font-semibold mb-2 text-center">Juan Pablo Lepore</h2>
      {windowElements.map((element) => (
        <div
          key={element.id}
          className={`p-2 m-1 border border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer ${element.element.onTop ? 'bg-blue-100' : ''}`}
          onClick={() => customHandleOnClickItemMenu(element.id)}
        >
          <span className="border border-gray-800">{element.titleName}</span>
      </div>
    ))}
  </div>
  );
}
