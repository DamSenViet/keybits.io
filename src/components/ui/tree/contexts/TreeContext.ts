import { Key, createContext } from 'react'
import { noop } from 'lodash'
import { TreeItemA11yAttributes } from '../types/ui'
import { TreeNode } from '../types/ui'

export interface TreeContextValue {
  expandedIds: Key[]
  setExpandedIds: (ids: Key[]) => void
  uniqExpandedIds: Set<Key>
  multiSelectable: boolean
  selectedIds: Key[]
  setSelectedIds: (ids: Key[]) => void
  uniqSelectedIds: Set<Key>
  idToItem: Map<Key, TreeNode>
  idToVisible: Map<Key, boolean>
  idToParent: Map<Key, TreeNode | undefined>
  idToChildren: Map<Key, TreeNode[] | undefined>
  idToDepth: Map<Key, number>
  idToA11y: Map<Key, TreeItemA11yAttributes>
  flatItems: TreeNode[]
  visibleFlatItems: TreeNode[]
}

const TreeContext = createContext<TreeContextValue>({
  expandedIds: [],
  setExpandedIds: noop,
  uniqExpandedIds: new Set(),
  multiSelectable: false,
  selectedIds: [],
  setSelectedIds: noop,
  uniqSelectedIds: new Set(),
  idToItem: new Map(),
  idToParent: new Map(),
  idToChildren: new Map(),
  idToVisible: new Map(),
  idToDepth: new Map(),
  idToA11y: new Map(),
  flatItems: [],
  visibleFlatItems: [],
})

export default TreeContext
