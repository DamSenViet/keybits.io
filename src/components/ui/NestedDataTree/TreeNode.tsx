import { FC, Key, useMemo } from 'react'
import { useExpanded } from '@/hooks/useExpanded'
import useNestedDepth from '@/hooks/useNestedDepth'
import NestedDepthProvider from '@/providers/NestedDepthProvider'
import TreeNodeGroup, { TreeNodeGroupProps } from './TreeNodeGroup'
import TreeNodeHeader, { TreeNodeHeaderProps } from './TreeNodeHeader'

export interface TreeNodeProps<T> {
  className?: string
  node: T
  getNodeId: (node: T) => Key
  getNodeChildren: (node: T) => T[]
  nodeHeaderComponent?: FC<TreeNodeHeaderProps<T>>
  nodeGroupComponent?: FC<TreeNodeGroupProps<T>>
  isExpanded: boolean
}

const TreeNode = <T,>({
  className,
  node,
  getNodeId,
  getNodeChildren,
  nodeHeaderComponent = TreeNodeHeader,
  nodeGroupComponent = TreeNodeGroup,
  isExpanded,
}: TreeNodeProps<T>) => {
  const depth = useNestedDepth()
  const [expanded] = useExpanded()
  const treeNodeHeader = nodeHeaderComponent({ node: node })

  const childNodes = useMemo(
    () =>
      getNodeChildren(node).map((nodeDatum) => (
        <TreeNode
          className={className}
          node={nodeDatum}
          getNodeId={getNodeId}
          getNodeChildren={getNodeChildren}
          nodeHeaderComponent={nodeHeaderComponent}
          nodeGroupComponent={nodeGroupComponent}
          isExpanded={expanded.includes(getNodeId(node))}
        />
      )),
    [getNodeChildren, getNodeId]
  )

  const treeNodeGroup = nodeGroupComponent({
    children: childNodes,
  })

  return (
    <NestedDepthProvider value={depth + 1}>
      <li
        role="treeitem"
        className={className}
        aria-level={depth + 1}
        aria-expanded={isExpanded}
        aria-setsize={childNodes.length}
      >
        {treeNodeHeader}
        {treeNodeGroup}
      </li>
    </NestedDepthProvider>
  )
}

export default TreeNode
