'use client'

import { ComponentPropsWithoutRef, forwardRef, ElementRef } from 'react'
import { ChevronDown, Folder, FolderOpen, File } from 'lucide-react'
import {
  Tree,
  TreeItem,
  TreeHeader,
  TreeTrigger,
  TreeContent,
} from '@/components/ui/tree'
import { useExpanded } from '@/hooks/useExpanded'
import useNestedDepth from '@/hooks/useNestedDepth'
import { cn } from '@/lib/utils'
import ExpandedProvider from '@/providers/ExpandedProvider'
import NestedDepthProvider from '@/providers/NestedDepthProvider'

const TREE_INDENT_PX = 10

const ExplorerItem = forwardRef<
  ElementRef<typeof TreeItem>,
  ComponentPropsWithoutRef<typeof TreeItem>
>(({ className, ...props }, ref) => {
  return (
    <NestedDepthProvider>
      <TreeItem
        className={cn('relative text-xs font-normal', className)}
        ref={ref}
        {...props}
      ></TreeItem>
    </NestedDepthProvider>
  )
})

const ExplorerBranch = forwardRef<
  ElementRef<typeof ExplorerItem>,
  ComponentPropsWithoutRef<typeof ExplorerItem> & { indentGuide?: boolean }
>(({ className, children, value, title, indentGuide = false }, ref) => {
  const depth = useNestedDepth()
  const [expanded] = useExpanded()

  const FolderIcon = expanded.includes(value) ? FolderOpen : Folder

  return (
    <ExplorerItem ref={ref} className={cn(className)} value={value}>
      <TreeHeader className="h-8 flex items-center justify-start transition-all hover:bg-input">
        <TreeTrigger
          className="flex items-center [&[data-state=open]>svg:first-child]:rotate-0"
          style={{ paddingLeft: `${depth * TREE_INDENT_PX}px` }}
        >
          <ChevronDown className="h-3 w-3 mr-1 transition-transform duration-200 -rotate-90" />
        </TreeTrigger>
        <FolderIcon className="h-4 w-4 mr-1" />
        <span>{title}</span>
        {/* buttons */}
        <div className="flex-grow"></div>
      </TreeHeader>
      <TreeContent className="relative w-full">
        {indentGuide && (
          <div
            className="absolute top-0 h-full border-l-2 border-input"
            style={{
              marginLeft: `${depth * TREE_INDENT_PX + 4}px`,
            }}
          />
        )}
        {children}
      </TreeContent>
    </ExplorerItem>
  )
})

const ExplorerLeaf = forwardRef<
  ElementRef<typeof ExplorerItem>,
  ComponentPropsWithoutRef<typeof ExplorerItem>
>(({ className, children, value }, ref) => {
  const depth = useNestedDepth()
  return (
    <ExplorerItem
      ref={ref}
      className={cn('h-8 relative flex items-center hover:bg-input', className)}
      style={{ paddingLeft: `${depth * TREE_INDENT_PX + 16}px` }}
      value={value}
    >
      <File className="h-4 w-4 mr-1" /> <div>{children}</div>
    </ExplorerItem>
  )
})

function ExplorerTree() {
  const [, setExpanded] = useExpanded()
  const handleExpand: ComponentPropsWithoutRef<typeof Tree>['onValueChange'] = (
    expanded
  ) => {
    setExpanded(expanded)
  }

  return (
    <Tree className="text-muted-foreground" onValueChange={handleExpand}>
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
    </Tree>
  )
}

export default function Explorer() {
  return (
    <ExpandedProvider>
      <NestedDepthProvider value={0}>
        <ExplorerTree />
      </NestedDepthProvider>
    </ExpandedProvider>
  )
}
