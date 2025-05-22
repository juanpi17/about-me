import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

import { about } from '../_text/es';
import CloseIcon from '../_components/svg/closeIcon';

interface ElementProps extends React.HTMLAttributes<HTMLDivElement> {
  position: { x: number; y: number } | undefined;
};

export default function About(props: ElementProps) {
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
          <h1 className="title text-2xl font-bold">{about.title}</h1>
          <span className="text-sm text-gray-500 ml-2"><CloseIcon /></span>
        </div>
        <div className='content p-3'>
          <p className="text-lg">{about.description}</p>
        </div>
      </div>
    </button>
  );
}
