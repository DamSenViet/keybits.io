import { createPortal } from 'react-dom'
import { DragOverlay } from '@dnd-kit/core'
import { ExplorerNode } from './ExplorerNode'
import { snapOverlayToCursor } from './snapOverlayToCursor'

export interface DraggableOverlayProps {
  items?: ExplorerNode[]
}

export default function DraggableOverlay({ items }: DraggableOverlayProps) {
  return (
    <>
      {createPortal(
        <DragOverlay
          dropAnimation={null}
          modifiers={[snapOverlayToCursor]}
          style={{ width: 'auto', height: 'auto' }}
        >
          {items ? (
            <div className="px-[2px] py-[2px] text-xs text-foreground cursor-grabbing">
              <div className="px-2 py-1 rounded-md bg-muted-foreground/50 opacity-">
                {items.length === 1 ? (
                  <>{items[0].name}</>
                ) : (
                  <>{items.length}</>
                )}
              </div>
            </div>
          ) : null}
        </DragOverlay>,
        document.body
      )}
    </>
  )
}
