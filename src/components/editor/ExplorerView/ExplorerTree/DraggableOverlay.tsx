import { createPortal } from 'react-dom'
import {
  DragOverlay,
  DropAnimation,
  defaultDropAnimationSideEffects,
} from '@dnd-kit/core'
import { ExplorerNode } from './ExplorerNode'
import TreeItemHeader from './TreeItemHeader'

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
          {item ? (
            <TreeItemHeader
              className="bg-background border-solid border-2 border-blue-400 opacity-50"
              item={item}
            />
          ) : null}
        </DragOverlay>,
        document.body
      )}
    </>
  )
}
