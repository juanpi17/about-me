import { ClientRect } from '@dnd-kit/core';

interface CommonWindowProps {
  id?: string;
  element?: Element;
  extendedClasses?: Array<string>;
  title?: string;
  children?: React.ReactNode;
};

interface Element {
  id: string | number;
  visible: boolean;
  onTop: boolean;
  position: ClientRect | null;
};

export type { CommonWindowProps, Element };
