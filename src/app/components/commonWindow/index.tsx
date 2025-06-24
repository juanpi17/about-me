import { MouseEvent } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import classNames from 'classnames';

import CloseIcon from '@/components/svg/closeIcon';
import { CommonWindowProps } from '@/types'
import { useWindowElementsContext } from '@/context/windowElementsContext';
import { handleClose, handleOnTop } from '@/utils/events';

export const CommonWindow = (props: CommonWindowProps) => {
  const { windowElements, setWindowElements, historyClickedElements, setHistoryClickedElements } = useWindowElementsContext();
  const { attributes, listeners, setNodeRef, transform, setActivatorNodeRef } = useDraggable({
    id: props.id || 'draggable',
  });

  const { id, titleName, element, children, extendedClasses = [] } = props || {};
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
      ? { zIndex: 2 } 
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
      <div className={`absolute left-0 top-[-2rem] h-[2rem] header flex flex-row items-center gap-2 ${onTop ? 'bg-(--default-yellow-soft)' : 'bg-(--default-light-gray)'} border border-(--default-light-gray) rounded-t-lg border-b-0 w-fit px-1 pr-3 hover:cursor-grab max-w-3/4`}>
        <button type='button' onClick={customHandleClose} className={`w-auto ${onTop ? 'bg-(--default-yellow)' : 'bg-(--default-light-gray)' } focus:outline-none rounded-xs hover:bg-red-600`}>
          <CloseIcon />
        </button>
        <div ref={setActivatorNodeRef} {...listeners} {...attributes} className='flex-grow p-1 overflow-hidden whitespace-nowrap text-ellipsis'>
          <p className="title text-md font-bold text-black font-[family-name:var(--font-custom)]">{titleName}</p>
        </div>
      </div>
      <div className={`content touch-auto overflow-x-hidden p-4 border-4 border-double bg-gray-50 border-(--default-light-gray) rounded-b-lg rounded-tr-lg shadow-lg font-[family-name:var(--font-custom)] max-h-160 ${props.overflow} ${onTop ? '' : 'grayscale'}`}>
        {children}
      </div>
    </div>
  );
}
