import { FC, Key } from 'react'
import { useUncontrolled } from '@mantine/hooks'
import ExpandedProvider from '@/providers/ExpandedProvider'
import NestedDepthProvider from '@/providers/NestedDepthProvider'
import TreeNode, { TreeNodeProps } from './TreeNode'
import TreeNodeChildren from './TreeNodeChildren'
import TreeNodeTitle, { TreeNodeTitleProps } from './TreeNodeTitle'

export interface TreeProps<T> {
  /**
   * Aria label for the tree component.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label}
   */
  'aria-label'?: string
  /**
   * Aria label by for the tree component.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby}
   */
  'aria-labelledby'?: string
  /**
   * The set of top level tree nodes to be displayed.
   */
  nodes: T[]
  /**
   * Accessor for the node's identifier.
   * Helps determine the expanded state of a rendered tree node.
   * @param node The node to be processed.
   * @returns The node's id.
   */
  getNodeId: (node: T) => Key
  /**
   * Accessor to get the children of a tree node.
   * @param node The node to be processed.
   * @returns The list of child nodes.
   */
  getNodeChildren: (node: T) => T[]
  /**
   * Custom component to render tree nodes.
   */
  nodeComponent?: FC<TreeNodeProps<T>>
  /**
   * Custom component to render node titles.
   */
  nodeTitleComponent?: FC<TreeNodeTitleProps<T>>
  /**
   * Custom component to render the container for a group of nodes.
   */
  nodeChildrenComponent?: typeof TreeNodeChildren
  /**
   * List of controlled node ids to be expanded.
   */
  expanded?: Key[]
  /**
   * List of uncontrolled default node ids to be expanded.
   */
  defaultExpanded?: Key[]
  /**
   * A custom handler for responding to requests to update the list of expanded.
   * @param value The updated set of expanded ids.
   */
  onExpandedChange?: (value: Key[]) => void
}

const Tree = <T,>({
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  nodes,
  getNodeId,
  getNodeChildren,
  nodeComponent: NodeComponent = TreeNode,
  nodeTitleComponent: NodeTitle = TreeNodeTitle,
  nodeChildrenComponent: NodeChildren = TreeNodeChildren,
  expanded,
  defaultExpanded,
  onExpandedChange,
}: TreeProps<T>) => {
  const [resolvedExpanded, handleExpandedChange] = useUncontrolled({
    value: expanded,
    defaultValue: defaultExpanded,
    finalValue: [],
    onChange: onExpandedChange,
  })

  const childNodes = nodes.map((childNode, i) => (
    <NodeComponent
      key={getNodeId(childNode)}
      node={childNode}
      getNodeId={getNodeId}
      getNodeChildren={getNodeChildren}
      nodeTitleComponent={NodeTitle}
      nodeChildrenComponent={NodeChildren}
      aria-posinset={i + 1}
    />
  ))
  return (
    <NestedDepthProvider value={0}>
      <ExpandedProvider value={[resolvedExpanded, handleExpandedChange]}>
        <NodeChildren
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          role="tree"
        >
          {childNodes}
        </NodeChildren>
      </ExpandedProvider>
    </NestedDepthProvider>
  )
}

export default Tree
