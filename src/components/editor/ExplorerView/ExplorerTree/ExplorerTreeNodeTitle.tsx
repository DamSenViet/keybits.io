import { isArray, uniq } from 'lodash'
import {
  ChevronDown,
  Folder,
  FolderOpen,
  File,
  Eye,
  EyeOff,
} from 'lucide-react'
import { TreeNodeTitleProps } from '@/components/ui/data-tree'
import { useExpanded } from '@/hooks/useExpanded'
import useNestedDepth from '@/hooks/useNestedDepth'
import { cn } from '@/lib/utils'
import { ExplorerNode } from './ExplorerNode'

const TREE_INDENT_PX = 8

const ExplorerTreeNodeTitle = ({
  className,
  node,
  isExpanded,
}: TreeNodeTitleProps<ExplorerNode>) => {
  const depth = useNestedDepth()
  const [expanded, setExpanded] = useExpanded()
  const willShowChevronFolder = isArray(node.children)
  const FolderIcon = isExpanded ? FolderOpen : Folder

  const toggleExpand = () => {
    if (expanded.includes(node.name))
      setExpanded((prevExpanded) => {
        const copy = prevExpanded.slice()
        copy.splice(copy.indexOf(node.name), 1)
        return copy
      })
    else
      setExpanded((prevExpanded) => {
        return uniq([...prevExpanded, node.name])
      })
  }

  return (
    <div
      className={cn(
        'text-xs font-normal flex items-center py-2 rounded-sm group',
        className
      )}
    >
      <div
        className="flex-shrink-0"
        style={{ width: depth * TREE_INDENT_PX }}
      />
      {willShowChevronFolder ? (
        <>
          <ChevronDown
            onClick={toggleExpand}
            className={cn(
              'h-4 w-4 mr-1 transition-transform duration-200 cursor-pointer select-none flex-shrink-0',
              {
                '-rotate-0': isExpanded,
              }
            )}
          />
          <FolderIcon className={cn('h-4 w-4 mr-1 flex-shrink-0')} />
        </>
      ) : (
        <File className={'h-4 w-4 ml-5 mr-1 flex-shrink-0'} />
      )}
      <div className="flex-grow whitespace-nowrap overflow-hidden overflow-ellipsis mr-2">
        {node.name}
      </div>

      <div className="flex-grow flex justify-end">
        {/* hover visible actions */}
        <EyeOff className="h-4 w-4 mr-1 block group-hover:hidden" />
        {/* hover hover visible actions */}
        <Eye className="h-4 w-4 mr-1 hidden group-hover:block" />
      </div>
    </div>
  )
}

export default ExplorerTreeNodeTitle
