import { about } from '../../_text/es';

import { CommonWindow } from '../../_components/commonWindow';
import { CommonWindowProps } from '../../models';

export default function About(props: CommonWindowProps) {
  return (
    <CommonWindow
      id="about"
      position={props.position}
      zIndex={10}
      title={about.title}
      className='resize overflow-auto'
    >
      <p className="text-lg">{about.description}</p>
    </CommonWindow>
  );
}
