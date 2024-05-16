import { TreeNodeChildrenProps } from '@/components/ui/data-tree'
import { cn } from '@/lib/utils'

const ExplorerTreeNodeChildren = ({
  className,
  ...others
}: TreeNodeChildrenProps) => {
  return (
    <ul className={cn('bg-orange-500 bg-opacity-25', className)} {...others} />
  )
}

export default ExplorerTreeNodeChildren
