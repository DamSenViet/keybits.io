import { AriaAttributes, AriaRole, HTMLAttributes } from 'react'

export interface TreeItemA11yAttributes
  extends Partial<AriaAttributes>,
    Pick<HTMLAttributes<HTMLLIElement>, 'tabIndex'> {
  role?: AriaRole
}

export interface TreeContextValue<TItem> {
  uniqExpanded: Set<TItem>
  uniqSelected: Set<TItem>
  nodeToParent: Map<TItem, TItem | undefined>
  nodeToChildren: Map<TItem, TItem[] | undefined>
  nodeToFilteredChildren: Map<TItem, TItem[] | undefined>
  nodeToDepth: Map<TItem, number>
  nodeToA11y: Map<TItem, TreeItemA11yAttributes>
}
