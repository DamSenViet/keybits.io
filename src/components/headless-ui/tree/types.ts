import { AriaAttributes, AriaRole, HTMLAttributes, Key } from 'react'

export interface TreeItemA11yAttributes
  extends Partial<AriaAttributes>,
    Pick<HTMLAttributes<HTMLLIElement>, 'tabIndex'> {
  role?: AriaRole
}

export interface TreeContextValue<TItem> {
  getItemId: (item: TItem) => Key
  getItemChildren: (item: TItem) => TItem[] | undefined
  setExpandedItems: (items: TItem[]) => void
  uniqExpandedItems: Set<TItem>
  uniqSelectedItems: Set<TItem>
  nodeToParent: Map<TItem, TItem | undefined>
  nodeToChildren: Map<TItem, TItem[] | undefined>
  nodeToFilteredChildren: Map<TItem, TItem[] | undefined>
  nodeToDepth: Map<TItem, number>
  nodeToA11y: Map<TItem, TreeItemA11yAttributes>
}
