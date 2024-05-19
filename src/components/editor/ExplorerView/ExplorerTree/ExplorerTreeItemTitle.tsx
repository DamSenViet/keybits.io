import { Key, useCallback, useContext } from 'react'
import { isArray, uniq } from 'lodash'
import {
  ChevronDown,
  Folder,
  FolderOpen,
  File,
  Eye,
  EyeOff,
} from 'lucide-react'
import { TreeItemTitleProps } from '@/components/ui/data-tree'
import { useExpanded } from '@/hooks/useExpanded'
import useNestedDepth from '@/hooks/useNestedDepth'
import { cn } from '@/lib/utils'
import DragHandle from './DragHandle'
import draggableItemContext from './DraggableItemContext'
import { ExplorerNode, getExplorerNodeId } from './ExplorerNode'
import sortableItemContext from './SortableItemContext'

const TREE_INDENT_PX = 8

interface ExplorerTreeItemTitleContentProps {
  nodeId: Key
  node: ExplorerNode
  depth: number
  isExpanded: boolean
}

function ExplorerTreeItemTitleContent({
  node,
  isExpanded,
}: ExplorerTreeItemTitleContentProps) {
  const willShowFolder = isArray(node.children)
  const FolderIcon = isExpanded ? FolderOpen : Folder

  return (
    <div className="grow min-w-0 flex flex-row flex-nowrap items-center">
      {willShowFolder ? (
        <FolderIcon className={cn('flex-none h-4 w-4 mr-1')} />
      ) : (
        <File className={'flex-none h-4 w-4 ml-5 mr-1'} />
      )}
      <div className="text-nowrap whitespace-nowrap overflow-hidden overflow-ellipsis">
        {node.name}
      </div>
    </div>
  )
}

const ExplorerTreeItemTitle = ({ item }: TreeItemTitleProps<ExplorerNode>) => {
  const depth = useNestedDepth()
  const nodeId = getExplorerNodeId(item)
  const [expanded, setExpanded] = useExpanded()
  const isExpanded = expanded.includes(nodeId)
  const willShowChevron = isArray(item.children)

  const { isDragging, attributes, listeners, setActivatorNodeRef } =
    useContext(draggableItemContext)!

  const style = {
    opacity: isDragging ? 0.5 : undefined,
    cursor: isDragging ? 'grabbing' : 'grab',
  }

  const toggleExpand = useCallback(() => {
    if (isExpanded) {
      const copy = expanded.slice()
      copy.splice(copy.indexOf(nodeId), 1)
      setExpanded(copy)
    } else {
      setExpanded(uniq([...expanded, nodeId]))
    }
  }, [isExpanded, expanded, nodeId])

  return (
    <div
      className={cn(
        'flex flex-row items-center text-xs font-normal py-1 my-1 rounded-sm group hover:bg-input flex-nowrap min-w-0'
      )}
      style={style}
    >
      <div className="flex-none" style={{ width: depth * TREE_INDENT_PX }} />
      {willShowChevron && (
        <ChevronDown
          onClick={toggleExpand}
          className={cn(
            'shrink-0 h-4 w-4 mr-1 select-none cursor-pointer transition-transform duration-200 -rotate-90',
            {
              '-rotate-0': isExpanded,
            }
          )}
        />
      )}
      <ExplorerTreeItemTitleContent
        nodeId={nodeId}
        node={item}
        depth={depth}
        isExpanded={isExpanded}
      />

      <span className="flex-none">
        <DragHandle
          ref={setActivatorNodeRef}
          attributes={attributes}
          listeners={listeners}
        />
      </span>

      {/* <div className="flex-none flex"> */}
      {/* hover visible actions */}
      {/* <EyeOff className="h-4 w-4 mr-1 block group-hover:hidden" /> */}
      {/* hover hover visible actions */}
      {/* <Eye className="h-4 w-4 mr-1 hidden group-hover:block" /> */}
      {/* </div> */}
    </div>
  )
}

export default ExplorerTreeItemTitle
