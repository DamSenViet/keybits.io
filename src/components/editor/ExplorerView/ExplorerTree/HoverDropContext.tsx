import { createContext } from 'react'
import { getProjectedDrop, InsertPosition } from './utils'

export interface HoverDropContextValue {
  insertPosition: InsertPosition
  projectedDrop: ReturnType<typeof getProjectedDrop>
}

const ProjectDropContext = createContext<HoverDropContextValue | null>(null)

export default ProjectDropContext
