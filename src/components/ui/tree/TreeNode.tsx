import { PropsWithChildren, ComponentProps, FC } from 'react'
import useNestedDepth from '@/hooks/useNestedDepth'
import NestedDepthProvider from '@/providers/NestedDepthProvider'

export type TreeNodeProps = ComponentProps<'li'>

const TreeNode: FC<PropsWithChildren<TreeNodeProps>> = ({ ...props }) => {
  const depth = useNestedDepth()

  return (
    <NestedDepthProvider value={depth + 1}>
      <li {...props} role="treeitem" />
    </NestedDepthProvider>
  )
}

export default TreeNode
