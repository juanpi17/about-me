import { SkillProps } from '@/models';
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
      <div className="flex flex-row gap-8">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col hover:bg-gray-100 cursor-pointer">
            <div className={`${isActive.active && isActive.index === index ? 'bg-gray-300' : 'bg-auto'}`} onClick={() => handleClick(index)}>
              <div>{item.icon}</div>
              <div>{isActive.active ? '-' : '+'}</div>
            </div>
          </div>
        ))}
      </div>
      <div className={`accordion-content flex flex-row h-18 ${isActive.active ? 'bg-gray-300' : 'bg-auto'}`}>
        {isActive.active && items[isActive.index].description}
      </div>
      {/* {isActive.active && <div className="accordion-content flex flex-row bg-gray-300">{items[isActive.index].description}</div>} */}
    </div>
  );
};
