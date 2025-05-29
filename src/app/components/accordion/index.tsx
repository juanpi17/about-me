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
      <div className={`accordion-content flex flex-row h-fit p-1 ${isActive.active ? 'bg-gray-100' : 'bg-auto'}`}>
        {isActive.active && items[isActive.index].description}
      </div>
    </div>
  );
};
