import { contact } from '../../_text/es';

import { CommonWindow } from '../../_components/commonWindow';
import { CommonWindowProps } from '../../models';
import { ElementsType } from '../../_const';

export const Contact = (props: CommonWindowProps) => {
  return (
    <CommonWindow
      id={ElementsType.contact}
      element={props.element}
      title={contact.title}
      extendedClasses={['w-128', 'h-fit']}
    >
      <p className="text-lg">{contact.description}</p>
    </CommonWindow>
  );
}
