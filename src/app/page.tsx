'use client';
import React from 'react';
import { DndContext, DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';

import { DroppableCanvas } from './_components/droppableCanvas';
import { MakeSection } from './_components/makeSection';
import { MainMenu } from './_components/mainMenu';

import { useWindowElementsContext } from './_context/windowElementsContext';

export default function App() {
  const { windowElements, setWindowElements, setHistoryClickedElements } = useWindowElementsContext();

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

      setHistoryClickedElements((prev) => {
        const newHistory = [...prev];
        if (newHistory[0] === event.active.id) {
          return newHistory; // No need to update if the same element is clicked
        }

        newHistory.unshift(String(event.active.id));
        if (newHistory.length > 5) {
          newHistory.pop();
        }

        return newHistory;
      });
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
          </DroppableCanvas>
        </div>
    </DndContext>
  );
}
