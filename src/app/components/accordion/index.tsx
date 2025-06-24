import { SkillProps } from '@/types';
import React, { useState } from 'react';

export const Accordion = ({ items, enabled } : { items: SkillProps[], enabled: boolean }) => {
  const [isActive, setIsActive] = useState({ index: -1, active: false });

  const handleClick = (index: number) => {
    if (!enabled) return;

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
          <div key={index} className={`flex flex-col cursor-pointer ${isActive.active && isActive.index === index ? 'bg-gray-200' : 'bg-auto'}`}>
            <div className={`p-3 pb-6 -mb-2`} onClick={() => handleClick(index)}>
              {item.icon}
            </div>
          </div>
        ))}
      </div>
      <div className={`accordion-content flex flex-row px-5 -mx-4 items-center ${isActive.active ? 'bg-gray-200 max-h-24 h-24' : 'max-h-0 h-0 bg-auto'} transition-all easy-out duration-300 overflow-hidden`}>
        {isActive.active && items[isActive.index].description}
      </div>
    </div>
  );
};
