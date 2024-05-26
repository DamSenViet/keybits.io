interface BaseExplorerNode {
  name: string
  children?: BaseExplorerNode[]
}

export type ExplorerNode = BaseExplorerNode

export const getExplorerNodeId = (node: ExplorerNode) => node.name

export const getExplorerNodeChildren = (node: ExplorerNode) =>
  node.children ?? []
