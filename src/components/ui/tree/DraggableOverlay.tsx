import { createPortal } from 'react-dom'
import { DragOverlay } from '@dnd-kit/core'
import { TreeNode } from './types/ui'
import { snapOverlayToCursor } from './utils/snapOverlayToCursor'

export interface DraggableOverlayProps {
  items: TreeNode[]
}

export default function DraggableOverlay({ items }: DraggableOverlayProps) {
  return (
    <>
      {createPortal(
        items && items.length ? (
          <DragOverlay
            dropAnimation={null}
            className="cursor-grabbing"
            style={{ width: 'auto', height: 'auto' }}
            modifiers={[snapOverlayToCursor]}
          >
            <div className="px-2 py-1 rounded-full text-xs backdrop-blur-sm">
              {items.length ? items[0].label : items.length}
            </div>
          </DragOverlay>
        ) : null,
        document.body
      )}
    </>
  )
}
