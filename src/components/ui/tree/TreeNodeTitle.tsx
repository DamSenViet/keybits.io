import { PropsWithChildren, FC } from 'react'

export interface TreeNodeTitleProps {
  className?: string
}

const TreeNodeTitle: FC<PropsWithChildren<TreeNodeTitleProps>> = ({
  className,
  children,
}) => {
  return <div className={className}>{children}</div>
}

export default TreeNodeTitle
