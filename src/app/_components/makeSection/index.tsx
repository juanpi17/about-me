import { about, contact, skills } from '../../_text/es';

import { CommonWindow } from '../../_components/commonWindow';
import { CommonWindowProps } from '../../models';
import { WindowElementsType } from '../../_const';

const { ABOUT, CONTACT, SKILLS } = WindowElementsType;

export const MakeSection = (props: CommonWindowProps) => {
  const { id, element } = props;

  // const getContent = (id: CommonWindowProps['id']) => ({
  //   [ABOUT]: about,
  //   [CONTACT]: contact,
  //   [SKILLS]: skills,
  // });

const getContent = (id: CommonWindowProps['id']) => {
  switch (id) {
    case ABOUT:
      return about;
    case CONTACT:
      return contact;
    case SKILLS:
      return skills;
    default:
      return { title: 'Unknown', description: 'No content available.' };
  }
};

const content = getContent(id);

return (
    <CommonWindow
      id={id}
      element={element}
      title={content.title}
      extendedClasses={['w-128', 'h-fit']}
    >
      <p className="text-lg">{content.description}</p>
      <div className="flex items-center mb-2 w-auto h-fit">
      {content?.additional && content.additional.map((item, index) => (
          <div key={index} className="flex flex-col items-center justify-center p-2 m-1 border border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer">
            {item.icon}
            <p className="text-xs">{item.description}</p>

            {/* THIS SHOULD BE A POPOVER -> <p className="text-lg">{item.name}</p> */}
          </div>
        ))}
      </div>
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
