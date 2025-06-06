import { CustomDragStartEvent, CustomDragEndEvent, CustomCloseEvent, CustomOnTopEvent, CustomOnClickItemMenuEvent, CommonWindowElementsContextProps } from '@/types';

export function updateClickedElements(id: string, setHistoryClickedElements: CommonWindowElementsContextProps['setHistoryClickedElements']) {
  setHistoryClickedElements((prev) => {
    const newHistory = [...prev];
    if (newHistory[0] === id) {
      return newHistory; // No need to update if the same element is clicked
    }

    newHistory.unshift(id);
    if (newHistory.length > 5) {
      newHistory.pop();
    }

    return newHistory;
  });
}

export function handleDragEnd({
  event,
  canvasId = 'droppableCanvas',
  windowElements,
  setWindowElements,
  setHistoryClickedElements,
} : CustomDragEndEvent
) {
  if (event.over && event.over.id === canvasId) {
    const current = windowElements.find((w) => w.id === event.active.id);
    setWindowElements(windowElements.map((w) => {
      return {
        ...w,
        element: {
          ...w.element,
          position: w.id === current?.id ? event.active.rect.current.translated : w.element.position,
        },
      }
    }));

    updateClickedElements(String(event.active.id), setHistoryClickedElements);
  }
}

export function handleDragStart({
  event,
  windowElements,
  setWindowElements,
} : CustomDragStartEvent
) {
  setWindowElements(windowElements.map((w) => {
    return {
      ...w,
      element: {
        ...w.element,
        onTop: w.id === event.active.id,
      },
    }
  }));
}

export const handleClose = ({
  event,
  currentWindowId,
  windowElements,
  setWindowElements,
  historyClickedElements,
} : CustomCloseEvent
) => {
  event.stopPropagation();
  event.preventDefault();

  const current = windowElements.find((w) => w.id === currentWindowId);
  const elementsClicked = historyClickedElements.length > 1 ? historyClickedElements.filter(item => item !== current?.id) : undefined;
  let lastOnTopId: string | undefined;

  if (elementsClicked) {
    for (const id of elementsClicked) {
      const activeWindowsId = windowElements.map((w) => w.element.visible ? w.id : {});
      if (activeWindowsId.includes(id)) {
        lastOnTopId = id;
        break;
      }
    }
  }

  setWindowElements(windowElements.map((w) => {
    return {
      ...w,
      element: {
        ...w.element,
        visible: w.id === current?.id ? false : w.element.visible,
        onTop: w.id === lastOnTopId ? true : w.element.onTop,
        isLoaded: w.id === current?.id ? false : w.element.visible,
      },
    }
  }));
};

export const handleOnTop = ({
  currentWindowId,
  windowElements,
  setWindowElements,
  setHistoryClickedElements,
} : CustomOnTopEvent
) => {
  setWindowElements(windowElements.map((w) => {
    return {
      ...w,
      element: {
        ...w.element,
        onTop: w.id === currentWindowId ? true : false,
      },
    }
  }));

  updateClickedElements(currentWindowId, setHistoryClickedElements);
};

export const handleOnClickItemMenu = ({
  currentWindowId,
  windowElements,
  setWindowElements,
  historyClickedElements,
} : CustomOnClickItemMenuEvent
) => {
  const current = windowElements.find((w) => w.id === currentWindowId);
  const lastOnTopId = historyClickedElements.length > 1 ? historyClickedElements.filter(item => item !== current?.id)[0] : undefined;

  if (!current) return;

  if (current.element.visible && !current.element.onTop) {
    const updatedElements = windowElements.map((w) => {
      if (w.id === current.id) {
        return {
          ...w,
          element: {
            ...w.element,
            onTop: true,
          },
        };
      }
      if (w.element.visible) {
        return {
          ...w,
          element: {
            ...w.element,
            onTop: false,
          },
        };
      }
      return w;
    });
    setWindowElements(updatedElements);
    return;
  }

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
};
