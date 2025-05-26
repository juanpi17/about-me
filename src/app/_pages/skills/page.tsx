import { skills } from '../../_text/es';

import { CommonWindow } from '../../_components/commonWindow';
import { AdditionalProps, CommonWindowProps } from '../../models';
import { WindowElementsType } from '../../_const';

export const Skills = (props: CommonWindowProps) => {

  const handleClick = (item: AdditionalProps) => {
    return () => {
      // Handle click event for the additional item
      <CommonWindow
        id={item.name}
        element={props.element}
        titleName={item.name}
        extendedClasses={['w-128', 'h-fit']}
      >
        <p className="text-lg">{item.description}</p>
      </CommonWindow>;
    }
  };

  return (
    <CommonWindow
      id={WindowElementsType.SKILLS}
      element={props.element}
      titleName={skills.title}
      extendedClasses={['w-128', 'h-fit']}
    >
      <p className="text-lg">{skills.description}</p>
      <div className="flex items-center mb-2 w-auto h-fit">
      {skills.additional && skills.additional.map((item, index) => (
          <div key={index} onClick={handleClick(item)} className="flex flex-col items-center justify-center p-2 m-1 border border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer">
            {item.icon}
            <p className="text-xs">{item.description}</p>

            {/* THIS SHOULD BE A POPOVER -> <p className="text-lg">{item.name}</p> */}
          </div>
        ))}
      </div>
    </CommonWindow>
  );
}
