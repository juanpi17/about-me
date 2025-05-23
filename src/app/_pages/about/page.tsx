import { about } from '../../_text/es';

import { CommonWindow } from '../../_components/commonWindow';
import { CommonWindowProps } from '../../models';
import { ElementsType } from '../../_const';

export const About = (props: CommonWindowProps) => {

  return (
    <CommonWindow
      id={ElementsType.about}
      element={props.element}
      title={about.title}
      extendedClasses={['w-128', 'h-fit']}
    >
      <p className="text-lg">{about.description}</p>
    </CommonWindow>
  );
}
