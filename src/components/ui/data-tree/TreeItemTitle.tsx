import { PropsWithChildren } from 'react'

export interface TreeItemTitleProps<T> extends PropsWithChildren {
  item: T
}

const TreeNodeTitle = <T,>({ children }: TreeItemTitleProps<T>) => {
  return <div>{children}</div>
}

export default TreeNodeTitle
