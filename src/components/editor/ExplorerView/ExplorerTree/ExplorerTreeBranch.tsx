// import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { TreeBranchProps } from '@/components/ui/data-tree'
import useNestedDepth from '@/hooks/useNestedDepth'
import { cn } from '@/lib/utils'
import { ExplorerNode } from './ExplorerNode'

// should contain the droppable area
const ExplorerTreeBranch = ({
  items,
  getItemId,
  getItemChildren,
  children,
  rootComponent: _rootComponent,
  ...others
}: TreeBranchProps<ExplorerNode>) => {
  const depth = useNestedDepth()
  const showIndentGuide = false && depth !== 0

  return (
    <ul className={cn('relative')} role="group" {...others}>
      {showIndentGuide && (
        <div
          className={'absolute top-0 h-full border-l-2 border-input'}
          style={{ marginLeft: `${depth * 8 + 6}px` }}
        />
      )}
      {children}
    </ul>
  )
}

export default ExplorerTreeBranch
