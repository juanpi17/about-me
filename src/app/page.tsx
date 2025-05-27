'use client';
import React, { useEffect } from 'react';
import { DndContext, DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';

import { DroppableCanvas } from './_components/droppableCanvas';
import { MakeSection } from './_components/makeSection';
import { MainMenu } from './_components/mainMenu';
// import { About } from './_pages/about/page';
// import {Contact } from './_pages/contact/page';
// import {Skills } from './_pages/skills/page';

// import { ElementsType } from './_const';
import { useWindowElementsContext } from './_context/windowElementsContext';

export default function App() {
  const { windowElements, setWindowElements } = useWindowElementsContext();

  useEffect(() => {
    console.log('Window elements updated:', windowElements);
  }, [windowElements]);

  const handleDragEnd = (event: DragEndEvent) => {
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
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    setWindowElements(windowElements.map((w) => {
      return {
        ...w,
        element: {
          ...w.element,
          onTop: w.id === event.active.id,
        },
      }
    }));
  };

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart} modifiers={[restrictToWindowEdges]}>
        <div className="relative h-screen">
          <DroppableCanvas>
          <MainMenu />
            {windowElements.map((w) => {
              return <MakeSection key={w.id} {...w} />;
            })}
            {/* <About element={getElement(ElementsType.about)}/>
            <Contact element={getElement(ElementsType.contact)}/>
            <Skills element={getElement(ElementsType.skills)}/> */}
          </DroppableCanvas>
        </div>
    </DndContext>
  );
}
