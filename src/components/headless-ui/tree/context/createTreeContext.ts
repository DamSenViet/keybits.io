import { Key, createContext } from 'react'
import { noop } from 'lodash'
import { TreeContextValue } from '../types'

export default function createTreeContext<TItem>() {
  const expandedIds = [] as Key[]
  const selectedIds = [] as Key[]
  const TreeContext = createContext<TreeContextValue<TItem>>({
    getId: () => '',
    getChildren: () => undefined,
    expandedIds,
    setExpandedIds: noop,
    uniqExpandedIds: new Set(expandedIds),
    multiSelectable: false,
    selectedIds,
    setSelectedIds: noop,
    uniqSelectedIds: new Set(selectedIds),
    idToItem: new Map(),
    idToParent: new Map(),
    idToChildren: new Map(),
    idToVisible: new Map(),
    idToDepth: new Map(),
    idToA11y: new Map(),
    flatItems: [],
    visibleFlatItems: [],
  })

  return TreeContext
}
