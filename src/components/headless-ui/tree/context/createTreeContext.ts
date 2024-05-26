import { createContext } from 'react'
import { noop } from 'lodash'
import { TreeContextValue } from '../types'

export default function createTreeContext<TItem>() {
  const TreeContext = createContext<TreeContextValue<TItem>>({
    getItemId: () => '',
    getItemChildren: () => [],
    setExpandedItems: noop,
    uniqExpandedItems: new Set(),
    uniqSelectedItems: new Set(),
    nodeToA11y: new Map(),
    nodeToChildren: new Map(),
    nodeToFilteredChildren: new Map(),
    nodeToDepth: new Map(),
    nodeToParent: new Map(),
  })

  return TreeContext
}
