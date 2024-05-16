import { ChevronDown } from 'lucide-react'
import { TreeNodeTitleProps } from '@/components/ui/data-tree'
import { cn } from '@/lib/utils'
import { ExplorerNode } from './ExplorerNode'

const ExplorerTreeNodeTitle = ({
  className,
  node,
  isExpanded,
}: TreeNodeTitleProps<ExplorerNode>) => {
  return (
    <div className={cn('text-sm font-normal flex', className)}>
      <span>
        <ChevronDown
          className={cn('h-3 w-3 mr-1 transition-transform duration-200', {
            '-rotate-90': isExpanded,
          })}
        />
      </span>
      <span>{node.name}</span>
    </div>
  )
}

export default ExplorerTreeNodeTitle
