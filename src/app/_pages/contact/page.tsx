import { contact } from '../../_text/es';

import { CommonWindow } from '../../_components/commonWindow';
import { CommonWindowProps } from '../../models';

export default function Contact(props: CommonWindowProps) {
  const id = 'contact';

  return (
    <CommonWindow
      id={id}
      element={props.element}
      zIndex={10}
      title={contact.title}
      className='resize overflow-auto'
    >
      <p className="text-lg">{contact.description}</p>
    </CommonWindow>
  );
}
