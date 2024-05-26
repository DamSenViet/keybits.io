import { useContext, Context } from 'react'
import { TreeContextValue } from '../types'

export default function useNode<TItem>(
  TreeContext: Context<TreeContextValue<TItem>>,
  node: TItem
) {
  const { nodeToParent, nodeToA11y, nodeToChildren, nodeToDepth } =
    useContext(TreeContext)
  return {
    parent: nodeToParent.get(node),
    children: nodeToChildren.get(node),
    depth: nodeToDepth.get(node),
    attributes: nodeToA11y.get(node),
  }
}
