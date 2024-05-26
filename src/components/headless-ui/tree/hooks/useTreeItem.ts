import { useContext, Context, useMemo, useCallback } from 'react'
import { TreeContextValue } from '../types'

export default function useTreeItem<TItem>(
  TreeContext: Context<TreeContextValue<TItem>>,
  node: TItem
) {
  const {
    setExpandedItems,
    uniqExpandedItems,
    uniqSelectedItems,
    nodeToParent,
    nodeToA11y,
    nodeToChildren,
    nodeToDepth,
  } = useContext(TreeContext)

  const toggleExpanded = useCallback(() => {
    const copy = new Set(uniqExpandedItems)
    if (copy.has(node)) copy.delete(node)
    else copy.add(node)
    setExpandedItems([...copy.values()])
  }, [setExpandedItems])

  const treeItem = useMemo(() => {
    return {
      isExpanded: uniqExpandedItems.has(node),
      toggleExpanded,
      isSelected: uniqSelectedItems.has(node),
      parent: nodeToParent.get(node),
      children: nodeToChildren.get(node),
      depth: nodeToDepth.get(node) ?? 0,
      attributes: nodeToA11y.get(node) ?? {},
    }
  }, [
    node,
    uniqExpandedItems,
    uniqSelectedItems,
    nodeToParent,
    nodeToChildren,
    nodeToA11y,
    nodeToDepth,
  ])

  return treeItem
}
