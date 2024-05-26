import { useSortable } from '@dnd-kit/sortable'
import { useTreeItem } from '@/components/headless-ui/tree'
import { cn } from '@/lib/utils'
import {
  ExplorerNode,
  getExplorerNodeChildren,
  getExplorerNodeId,
} from './ExplorerNode'
import TreeContext from './TreeContext'
import TreeItemTitle from './TreeItemTitle'

interface TreeItemProps {
  item: ExplorerNode
  showIndentGuide?: boolean
}

export default function TreeItem({ item }: TreeItemProps) {
  const { isExpanded, depth, attributes, toggleExpanded } = useTreeItem(
    TreeContext,
    item
  )
  const showIndentGuide = false

  const { setNodeRef, isOver, active, transform } = useSortable({
    id: getExplorerNodeId(item),
  })

  const rootStyle = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  }

  // should note that droppable cannot be any of the active's descendants
  const isDroppable = active?.id !== getExplorerNodeId(item)
  const showDropIndicator = isDroppable && isOver

  const childItems = getExplorerNodeChildren(item)
  const hasChildren = Boolean(childItems)

  const childTreeItems = getExplorerNodeChildren(item)?.map((item) => (
    <TreeItem
      key={getExplorerNodeId(item)}
      item={item}
      showIndentGuide={showIndentGuide}
    />
  ))

  return (
    <li
      {...(isDroppable ? { ref: setNodeRef } : {})}
      className={cn('rounded-sm', showDropIndicator ? 'bg-green-200' : null)}
      // style={rootStyle}
      {...attributes}
    >
      <TreeItemTitle item={item} showChevron />
      {hasChildren && (
        <ul className="relative" role="group">
          {showIndentGuide && (
            <div /*{ indent guide } */
              className="absolute top-0 h-full border-l-2 border-input"
              style={{ marginLeft: `${depth * 8 + 6}px` }}
            />
          )}
          {isExpanded && childTreeItems}
        </ul>
      )}
    </li>
  )
}
