import { forwardRef, useContext } from 'react'
import { cn } from '@/lib/utils'
import TreeItemHeader from './TreeItemHeader'
import HoverDropContext from './contexts/HoverDropContext'
import TreeContext from './contexts/TreeContext'
import useTreeItem from './hooks/useTreeItem'
import { TreeNode } from './types/ui'

export interface TreeItemProps {
  item: TreeNode
  showIndentGuide?: boolean
  className?: string
}

const TreeItem = forwardRef<HTMLLIElement, TreeItemProps>(function (
  { item },
  ref
) {
  // const childItems
  const { id, visibleChildren, isExpanded, depth, attributes } = useTreeItem(
    TreeContext,
    item
  )

  const hoverDrop = useContext(HoverDropContext)
  const isDroppingIntoThis = hoverDrop?.projectedDrop?.parentId === id
  const hasChildren = Boolean(visibleChildren)
  const showIndentGuide = false

  const childTreeItems = visibleChildren?.map((item) => (
    <TreeItem key={item.id} item={item} showIndentGuide={showIndentGuide} />
  ))

  return (
    <li
      className={cn('rounded-md', isDroppingIntoThis ? 'bg-muted' : null)}
      ref={ref}
      {...attributes}
    >
      <TreeItemHeader item={item} showChevron />
      {hasChildren && (
        <ul className="relative" role="group">
          {showIndentGuide && (
            <div
              className="absolute top-0 h-full border-l-2 border-input"
              style={{ marginLeft: `${depth * 8 + 6}px` }}
            />
          )}
          {isExpanded && childTreeItems}
        </ul>
      )}
    </li>
  )
})

export default TreeItem
