import { ReactNode, PropsWithChildren } from 'react'
import useNestedDepth from '@/hooks/useNestedDepth'

export interface TreeNodeGroupProps<T> {
  className?: string
  children?: ReactNode
}

const TreeNodeGroup = <T,>({
  className,
  children,
}: PropsWithChildren<TreeNodeGroupProps<T>>) => {
  // if depth = 0 => role is tree
  const depth = useNestedDepth()
  return (
    <ul className={className} role={depth === 0 ? 'tree' : 'treeitem'}>
      {children}
    </ul>
  )
}

export default TreeNodeGroup
