import { Key, ComponentProps, PropsWithChildren, FC, ElementType } from 'react'
import { useExpanded } from '@/hooks/useExpanded'
import useNestedDepth from '@/hooks/useNestedDepth'
import NestedDepthProvider from '@/providers/NestedDepthProvider'
import TreeBranch, { TreeBranchProps } from './TreeBranch'
import TreeItemTitle, { TreeItemTitleProps } from './TreeItemTitle'

export interface TreeItemProps<T>
  extends PropsWithChildren<ComponentProps<'li'>> {
  item: T
  getItemId: (node: T) => Key
  getItemChildren: (node: T) => T[]
  rootComponent?: ElementType<ComponentProps<'li'>>
  itemComponent: FC<TreeItemProps<T>>
  itemTitleComponent?: FC<TreeItemTitleProps<T>>
  branchComponent?: FC<TreeBranchProps<T>>
}

const TreeItem = <T,>({
  item,
  getItemId,
  getItemChildren,
  rootComponent: RootComponent = 'li',
  itemComponent: ItemComponent,
  itemTitleComponent: ItemTitle = TreeItemTitle,
  branchComponent: Branch = TreeBranch,
  ...others
}: TreeItemProps<T>) => {
  const itemId = getItemId(item)
  const childItems = getItemChildren(item)
  const depth = useNestedDepth()
  const [expanded] = useExpanded()
  const isExpanded = expanded.includes(itemId)

  const childNodes = isExpanded
    ? childItems.map((childNode, i) => (
        <TreeItem<T>
          key={getItemId(childNode)}
          item={childNode}
          getItemId={getItemId}
          getItemChildren={getItemChildren}
          itemComponent={ItemComponent}
          itemTitleComponent={ItemTitle}
          branchComponent={Branch}
          aria-posinset={i + 1}
          {...others}
        />
      ))
    : []
  return (
    <NestedDepthProvider>
      <RootComponent
        key={itemId}
        role="treeitem"
        aria-level={depth + 1}
        aria-expanded={isExpanded}
        aria-setsize={childItems.length}
        {...others}
      >
        <ItemTitle item={item} />
        {
          <Branch
            items={childItems}
            getItemId={getItemId}
            getItemChildren={getItemChildren}
          >
            {childNodes}
          </Branch>
        }
      </RootComponent>
    </NestedDepthProvider>
  )
}

export default TreeItem
