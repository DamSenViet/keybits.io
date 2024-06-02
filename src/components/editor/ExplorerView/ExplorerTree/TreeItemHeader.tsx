import { PointerEvent, useContext, useMemo } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { useDraggable } from '@dnd-kit/core'
import { mergeRefs } from '@mantine/hooks'
import { ChevronDown, File, Folder, FolderOpen } from 'lucide-react'
import { useTreeItem } from '@/components/headless-ui/tree'
import { cn } from '@/lib/utils'
import DropIndicator from './DropIndicator'
import {
  ExplorerNode,
  getExplorerNodeChildren,
  getExplorerNodeId,
} from './ExplorerNode'
import TreeContext from './TreeContext'
import { TREE_INDENT_PX } from './constants'
import {
  InsertPosition,
  getActiveDelta,
  getInsertPosition,
  getProjectedDrop,
} from './utils'

export interface TreeItemHeaderProps {
  className?: string
  item: ExplorerNode
  showChevron?: boolean
}

export default function TreeItemHeader({
  className,
  item,
  showChevron = false,
}: TreeItemHeaderProps) {
  // determine whether we're expanded
  const itemId = getExplorerNodeId(item)
  const treeCtx = useContext(TreeContext)
  const { depth, isExpanded, toggleExpanded } = useTreeItem(TreeContext, item)

  const children = getExplorerNodeChildren(item)
  const isParent = Boolean(children)
  const Icon = isParent ? (isExpanded ? FolderOpen : Folder) : File
  const resolvedShowChevron = isParent && showChevron

  const {
    isDragging,
    attributes,
    listeners,
    setNodeRef: setDraggableNodeRef,
  } = useDraggable({ id: itemId })

  // droppable for inserts before/after
  const {
    setNodeRef: setDroppableNodeRef,
    isOver,
    active,
    over,
  } = useDroppable({
    id: `${itemId}`,
  })

  // conditionally set the droppable ref
  // if we have one active, no descedants allowed to be droppables
  const isDroppable = true
  const mergedRefs = mergeRefs(
    ...(isDroppable ? [setDroppableNodeRef] : []),
    setDraggableNodeRef
  )

  const insertPosition: InsertPosition = useMemo(() => {
    if (active?.rect.current && over?.rect)
      return getInsertPosition(active, over)
    else return 'before'
  }, [active?.rect.current, over?.rect])

  const projection = useMemo(() => {
    if (active?.id && over?.id === itemId)
      return getProjectedDrop({
        flatItems: treeCtx.visibleFlatItems,
        activeId: active.id,
        overId: over.id,
        offset: getActiveDelta(active).x,
        indentationWidth: TREE_INDENT_PX,
        insertPosition,
        getId: treeCtx.getId,
        getDepth: (item) => treeCtx.idToDepth.get(treeCtx.getId(item))!,
        getParent: (item) => treeCtx.idToParent.get(treeCtx.getId(item)),
        getChildren: (item) => treeCtx.idToChildren.get(treeCtx.getId(item)),
      })
    else return undefined
  }, [
    active?.id,
    active?.rect.current,
    over?.id,
    itemId,
    insertPosition,
    treeCtx.getId,
    treeCtx.idToParent,
    treeCtx.idToChildren,
    treeCtx.idToDepth,
    treeCtx.visibleFlatItems,
  ])

  const handleExpand = (event: PointerEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    toggleExpanded()
  }

  return (
    <div
      ref={mergedRefs}
      className={cn(
        'relative rounded-sm',
        'flex flex-row items-center justify',
        'text-xs font-normal py-1 rounded-sm flex-nowrap min-w-0 max-w-full',
        'group',
        className,
        isDragging ? 'opacity-40' : null
      )}
      {...attributes}
      {...listeners}
    >
      {/* indent */}
      <div className="flex-none" style={{ width: depth * TREE_INDENT_PX }} />
      {/* drop indicators */}
      <DropIndicator
        position={insertPosition}
        visible={isOver}
        depth={projection ? projection!.depth : depth}
      />
      {/* debugging item center indicators */}
      {/* <div
        className="absolute w-full bg-red-400 bg-opacity-30"
        style={{ height: 2 }}
      /> */}

      <button
        className={cn(
          'shrink-0 mr-1 hover:bg-input bg-opacity-50 p-1 rounded-full',
          resolvedShowChevron ? 'visible' : 'invisible'
        )}
        aria-label="expand"
        onPointerDown={handleExpand}
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
      <div className="flex-none flex">
        {/* hover visible actions */}
        {/* <EyeOff className="h-4 w-4 mr-1 block group-hover:hidden" /> */}
        {/* hover hover visible actions */}
        {/* <Eye className="h-4 w-4 mr-1 hidden group-hover:block" /> */}
      </div>
    </div>
  )
}
