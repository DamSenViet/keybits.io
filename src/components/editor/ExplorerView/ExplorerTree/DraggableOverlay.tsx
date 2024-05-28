import { createPortal } from 'react-dom'
import { DragOverlay } from '@dnd-kit/core'
import { ExplorerNode } from './ExplorerNode'
import TreeItemTitle from './TreeItemTitle'

export interface DraggableOverlayProps {
  item?: ExplorerNode
}

export default function DraggableOverlay({ item }: DraggableOverlayProps) {
  return (
    <>
      {createPortal(
        <DragOverlay>
          {item ? <TreeItemTitle item={item} /> : null}
        </DragOverlay>,
        document.body
      )}
    </>
  )
}
