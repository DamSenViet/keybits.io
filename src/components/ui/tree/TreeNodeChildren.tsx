import { PropsWithChildren, FC, ComponentProps } from 'react'
import useNestedDepth from '@/hooks/useNestedDepth'

export type TreeNodeChildrenProps = ComponentProps<'ul'>

const TreeNodeChildren: FC<PropsWithChildren<TreeNodeChildrenProps>> = ({
  ...props
}) => {
  const depth = useNestedDepth()

  return <ul {...props} role={depth === 0 ? 'tree' : 'group'} />
}

export default TreeNodeChildren
