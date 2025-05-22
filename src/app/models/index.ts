interface CommonWindowProps {
  id?: string;
  position: { x: number; y: number } | undefined;
  zIndex?: number;
  className?: string;
  title?: string;
  children?: React.ReactNode;
};

export type { CommonWindowProps };
