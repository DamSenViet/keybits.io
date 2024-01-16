'use client'

import { ComponentPropsWithoutRef, forwardRef, ElementRef } from 'react'
import { ChevronDown, Folder, FolderOpen, File } from 'lucide-react'
import {
  TreeRoot,
  TreeItem,
  TreeHeader,
  TreeTrigger,
  TreeContent,
  useTreeDepth,
} from '@/components/ui/tree'
import { cn } from '@/lib/utils'
import { ExpandedProvider, useExpanded } from './expanded'

const TREE_INDENT_PX = 10

export const ExplorerBranch = forwardRef<
  ElementRef<typeof TreeItem>,
  ComponentPropsWithoutRef<typeof TreeItem>
>(({ className, children, value, title }, ref) => {
  const depth = useTreeDepth()
  const [expanded] = useExpanded()

  const FolderIcon = expanded.includes(value) ? FolderOpen : Folder

  return (
    <TreeItem
      ref={ref}
      className={cn('text-xs font-normal', className)}
      value={value}
    >
      <TreeHeader className="flex items-center justify-start transition-all hover:underline hover:bg-input">
        <TreeTrigger
          className="flex items-center [&[data-state=open]>svg:first-child]:rotate-0"
          style={{ paddingLeft: `${depth * TREE_INDENT_PX}px` }}
        >
          <ChevronDown className="h-3 w-3 mr-1 transition-transform duration-200 -rotate-90" />
          <FolderIcon className="h-4 w-4 mr-1" />
          <span>{title}</span>
        </TreeTrigger>
        {/* buttons */}
        <div className="flex-grow"></div>
      </TreeHeader>
      <TreeContent>{children}</TreeContent>
    </TreeItem>
  )
})

export const ExplorerLeaf = forwardRef<
  ElementRef<typeof TreeItem>,
  ComponentPropsWithoutRef<typeof TreeItem>
>(({ className, children, value }, ref) => {
  const depth = useTreeDepth()
  return (
    <TreeItem
      ref={ref}
      className={cn('flex py-2 hover:bg-input', className)}
      style={{ paddingLeft: `${depth * TREE_INDENT_PX + 16}px` }}
      value={value}
    >
      <File className="h-4 w-4 mr-1" />
      <span>{children}</span>
    </TreeItem>
  )
})

function ExplorerTree() {
  const [, setExpanded] = useExpanded()
  const handleExpand: ComponentPropsWithoutRef<
    typeof TreeRoot
  >['onValueChange'] = (expanded) => {
    setExpanded(expanded)
  }

  return (
    <TreeRoot onValueChange={handleExpand}>
      <ExplorerBranch value={'0'} title="Folder">
        <ExplorerLeaf value={'0-1'}>Deep Inner File</ExplorerLeaf>
        <ExplorerBranch value={'5'} title="Folder">
          <ExplorerLeaf value={'0-2'}>Deep Inner File</ExplorerLeaf>
          <ExplorerBranch value={'6'} title="Folder">
            <ExplorerLeaf value={'0-2'}>Deep Inner File</ExplorerLeaf>
          </ExplorerBranch>
        </ExplorerBranch>
      </ExplorerBranch>
      <ExplorerLeaf value={'00'}>File in Root</ExplorerLeaf>
      <ExplorerBranch value={'1'} title="Folder">
        <ExplorerLeaf value={'1-1'}>File</ExplorerLeaf>
      </ExplorerBranch>
    </TreeRoot>
  )
}

export default function Explorer() {
  return (
    <ExpandedProvider>
      <ExplorerTree />
    </ExpandedProvider>
  )
}
