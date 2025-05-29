import { SkillProps } from '@/types';
import React, { useState } from 'react';

export const Accordion = ({ items } : { items: SkillProps[] }) => {
  const [isActive, setIsActive] = useState({ index: -1, active: false });

  const handleClick = (index: number) => {
    if (isActive.index !== index) {
      setIsActive({ index, active: true });
    } else {
      setIsActive({ index, active: isActive.index === index ? !isActive.active : true });
    }
  };

  return (
    <div className="accordion-container flex flex-col mt-4">
      <div className="flex flex-row justify-between mt-2">
        {items.map((item, index) => (
          <div key={index} className={`flex flex-col cursor-pointer ${isActive.active && isActive.index === index ? 'bg-gray-100' : 'bg-auto not-hover:grayscale'}`}>
            <div className={`p-3 pb-6 -mb-2`} onClick={() => handleClick(index)}>
              {item.icon}
            </div>
          </div>
        ))}
      </div>
      <div className={`accordion-content flex flex-row px-5 -mx-5 items-center ${isActive.active ? 'bg-gray-100 max-h-24 h-24' : 'max-h-0 h-0 bg-auto'} transition-all easy-out duration-300 overflow-hidden`}>
        {isActive.active && items[isActive.index].description}
      </div>
    </div>
  );
};
