import { useWindowElementsContext } from "@/app/_context/windowElementsContext";

export const MainMenu = () => {
  const { windowElements, historyClickedElements, setWindowElements } = useWindowElementsContext();

  return (
    <div className="absolute w-48 top-0 right-0 shadow-lg p-4 px-2 bg-[#d8d8d8]">
      <h2 className="text-lg font-semibold mb-2">Main Menu</h2>
      {windowElements.map((element) => (
        <div
          key={element.id}
          className={`p-2 m-1 border border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer ${element.element.onTop ? 'bg-blue-100' : ''}`}
          onClick={() => {
            const current = windowElements.find((w) => w.id === element.id);
            const lastOnTopId = historyClickedElements.length > 1 ? historyClickedElements.filter(item => item !== current?.id)[0] : undefined;

            if (!current) return;

            const willBeVisible = !current.element.visible;

            const updatedElements = windowElements.map((w) => {
              if (w.id === current.id) {
                return {
                  ...w,
                  element: {
                    ...w.element,
                    visible: willBeVisible,
                    onTop: willBeVisible,
                  },
                };
              }

              if (!willBeVisible && w.id === lastOnTopId) {
                return {
                  ...w,
                  element: {
                    ...w.element,
                    onTop: true,
                  },
                };
              }
              return {
                ...w,
                element: {
                  ...w.element,
                  onTop: false,
                },
              };
            });

            setWindowElements(updatedElements);
          }}
        >
          <p className="text-sm">{element.titleName}</p>
          </div>
        ))}
    </div>
  );
}
