'use client';
import React, { useEffect } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { limitOnTopYAxis } from '@/assets/modifiers';

import { DroppableCanvas } from '@/components/droppableCanvas';
import { MakeSection } from '@/components/makeSection';
import { MainMenu } from '@/components/mainMenu';
import { Help } from '@/components/help';

import { useShowHelpContext } from '@/context/helpContext';
import { useWindowElementsContext } from '@/context/windowElementsContext';
import { handleDragEnd, handleDragStart } from '@/utils/events';
import { DesktopIconsList } from '@/components/desktopIconsList';
import { MusicPlayer } from '../musicPlayer';
import { WindowsType } from '@/assets/const';

export function MainCanvas() {
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  
  const sensors = useSensors(
    mouseSensor,
    touchSensor,
  );

  const { windowElements, setWindowElements, setHistoryClickedElements } = useWindowElementsContext();
  const { showHelp, setShowHelp } = useShowHelpContext();
  const canvasId = 'droppableCanvas';

  useEffect(() => {
    const shouldShowHelp = windowElements.some((w) => w.element.visible);

    if (shouldShowHelp && !showHelp) {
      setShowHelp(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowElements]);

  const customHandleDragEnd = (event: DragEndEvent) => {
    handleDragEnd({event, canvasId, windowElements, setWindowElements, setHistoryClickedElements});
  };

  const customHandleDragStart = (event: DragStartEvent) => {
    handleDragStart({event, windowElements, setWindowElements});
  };

  return (
    <DndContext onDragEnd={customHandleDragEnd} onDragStart={customHandleDragStart} modifiers={[restrictToWindowEdges, limitOnTopYAxis]} sensors={sensors}>
        <div className="relative h-screen">
          {showHelp && <Help />}
          <DroppableCanvas>
            <MainMenu />
            <DesktopIconsList />
            {windowElements.map((w,index) => {
              if (!w.element.isLoaded)
                return null;
              if (w.type === WindowsType.APP) {
                return <MusicPlayer key={w.id + index} {...w} />;
              }
              return <MakeSection key={w.id + index} {...w} />;
            })}
          </DroppableCanvas>
        </div>
    </DndContext>
  );
}
