'use client';
import React, { useEffect } from 'react';
import { DndContext, DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';

import { DroppableCanvas } from '@/components/droppableCanvas';
import { MakeSection } from '@/components/makeSection';
import { MainMenu } from '@/components/mainMenu';
import { Help } from '@/components/help';

import { useShowHelpContext } from '@/context/helpContext';
import { useWindowElementsContext } from '@/context/windowElementsContext';
import { handleDragEnd, handleDragStart } from '@/utils/events';

export default function App() {
  const { windowElements, setWindowElements, setHistoryClickedElements } = useWindowElementsContext();
  const { showHelp, setShowHelp } = useShowHelpContext();
  const canvasId = 'droppableCanvas';

  useEffect(() => {
    const shouldShowHelp = windowElements.some((w) => w.element.visible);

    if (shouldShowHelp && !showHelp) {
      setShowHelp(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            {showHelp && <Help />}
            {windowElements.map((w) => {
              return <MakeSection key={w.id} {...w} />;
            })}
          </DroppableCanvas>
        </div>
    </DndContext>
  );
}
