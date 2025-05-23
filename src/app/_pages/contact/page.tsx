import { contact } from '../../_text/es';

import { CommonWindow } from '../../_components/commonWindow';
import { CommonWindowProps } from '../../models';
import { ElementsType } from '../../_const';

export default function Contact(props: CommonWindowProps) {
  return (
    <CommonWindow
      id={ElementsType.contact}
      element={props.element}
      title={contact.title}
    >
      <p className="text-lg">{contact.description}</p>
    </CommonWindow>
  );
}
