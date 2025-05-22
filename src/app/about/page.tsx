import { about } from '../_text/es';

import { CommonWindow, CommonWindowProps } from '../_components/commonWindow';

export default function About(props: CommonWindowProps) {
  return (
    <CommonWindow
      id="about"
      position={props.position}
      zIndex={10}
      title={about.title}
    >
      <p className="text-lg">{about.description}</p>
    </CommonWindow>
  );
}