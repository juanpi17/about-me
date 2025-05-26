// import { about, contact, skills } from '../../_text/es';

import { CommonWindow } from '../commonWindow';
import { CommonWindowProps, AdditionalProps } from '../../models';
import { useWindowElementsContext } from '@/app/_context/windowElementsContext';

// const { ABOUT, CONTACT, SKILLS } = WindowElementsType;

export const MakePopupSection = (props: CommonWindowProps) => {
  const { windowElements, setWindowElements } = useWindowElementsContext();
  const { id, element, titleName, info } = props;


  const handleClick = (item: AdditionalProps) => {
    console.log('🚀 ~ handleClick ~ item:', item);
    const currentSkillWindowElement: CommonWindowProps = {
      // ...initialStateWindowElement,
      element: props.element,
      id: item.name,
      titleName: item.name,
      info: {
        title: item.name,
        description: item.description!,
      }
    };

    const oldWindowElements = windowElements;
    const existingElement = windowElements.find(el => el.id === currentSkillWindowElement.id);

    if (existingElement) {
      setWindowElements(windowElements.map((w) => {
        return {
          ...w,
          element: {
            ...w.element,
            visible: w.id === existingElement.id ? false : w.element.visible,
          },
        }
      }));
      return;
    }

    if (!existingElement) {
      oldWindowElements.push(currentSkillWindowElement);
      setWindowElements(oldWindowElements);
    }

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
        id={id}
        element={element}
        titleName={titleName}
        extendedClasses={['w-128', 'h-fit']}
      >
        {info && (
          <>
          <p className="text-lg">{info.description}</p>
          <div className="flex items-center mb-2 w-auto h-fit">
          {info?.additional && info.additional.map((item, index) => (
              <div key={index} onClick={() => handleClick(item)} className="flex flex-col items-center justify-center p-2 m-1 border border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer">
                {item.icon}
                {/* THIS SHOULD BE A POPOVER -> <p className="text-lg">{item.name}</p> */}
              </div>
            ))}
          </div>
          </>
        )}
      </CommonWindow>
    );

  // return (
  //   <CommonWindow
  //     id={ElementsType.about}
  //     element={props.element}
  //     title={about.title}
  //     extendedClasses={['w-128', 'h-fit']}
  //   >
  //     <p className="text-lg">{about.description}</p>
  //   </CommonWindow>
  // );
}
