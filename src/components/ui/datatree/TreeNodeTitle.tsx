import { PropsWithChildren } from 'react'

export interface TreeNodeTitleProps<T> extends PropsWithChildren {
  className?: string
  node: T
}

const TreeNodeTitle = <T,>({ className, children }: TreeNodeTitleProps<T>) => {
  return <div className={className}>{children}</div>
}

export default TreeNodeTitle
