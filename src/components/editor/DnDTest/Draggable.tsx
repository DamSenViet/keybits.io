import { CSSProperties } from 'react'
import { UniqueIdentifier, useDraggable } from '@dnd-kit/core'
import { Move } from 'lucide-react'

interface DraggableProps {
  id: UniqueIdentifier
}

export default function Draggable({ id }: DraggableProps) {
  const { listeners, attributes, transform, setNodeRef } = useDraggable({ id })

  const style: CSSProperties = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    zIndex: 999,
  }

  return (
    <div
      className="py-5 px-5 bg-white rounded-lg drop-shadow-lg text-sm"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <div className="flex justify-center items-center">
        <Move className="stroke-gray-600" />
        <span className="ml-4">useDraggable('{id}')</span>
      </div>
    </div>
  )
}
