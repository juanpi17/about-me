import React from 'react';
import {useDroppable} from '@dnd-kit/core';

export function DroppableCanvas(props: React.PropsWithChildren) {
  const {setNodeRef} = useDroppable({
    id: 'droppableCanvas',
  });
  const style = {
    backgroundColor: '#326294',
  };
  
  return (
    <div ref={setNodeRef} style={style} className='relative h-screen overflow-hidden'>
      {props.children}
    </div>
  );
}
