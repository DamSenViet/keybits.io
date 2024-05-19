import { FC, Key, ComponentProps } from 'react'
import { useUncontrolled } from '@mantine/hooks'
import ExpandedProvider from '@/providers/ExpandedProvider'
import NestedDepthProvider from '@/providers/NestedDepthProvider'
import TreeBranch, { TreeBranchProps } from './TreeBranch'
import TreeItem, { TreeItemProps } from './TreeItem'
import TreeItemTitle, { TreeItemTitleProps } from './TreeItemTitle'

export interface TreeProps<T> extends ComponentProps<'ul'> {
  /**
   * The set of top level tree nodes to be displayed.
   */
  items: T[]
  /**
   * Accessor for the node's identifier.
   * Helps determine the expanded state of a rendered tree node.
   * @param node The node to be processed.
   * @returns The node's id.
   */
  getItemId: (node: T) => Key
  /**
   * Accessor to get the children of a tree node.
   * @param node The node to be processed.
   * @returns The list of child nodes.
   */
  getItemChildren: (node: T) => T[]
  /**
   * Custom component to render tree nodes.
   */
  itemComponent?: FC<TreeItemProps<T>>
  /**
   * Custom component to render node titles.
   */
  itemTitleComponent?: FC<TreeItemTitleProps<T>>
  /**
   * Custom component to render the container for a group of nodes.
   */
  branchComponent?: FC<TreeBranchProps<T>>
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
  items,
  getItemId,
  getItemChildren,
  itemComponent: ItemComponent = TreeItem,
  itemTitleComponent: ItemTitleComponent = TreeItemTitle,
  branchComponent: BranchComponent = TreeBranch,
  expanded,
  defaultExpanded,
  onExpandedChange,
  ...others
}: TreeProps<T>) => {
  const [resolvedExpanded, handleExpandedChange] = useUncontrolled({
    value: expanded,
    defaultValue: defaultExpanded,
    finalValue: [],
    onChange: onExpandedChange,
  })

  const childTreeItems = items.map((item, i) => (
    <ItemComponent
      key={getItemId(item)}
      item={item}
      getItemId={getItemId}
      getItemChildren={getItemChildren}
      itemComponent={ItemComponent}
      itemTitleComponent={ItemTitleComponent}
      branchComponent={BranchComponent}
      aria-posinset={i + 1}
    />
  ))
  return (
    <NestedDepthProvider value={0}>
      <ExpandedProvider value={[resolvedExpanded, handleExpandedChange]}>
        <BranchComponent
          items={items}
          getItemId={getItemId}
          getItemChildren={getItemChildren}
          role="tree"
          {...others}
        >
          {childTreeItems}
        </BranchComponent>
      </ExpandedProvider>
    </NestedDepthProvider>
  )
}

export default Tree
