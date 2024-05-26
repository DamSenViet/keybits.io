import { useContext, Context } from 'react'
import { TreeContextValue } from '../types'

export default function useTreeItem<TItem>(
  TreeContext: Context<TreeContextValue<TItem>>,
  node: TItem
) {
  const {
    uniqExpanded,
    uniqSelected,
    nodeToParent,
    nodeToA11y,
    nodeToChildren,
    nodeToDepth,
  } = useContext(TreeContext)

  return {
    isExpanded: uniqExpanded.has(node),
    isSelected: uniqSelected.has(node),
    parent: nodeToParent.get(node),
    children: nodeToChildren.get(node),
    depth: nodeToDepth.get(node) ?? 0,
    attributes: nodeToA11y.get(node) ?? {},
  }
}
