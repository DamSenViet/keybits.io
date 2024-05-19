import { createContext } from 'react'
import { useDroppable } from '@dnd-kit/core'

type DroppableItemContext = ReturnType<typeof useDroppable> | null

const droppableItemContext = createContext<DroppableItemContext | null>(null)

export default droppableItemContext
