import React from 'react';
import {useDroppable} from '@dnd-kit/core';

export function Droppable(props: React.PropsWithChildren) {
  const {isOver, setNodeRef} = useDroppable({
    id: 'droppable',
  });
  const style = {
    color: isOver ? 'green' : undefined,
    backgroundColor: 'lightblue',
  };
  
  return (
    <div ref={setNodeRef} style={style} className='h-screen'>
      {props.children}
    </div>
  );
}
