import { hierarchy, HierarchyNode } from 'd3-hierarchy'

interface BaseExplorerNode {
  name: string
  children?: BaseExplorerNode[]
}

export type ExplorerHierarchyNode = HierarchyNode<ExplorerNode>

export type ExplorerNode = BaseExplorerNode

export const getExplorerNodeId = (node: ExplorerNode) => node.name

export const getExplorerNodeChildren = (node: ExplorerNode) =>
  node.children ?? []
