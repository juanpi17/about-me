import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

import CloseIcon from '../svg/closeIcon';

interface WindowElementProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  position: { x: number; y: number } | undefined;
  zIndex?: number;
  className?: string;
  title?: string;
};

export default function CommonWindow(props: WindowElementProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'draggable',
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    left: props.position ? props.position.x : 0,
    top: props.position ? props.position.y : 0,
  };

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes} className='absolute z-10'>
      <div className='flex flex-col border-1 border-black rounded-lg shadow-lg bg-white w-128 h-fit'>
        <div className='header flex items-center justify-between bg-blue-300 p-3 rounded-t-lg'>
          <h1 className="title text-2xl font-bold">{props.title}</h1>
          <span className="text-sm text-gray-500 ml-2"><CloseIcon /></span>
        </div>
        <div className='content p-3'>
          {props.children}
        </div>
      </div>
    </button>
  );
}
