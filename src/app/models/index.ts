import { ClientRect } from '@dnd-kit/core';

// interface CommonWindowProps {
//   id?: string;
//   position: ClientRect | null;
// //   position: { x: number; y: number } | undefined;
//   zIndex?: number;
//   className?: string;
//   title?: string;
//   children?: React.ReactNode;
// };

interface CommonWindowProps {
  id?: string;
  element: Element;
//   position: { x: number; y: number } | undefined;
  zIndex?: number;
  className?: string;
  title?: string;
  children?: React.ReactNode;
};

interface Element {
  id: string | number;
  visible: boolean;
  position: ClientRect | null;
};

export type { CommonWindowProps, Element };
