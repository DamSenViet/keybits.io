import { TreeNodeChildrenProps } from '@/components/ui/data-tree'
import useNestedDepth from '@/hooks/useNestedDepth'
import { cn } from '@/lib/utils'

const ExplorerTreeNodeChildren = ({
  className,
  children,
  ...others
}: TreeNodeChildrenProps) => {
  const depth = useNestedDepth()
  const showIndentGuide = false
  return (
    <ul className={cn('relative', className)} {...others}>
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

export default ExplorerTreeNodeChildren
