import { CustomDragStartEvent, CustomDragEndEvent } from '@/models';

export function handleDragEnd({
  event,
  windowElements,
  setWindowElements,
  setHistoryClickedElements,
} : CustomDragEndEvent
) {
  if (event.over && event.over.id === 'droppableCanvas') {
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

    setHistoryClickedElements!((prev) => {
      const newHistory = [...prev];
      if (newHistory[0] === event.active.id) {
        return newHistory;
      }
      newHistory.unshift(String(event.active.id));
      if (newHistory.length > 5) {
        newHistory.pop();
      }
      return newHistory;
    });
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
