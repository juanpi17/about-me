'use client';
import React from 'react';
import { DndContext, DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';

import { DroppableCanvas } from '@/components/droppableCanvas';
import { MakeSection } from '@/components/makeSection';
import { MainMenu } from '@/components/mainMenu';

import { useWindowElementsContext } from '@/context/windowElementsContext';
import { handleDragEnd, handleDragStart } from '@/events';

export default function App() {
  const { windowElements, setWindowElements, setHistoryClickedElements } = useWindowElementsContext();
  const canvasId = 'droppableCanvas';

//   useEffect(() => {
//     const elements = windowElements.slice(1);
//     setWindowElements(elements);
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

  const customHandleDragEnd = (event: DragEndEvent) => {
    handleDragEnd({event, canvasId, windowElements, setWindowElements, setHistoryClickedElements});
  };

  const customHandleDragStart = (event: DragStartEvent) => {
    handleDragStart({event, windowElements, setWindowElements});
  };

  return (
    <DndContext onDragEnd={customHandleDragEnd} onDragStart={customHandleDragStart} modifiers={[restrictToWindowEdges]}>
        <div className="relative h-screen">
          <DroppableCanvas>
          <MainMenu />
            {windowElements.map((w) => {
              return <MakeSection key={w.id} {...w} />;
            })}
          </DroppableCanvas>
        </div>
    </DndContext>
  );
}
