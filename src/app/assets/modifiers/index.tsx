import type { Modifier } from '@dnd-kit/core';
import type { ClientRect } from '@dnd-kit/core';
import type { Transform } from '@dnd-kit/utilities';

// Add an offset to the top limit to correctly detect the top bar of the window with absolute values
const OFFSET_TOP_Y = 32;

function restrictToBoundingRect(
  transform: Transform,
  rect: ClientRect,
  boundingRect: ClientRect
): Transform {
  const value = {
    ...transform,
  };

  if (rect.top + transform.y - OFFSET_TOP_Y <= boundingRect.top) {
    value.y = boundingRect.top - rect.top + OFFSET_TOP_Y;
  } else if (
    rect.bottom + transform.y >=
    boundingRect.top + boundingRect.height
  ) {
    value.y = boundingRect.top + boundingRect.height - rect.bottom;
  }

  if (rect.left + transform.x <= boundingRect.left) {
    value.x = boundingRect.left - rect.left;
  } else if (
    rect.right + transform.x >=
    boundingRect.left + boundingRect.width
  ) {
    value.x = boundingRect.left + boundingRect.width - rect.right;
  }

  return value;
}

export const limitOnTopYAxis: Modifier= ({
  transform,
  draggingNodeRect,
  windowRect,
}) => {
  if (!draggingNodeRect || !windowRect) {
    return transform;
  }

  return restrictToBoundingRect(transform, draggingNodeRect, windowRect);
};