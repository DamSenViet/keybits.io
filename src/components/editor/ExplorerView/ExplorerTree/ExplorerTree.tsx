import { Tree } from '@/components/ui/data-tree'
import withDefaultProps from '@/hocs/withDefaults'
import ExplorerTreeNodeChildren from './ExplorerTreeNodeChildren'
import ExplorerTreeNodeTitle from './ExplorerTreeNodeTitle'

interface TreeNode {
  name: string
  children?: TreeNode[]
}

const ExplorerTree = withDefaultProps(Tree<TreeNode>, {
  nodeTitleComponent: ExplorerTreeNodeTitle,
  nodeChildrenComponent: ExplorerTreeNodeChildren,
})

export default ExplorerTree
