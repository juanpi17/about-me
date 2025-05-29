import { MouseEvent } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import classNames from 'classnames';

import CloseIcon from '@/components/svg/closeIcon';
import { CommonWindowProps } from '@/types'
import { useWindowElementsContext } from '@/context/windowElementsContext';
import { handleClose, handleOnTop } from '@/events';

export const CommonWindow = (props: CommonWindowProps) => {
  const { windowElements, setWindowElements, historyClickedElements, setHistoryClickedElements } = useWindowElementsContext();
  const { attributes, listeners, setNodeRef, transform, setActivatorNodeRef } = useDraggable({
    id: props.id || 'draggable',
  });

  const { id, titleName, element, extendedClasses = [], children } = props || {};
  const { onTop, position } = element || {};

  const style = {
    transform: CSS.Translate.toString(transform),
    ...(position
      ? {
        left: position.left,
        top: position.top,
      }
      : {}),
    ...(onTop 
      ? { zIndex: 1 } 
      : { zIndex: 0 }
    ),
  };

  const customHandleClose = (event: MouseEvent<HTMLButtonElement>) => {
    handleClose({event, currentWindowId: id, windowElements, setWindowElements, historyClickedElements});
  };

  const customHandleOnTop = () => {
    handleOnTop({ currentWindowId: id, windowElements, setWindowElements, setHistoryClickedElements});
  };

  if (!element || !element.visible) {
    return null;
  }

  return (
    <div onClick={customHandleOnTop} ref={setNodeRef} style={style} className={`absolute ${classNames(extendedClasses)}`}>
      <div className={`flex flex-col`}>
        <div className={`header flex flex-row items-center gap-2 ${onTop ? 'bg-[#fec902]' : 'bg-[#abacad]' } border border-[#abacad] rounded-t-lg border-b-0 w-2/5 px-1 hover:cursor-grab`}>
          <button onClick={customHandleClose} className={`w-auto ${onTop ? 'bg-[#fab503]' : 'bg-[#abacad]' } focus:outline-none rounded-xs hover:bg-red-700`}>
            <CloseIcon />
          </button>
          <div ref={setActivatorNodeRef} {...listeners} {...attributes} className='flex-grow p-1'>
            <span className="title text-md font-bold text-black font-[family-name:var(--font-inconsolata)]">{titleName}</span>
          </div>
        </div>
        <div className='content p-3 border-1 bg-white border-[#abacad] rounded-b-lg rounded-tr-lg shadow-lg font-[family-name:var(--font-inconsolata)]'>
          {children}
        </div>
      </div>
    </div>
  );
}
