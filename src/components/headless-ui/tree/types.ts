import { AriaAttributes, AriaRole, HTMLAttributes, Key } from 'react'

export interface TreeItemA11yAttributes
  extends Partial<AriaAttributes>,
    Pick<HTMLAttributes<HTMLLIElement>, 'tabIndex'> {
  role?: AriaRole
}

export interface TreeContextValue<TItem> {
  getItemId: (item: TItem) => Key
  expandedIds: Key[]
  setExpandedIds: (ids: Key[]) => void
  uniqExpandedIds: Set<Key>
  selectedIds: Key[]
  setSelectedIds: (ids: Key[]) => void
  uniqSelectedIds: Set<Key>
  idToItem: Map<Key, TItem>
  idToVisible: Map<Key, boolean>
  idToParent: Map<Key, TItem | undefined>
  idToChildren: Map<Key, TItem[] | undefined>
  idToDepth: Map<Key, number>
  idToA11y: Map<Key, TreeItemA11yAttributes>
  flatItems: TItem[]
  visibleFlatItems: TItem[]
}
