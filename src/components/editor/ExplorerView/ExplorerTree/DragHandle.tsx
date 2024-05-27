import { forwardRef } from 'react'
import { DraggableAttributes } from '@dnd-kit/core'
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities'
import { GripVertical } from 'lucide-react'

interface DragHandleProps {
  attributes: DraggableAttributes
  listeners: SyntheticListenerMap | undefined
}

const DragHandle = forwardRef<HTMLButtonElement, DragHandleProps>(
  ({ attributes, listeners }, ref) => {
    return (
      <button
        className="hover:bg-input rounded-md py-2 px-1 mr-2"
        ref={ref}
        {...attributes}
        {...listeners}
      >
        <GripVertical className="stroke-muted-foreground" size={16} />
      </button>
    )
  }
)

export default DragHandle
