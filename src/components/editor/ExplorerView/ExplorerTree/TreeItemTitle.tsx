import { useDroppable } from '@dnd-kit/core'
import { useDraggable } from '@dnd-kit/core'
import { mergeRefs } from '@mantine/hooks'
import { ChevronDown, File, Folder, FolderOpen } from 'lucide-react'
import { useTreeItem } from '@/components/headless-ui/tree'
import { cn } from '@/lib/utils'
import DragHandle from './DragHandle'
import DropIndicator, { DropPosition } from './DropIndicator'
import {
  ExplorerNode,
  getExplorerNodeChildren,
  getExplorerNodeId,
} from './ExplorerNode'
import TreeContext from './TreeContext'

const TREE_INDENT_PX = 16

export interface TreeItemTitleProps {
  item: ExplorerNode
  showChevron?: boolean
}

export default function TreeItemTitle({
  item,
  showChevron = false,
}: TreeItemTitleProps) {
  // determine whether we're expanded
  const itemId = getExplorerNodeId(item)
  const { depth, isExpanded, toggleExpanded } = useTreeItem(TreeContext, item)

  const children = getExplorerNodeChildren(item)
  const isParent = Boolean(children)
  const Icon = isParent ? (isExpanded ? FolderOpen : Folder) : File
  const resolvedShowChevron = isParent && showChevron

  const insertPosition: DropPosition = 'after'

  const {
    isDragging,
    attributes,
    listeners,
    setNodeRef: setDraggableNodeRef,
    setActivatorNodeRef,
  } = useDraggable({ id: itemId })

  const { setNodeRef: setDroppableNodeRef, isOver } = useDroppable({
    id: itemId,
  })

  // conditionally set the droppable ref
  // if we have one active, no descedants allowed to be droppables
  const isDroppable = true
  const mergedRefs = mergeRefs(
    ...(isDroppable ? [setDroppableNodeRef] : []),
    setDraggableNodeRef
  )

  return (
    <div
      ref={mergedRefs}
      className={cn(
        'relative rounded-sm',
        'flex flex-row items-center justify',
        'text-xs font-normal py-1 rounded-sm flex-nowrap min-w-0 max-w-full',
        'group',
        isDragging ? 'opacity-40' : null
      )}
    >
      {/* indent */}
      <div className="flex-none" style={{ width: depth * TREE_INDENT_PX }} />
      {/* drop indicator */}
      <DropIndicator position={insertPosition} visible={isOver} depth={depth} />
      <button
        className={cn(
          'shrink-0 mr-1 hover:bg-input bg-opacity-50 p-1 rounded-full',
          resolvedShowChevron ? 'visible' : 'invisible'
        )}
        aria-label="expand"
        onClick={toggleExpanded}
      >
        <ChevronDown
          className={cn(
            'h-4 w-4 stroke-muted-foreground transition-transform duration-200 -rotate-90',
            isExpanded ? 'rotate-0' : null
          )}
        />
      </button>
      {/* title content */}
      <div className="grow min-w-0 flex flex-row flex-nowrap items-center">
        <Icon className="flex-none h-4 w-4 mr-1" />
        <div className="shrink text-nowrap whitespace-nowrap overflow-hidden overflow-ellipsis">
          {item.name}
        </div>
      </div>
      <div className="flex-none min-w-0">
        <DragHandle
          ref={setActivatorNodeRef}
          attributes={attributes}
          listeners={listeners}
        />
      </div>
      <div className="flex-none flex">
        {/* hover visible actions */}
        {/* <EyeOff className="h-4 w-4 mr-1 block group-hover:hidden" /> */}
        {/* hover hover visible actions */}
        {/* <Eye className="h-4 w-4 mr-1 hidden group-hover:block" /> */}
      </div>
    </div>
  )
}
