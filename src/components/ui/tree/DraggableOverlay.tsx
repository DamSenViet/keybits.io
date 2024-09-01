import { Key, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { TreeNode } from './types/ui'

export interface DraggableOverlayProps {
  items: TreeNode[]
}

export default function DraggableOverlay({ items }: DraggableOverlayProps) {
  return (
    <>
      {createPortal(
        items ? (
          <div className="">{items.length ? items[0].label : items.length}</div>
        ) : null,
        document.body
      )}
    </>
  )
}
