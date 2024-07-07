import { createContext } from 'react'
import { DropPosition } from './types/projection'
import { getProjectedDrop } from './utils'

export interface HoverDropContextValue {
  dropPosition: DropPosition
  projectedDrop: NonNullable<ReturnType<typeof getProjectedDrop>>
}

const ProjectDropContext = createContext<HoverDropContextValue | null>(null)

export default ProjectDropContext
