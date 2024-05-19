import { createContext } from 'react'
import { useDraggable } from '@dnd-kit/core'

type DraggableItemContext = ReturnType<typeof useDraggable> | null

const draggableItemContext = createContext<DraggableItemContext | null>(null)

export default draggableItemContext
