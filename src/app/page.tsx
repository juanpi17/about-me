'use client';
import React, { useState } from 'react';
import { DndContext, DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';

import { Element } from './models'

import { DroppableCanvas } from './_components/droppableCanvas';
import About from './_pages/about/page';
import Contact from './_pages/contact/page';

import { ElementsType } from './_const';

const initialStateElement: Element = {
    id: '',
    visible: true,
    onTop: false,
    position: null,
};

const initialElements: Array<string> = [
  ElementsType.about,
  ElementsType.contact,
]

const allowedElements: Array<Element> = 
  initialElements.map((el) => {
    return {
      ...initialStateElement,
      id: el,
    }
  });

export default function App() {
  const [elements, setElements] = useState<Array<Element>>(allowedElements);

  const getElement = (elementId: string) => elements.find((el) => el.id === elementId);

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over && event.over.id === 'droppableCanvas') {
      const current = allowedElements.find((el) => el.id === event.active.id);
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
