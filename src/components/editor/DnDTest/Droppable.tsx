import { UniqueIdentifier, useDroppable } from '@dnd-kit/core'
import { Scan } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DroppableProps {
  id: UniqueIdentifier
}

export default function Droppable({ id }: DroppableProps) {
  const { isOver, setNodeRef } = useDroppable({ id })

  return (
    <div
      className={cn(
        'py-5 px-5 bg-gray-30 rounded-lg drop-shadow-lg',
        isOver ? 'bg-green-300 text-green-500 stroke-green-500' : 'bg-slate-300'
      )}
      ref={setNodeRef}
    >
      <div className="flex justify-center items-center">
        <Scan />
        <span className="ml-4">useDroppable('{id}')</span>
      </div>
    </div>
  )
}
