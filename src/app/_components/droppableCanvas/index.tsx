import React from 'react';
import {useDroppable} from '@dnd-kit/core';

export function DroppableCanvas(props: React.PropsWithChildren) {
  const {isOver, setNodeRef} = useDroppable({
    id: 'droppableCanvas',
  });
  const style = {
    color: isOver ? 'green' : undefined,
    backgroundColor: '#326294',
  };
  
  return (
    <div ref={setNodeRef} style={style} className='h-screen'>
      {props.children}
    </div>
  );
}
