import { createContext } from 'react'
import { TreeContextValue } from '../types'

export default function createTreeContext<TItem>() {
  const TreeContext = createContext<TreeContextValue<TItem>>({
    uniqExpanded: new Set(),
    uniqSelected: new Set(),
    nodeToA11y: new Map(),
    nodeToChildren: new Map(),
    nodeToFilteredChildren: new Map(),
    nodeToDepth: new Map(),
    nodeToParent: new Map(),
  })

  return TreeContext
}
