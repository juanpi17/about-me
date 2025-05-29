import React from 'react';

const Tooltip = ({ children, text } : { children: React.ReactNode, text: string }) => {
  return (
    <div className="relative group">
      {children}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-auto text-nowrap bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-sm rounded py-1 px-2 z-10">
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
