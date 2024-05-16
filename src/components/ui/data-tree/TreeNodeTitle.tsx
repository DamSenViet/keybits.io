import { PropsWithChildren } from 'react'

export interface TreeNodeTitleProps<T> extends PropsWithChildren {
  className?: string
  isExpanded?: boolean
  node: T
}

const TreeNodeTitle = <T,>({ className, children }: TreeNodeTitleProps<T>) => {
  return <div className={className}>{children}</div>
}

export default TreeNodeTitle
