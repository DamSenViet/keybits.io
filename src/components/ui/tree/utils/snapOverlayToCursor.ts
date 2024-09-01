import type { Modifier } from '@dnd-kit/core'
import { getEventCoordinates } from '@dnd-kit/utilities'

export const snapOverlayToCursor: Modifier = ({
  activatorEvent,
  draggingNodeRect,
  transform,
}) => {
  if (draggingNodeRect && activatorEvent) {
    const activatorCoordinates = getEventCoordinates(activatorEvent)

    if (!activatorCoordinates) {
      return transform
    }

    const offsetX = activatorCoordinates.x - draggingNodeRect.left
    const offsetY = activatorCoordinates.y - draggingNodeRect.top

    return {
      ...transform,
      x: transform.x + offsetX - 4,
      y: transform.y + offsetY - draggingNodeRect.height / 2 - 4,
    }
  }

  return transform
}
