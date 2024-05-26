import { CSSProperties } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { ChevronDown, File, Folder, FolderOpen } from 'lucide-react'
import { cn } from '@/lib/utils'
import DragHandle from './DragHandle'
import { ExplorerNode, getExplorerNodeId } from './ExplorerNode'

const TREE_INDENT_PX = 8

export interface TreeItemTitleProps {
  item: ExplorerNode
  depth?: number
  isExpanded?: boolean
}

export default function TreeItemTitle({
  item,
  depth = 0,
  isExpanded = false,
}: TreeItemTitleProps) {
  // determine whether we're expanded

  // check if we actually have children...
  const children: [] | undefined = []
  const Icon = children ? (isExpanded ? FolderOpen : Folder) : File

  const {
    active,
    isDragging,
    attributes,
    transform,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
  } = useDraggable({ id: getExplorerNodeId(item) })

  const rootStyle: CSSProperties = {
    opacity: isDragging ? 0.4 : 1,
    // transform: transform
    //   ? `translate(${transform.x}px, ${transform.y}px)`
    //   : undefined,
  }

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'flex flex-row items-center justify',
        'text-xs font-normal py-1 rounded-sm flex-nowrap min-w-0 max-w-full',
        'group'
      )}
      style={rootStyle}
    >
      {/* indent */}
      <div className="flex-none" style={{ width: depth * TREE_INDENT_PX }} />
      <ChevronDown className="shrink-0 h-4 w-4 mr-1 select-none cursor-pointer transition-transform duration-200 -rotate-90" />
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
