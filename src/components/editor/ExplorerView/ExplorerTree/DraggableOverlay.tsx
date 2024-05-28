import { createPortal } from 'react-dom'
import {
  DragOverlay,
  DropAnimation,
  defaultDropAnimationSideEffects,
} from '@dnd-kit/core'
import { ExplorerNode } from './ExplorerNode'
import TreeItemTitle from './TreeItemTitle'

export interface DraggableOverlayProps {
  item?: ExplorerNode
}

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    className: {
      active: 'opacity-40',
    },
  }),
}

export default function DraggableOverlay({ item }: DraggableOverlayProps) {
  return (
    <>
      {createPortal(
        <DragOverlay dropAnimation={dropAnimation}>
          {item ? <TreeItemTitle item={item} /> : null}
        </DragOverlay>,
        document.body
      )}
    </>
  )
}
