'use client';
import React, { useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';

import { Element } from './models'

import { DroppableCanvas } from './_components/droppableCanvas';
import About from './_pages/about/page';
// import Contact from './_pages/contact/page';

// const allowedElements = [
//   'about',
//   'contact'
// ];

export default function App() {
  const [element, setElement] = useState<Element>();

  function handleDragEnd(event: DragEndEvent) {
    if (event.over && event.over.id === 'droppableCanvas') {
      setElement({
        id: event.active.id,
        visible: true,
        position: event.active.rect.current.translated,
      });
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd} modifiers={[restrictToWindowEdges]}>
      <div className="relative h-screen">
        <DroppableCanvas>
          <About element={element!}/>
          {/* <Contact  element={element!}/> */}
        </DroppableCanvas>
      </div>
    </DndContext>
  );
}
