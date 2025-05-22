'use client';
import React, { useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';

import About from './_pages/about/page';
import { DroppableCanvas } from './_components/droppableCanvas';

export default function App() {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  function handleDragEnd(event: DragEndEvent) {
    if (event.over && event.over.id === 'droppableCanvas') {
      setPosition({ x: event.active.rect.current.translated?.left || 0, y: event.active.rect.current.translated?.top || 0 });
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd} modifiers={[restrictToWindowEdges]}>
      <div className="relative h-screen">
        <DroppableCanvas>
          <About position={position}/>
        </DroppableCanvas>
      </div>
    </DndContext>
  );
}
