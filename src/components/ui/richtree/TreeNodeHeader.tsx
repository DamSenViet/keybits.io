import { PropsWithChildren, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface TreeNodeHeaderProps<T> extends PropsWithChildren {
  className?: string
  node: T
}

const TreeNodeHeader = <T,>({
  className,
  children,
}: TreeNodeHeaderProps<T>) => {
  return <div></div>
}

export default TreeNodeHeader
