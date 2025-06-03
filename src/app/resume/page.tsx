'use client';
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

import { useWindowElementsContext } from '@/context/windowElementsContext';
import { handleDragEnd, handleDragStart } from '@/utils/events';
import { DesktopIconsList } from '@/components/desktopIconsList';

export default function App() {
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  
  const sensors = useSensors(
    mouseSensor,
    touchSensor,
  );

  const { windowElements, setWindowElements, setHistoryClickedElements } = useWindowElementsContext();
  const canvasId = 'droppableCanvas';

  const customHandleDragEnd = (event: DragEndEvent) => {
    handleDragEnd({event, canvasId, windowElements, setWindowElements, setHistoryClickedElements});
  };

  const customHandleDragStart = (event: DragStartEvent) => {
    handleDragStart({event, windowElements, setWindowElements});
  };

  return (
    <DndContext onDragEnd={customHandleDragEnd} onDragStart={customHandleDragStart} modifiers={[restrictToWindowEdges, limitOnTopYAxis]} sensors={sensors}>
        <div className="relative h-screen">
          <DroppableCanvas>
            <MainMenu />
            <DesktopIconsList />
            {windowElements.map((w,index) => {
              return <MakeSection key={w.id + index} {...w} />;
            })}
          </DroppableCanvas>
        </div>
    </DndContext>
  );
}
