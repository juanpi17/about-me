import { MouseEvent } from 'react';

import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import classNames from 'classnames';

import CloseIcon from '../svg/closeIcon';
import { CommonWindowProps } from '../../models'
import { useElementsContext } from '../../_context/elementsContext';

export const CommonWindow = (props: CommonWindowProps) => {
  const { elements, setElements } = useElementsContext();
  const { attributes, listeners, setNodeRef, transform, setActivatorNodeRef } = useDraggable({
    id: props.id || 'draggable',
  });

  const { title, element, extendedClasses = [], children } = props || {};
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

  const handleClose = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();

    const current = elements.find((el) => el.id === props.id);
    setElements(elements.map((el) => {
      return {
        ...el,
        visible: el.id === current?.id ? false : el.visible,
      }
    }));
  };

  if (!element || !element.visible) {
    return null;
  }

  const handleOnTop = () => {
    setElements(elements.map((el) => {
      return {
        ...el,
        onTop: el.id === props.id ? true : false,
      }
    }));
  };

  return (
    <div onClick={handleOnTop} ref={setNodeRef} style={style} className={`absolute ${classNames(extendedClasses)}`}>
      <div className={`flex flex-col`}>
        <div className={`header flex flex-row items-center gap-2 ${onTop ? 'bg-[#fec902]' : 'bg-[#abacad]' } border border-[#abacad] rounded-t-lg border-b-0 w-2/5 px-1 hover:cursor-grab`}>
          <button onClick={handleClose} className={`w-auto ${onTop ? 'bg-[#fab503]' : 'bg-[#abacad]' } focus:outline-none rounded-xs hover:bg-red-700`}>
            <CloseIcon />
          </button>
          <div ref={setActivatorNodeRef} {...listeners} {...attributes} className='flex-grow p-1'>
            <span className="title text-md font-bold text-black font-[family-name:var(--font-inconsolata)]">{title}</span>
          </div>
        </div>
        <div className='content p-3 border-1 bg-white border-[#abacad] rounded-b-lg rounded-tr-lg shadow-lg font-[family-name:var(--font-inconsolata)]'>
          {children}
        </div>
      </div>
    </div>
  );
}
