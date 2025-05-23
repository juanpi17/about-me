import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

import CloseIcon from '../svg/closeIcon';
import { CommonWindowProps } from '../../models'

export function CommonWindow(props: CommonWindowProps) {
  const { attributes, listeners, setNodeRef, transform, setActivatorNodeRef } = useDraggable({
    id: props.id || 'draggable',
  });

  const { onTop, position } = props.element || {};

  const style = {
    transform: CSS.Translate.toString(transform),
    ...(position ? {
      left: position.left,
      top: position.top,
    } : {}),
    ...(onTop ? { 
      background: 'red',
      zIndex: 1
    } : { zIndex: 0 }),
  };

  const handleClose = () => {
    // Handle close action
    console.log('Close button clicked');
  };

  return (
    <div ref={setNodeRef} style={style} className={`absolute ${props.className}`}>
      <div className='flex flex-col w-128 h-fit'>
        <div className={`header flex flex-row items-center gap-2 ${props.element?.onTop ? 'bg-[#fec902]' : 'bg-[#abacad]' } border border-[#abacad] rounded-t-lg border-b-0 w-2/5 px-1 hover:cursor-grab`}>
        {/* <div className='header flex flex-row items-center gap-2 bg-[#fec902] border border-[#abacad] rounded-t-lg border-b-0 w-2/5 px-1 hover:cursor-grab'> */}
          <button onClick={handleClose} className="w-auto focus:outline-none bg-[#fab503] rounded-xs hover:bg-red-700">
            <CloseIcon />
          </button>
          <div ref={setActivatorNodeRef} {...listeners} {...attributes} className='flex-grow p-1'>
            <span className="title text-md font-bold text-black font-[family-name:var(--font-inconsolata)]">{props.title}</span>
          </div>
        </div>
        <div className='content p-3 border-1 bg-white border-[#abacad] rounded-b-lg rounded-tr-lg shadow-lg font-[family-name:var(--font-inconsolata)]'>
          {props.children}
        </div>
      </div>
    </div>
  );
}
