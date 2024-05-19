import { createContext } from 'react'
import { useSortable } from '@dnd-kit/sortable'

type SortableItemContext = ReturnType<typeof useSortable> | null

const sortableItemContext = createContext<SortableItemContext>(null)

export default sortableItemContext
