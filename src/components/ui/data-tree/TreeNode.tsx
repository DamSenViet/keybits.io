import { FC, Key, ElementType, ComponentProps, PropsWithChildren } from 'react'
import { useExpanded } from '@/hooks/useExpanded'
import useNestedDepth from '@/hooks/useNestedDepth'
import NestedDepthProvider from '@/providers/NestedDepthProvider'
import TreeNodeChildren, { TreeNodeChildrenProps } from './TreeNodeChildren'
import TreeNodeTitle, { TreeNodeTitleProps } from './TreeNodeTitle'

export interface TreeNodeProps<T>
  extends PropsWithChildren<ComponentProps<'li'>> {
  node: T
  rootComponent?: ElementType<ComponentProps<'li'>>
  getNodeId: (node: T) => Key
  getNodeChildren: (node: T) => T[]
  nodeTitleComponent?: FC<TreeNodeTitleProps<T>>
  nodeChildrenComponent?: FC<TreeNodeChildrenProps>
}

const TreeNode = <T,>({
  node,
  getNodeId,
  getNodeChildren,
  rootComponent: RootComponent = 'li',
  nodeTitleComponent: NodeTitle = TreeNodeTitle,
  nodeChildrenComponent: NodeChildren = TreeNodeChildren,
  ...others
}: TreeNodeProps<T>) => {
  const nodeId = getNodeId(node)
  const nodeChildren = getNodeChildren(node)
  const hasChildren = nodeChildren.length > 0
  const depth = useNestedDepth()
  const [expanded] = useExpanded()
  const isExpanded = expanded.includes(nodeId)

  const childNodes =
    isExpanded && hasChildren
      ? nodeChildren.map((childNode, i) => (
          <TreeNode
            key={getNodeId(childNode)}
            node={childNode}
            getNodeId={getNodeId}
            getNodeChildren={getNodeChildren}
            nodeTitleComponent={NodeTitle}
            nodeChildrenComponent={NodeChildren}
            aria-posinset={i + 1}
          />
        ))
      : []
  return (
    <NestedDepthProvider>
      <RootComponent
        key={nodeId}
        role="treeitem"
        aria-level={depth + 1}
        aria-expanded={isExpanded}
        aria-setsize={nodeChildren.length}
        {...others}
      >
        <NodeTitle node={node} isExpanded={isExpanded} />
        {hasChildren && <NodeChildren>{childNodes}</NodeChildren>}
      </RootComponent>
    </NestedDepthProvider>
  )
}

export default TreeNode
