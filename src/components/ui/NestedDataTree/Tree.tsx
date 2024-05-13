import { useState, useMemo, FC, Key } from 'react'
import ExpandedProvider from '@/providers/ExpandedProvider'
import NestedDepthProvider from '@/providers/NestedDepthProvider'
import TreeNode, { TreeNodeProps } from './TreeNode'
import TreeNodeGroup, { TreeNodeGroupProps } from './TreeNodeGroup'
import TreeNodeHeader, { TreeNodeHeaderProps } from './TreeNodeHeader'

interface TreeProps<T> {
  className?: string
  node: T
  expanded?: Key[]
  getNodeId: (node: T) => Key
  getNodeChildren: (node: T) => T[]
  nodeComponent?: FC<TreeNodeProps<T>>
  nodeHeaderComponent?: FC<TreeNodeHeaderProps<T>>
  nodeGroupComponent?: FC<TreeNodeGroupProps<T>>
}

// component that's ez to use
const Tree = <T,>({
  className,
  node,
  getNodeId,
  getNodeChildren,
  nodeComponent = TreeNode,
  nodeHeaderComponent = TreeNodeHeader,
  nodeGroupComponent = TreeNodeGroup,
}: TreeProps<T>) => {
  const [expanded, setExpanded] = useState<Key[]>([])
  const treeNodeHeader = nodeHeaderComponent({ node })
  const childNodes = useMemo(
    () =>
      getNodeChildren(node).map((node) =>
        nodeComponent({
          node,
          getNodeId,
          getNodeChildren,
          nodeHeaderComponent,
          nodeGroupComponent,
          isExpanded: expanded.includes(getNodeId(node)),
        })
      ),
    [nodeComponent, getNodeId, getNodeChildren]
  )
  const treeNodeGroup = nodeGroupComponent({
    children: childNodes,
  })

  return (
    <NestedDepthProvider>
      <ExpandedProvider value={[expanded, setExpanded]}>
        <div className={className}>
          {treeNodeHeader}
          {treeNodeGroup}
        </div>
      </ExpandedProvider>
    </NestedDepthProvider>
  )
}

export default Tree
