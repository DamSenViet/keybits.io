import { createPortal } from 'react-dom'
import { TreeNode } from './types/ui'

export interface DraggableOverlayProps {
  items: TreeNode[]
}

export default function DraggableOverlay({ items }: DraggableOverlayProps) {
  return (
    <>
      {createPortal(
        items && items.length ? (
          <div className="">{items.length ? items[0].label : items.length}</div>
        ) : null,
        document.body
      )}
    </>
  )
}
