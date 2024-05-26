import { useDroppable } from '@dnd-kit/core'
import { useTreeItem } from '@/components/headless-ui/tree'
import { cn } from '@/lib/utils'
import { ExplorerNode, getExplorerNodeId } from './ExplorerNode'
import TreeContext from './TreeContext'
import TreeItemTitle from './TreeItemTitle'

interface TreeItemProps {
  item: ExplorerNode
}

export default function TreeItem({ item }: TreeItemProps) {
  const { depth, attributes } = useTreeItem(TreeContext, item)
  const showIndentGuide = true

  const { isOver, setNodeRef, active } = useDroppable({
    id: getExplorerNodeId(item),
  })

  // should note that droppable cannot be any of the active's descendants
  const isDroppable = active?.id !== getExplorerNodeId(item)
  const willHighlight = isDroppable && isOver

  return (
    <li
      {...(isDroppable ? { ref: setNodeRef } : {})}
      className={cn('rounded-sm', willHighlight ? 'bg-green-200' : null)}
      {...attributes}
    >
      <TreeItemTitle item={item} />
      <ul className="relative" role="group">
        {showIndentGuide && (
          <div /*{ indent guide } */
            className="absolute top-0 h-full border-l-2 border-input"
            style={{ marginLeft: `${depth * 8 + 6}px` }}
          />
        )}
      </ul>
    </li>
  )
}
