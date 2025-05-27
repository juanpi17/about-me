import { CommonWindow } from '../../_components/commonWindow';
import { CommonWindowProps } from '../../models';

import { Accordion } from '../accordion';

export const MakeSection = (props: CommonWindowProps) => {
  const { id, element, titleName, info } = props;

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
          {info?.additional && (
            <Accordion items={info.additional} />
          )}
          </>
        )}
      </CommonWindow>
    );
}
