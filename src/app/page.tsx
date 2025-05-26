'use client';
import React from 'react';
import { DndContext, DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';

import { DroppableCanvas } from './_components/droppableCanvas';
import { About } from './_pages/about/page';
import {Contact } from './_pages/contact/page';

import { ElementsType } from './_const';
import { useElementsContext } from './_context/elementsContext';

export default function App() {
  const { elements, setElements } = useElementsContext();

  const getElement = (elementId: string) => elements.find((el) => el.id === elementId && el.visible);

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over && event.over.id === 'droppableCanvas') {
      const current = elements.find((el) => el.id === event.active.id);
      setElements(elements.map((el) => {
        return {
          ...el,
          position: el.id === current?.id ? event.active.rect.current.translated : el.position,
        }
      }));
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    setElements(elements.map((el) => {
      return {
        ...el,
        onTop: el.id === event.active.id,
      }
    }));
  };

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart} modifiers={[restrictToWindowEdges]}>
        <div className="relative h-screen">
          <DroppableCanvas>
            <About element={getElement(ElementsType.about)}/>
            <Contact element={getElement(ElementsType.contact)}/>
          </DroppableCanvas>
        </div>
    </DndContext>
  );
}
