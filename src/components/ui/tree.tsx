'use client'

import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

// utilities to help detect tree depth
const DepthContext = React.createContext(0)
const useDepth = () => {
  return React.useContext(DepthContext)
}
const DepthProvider = ({ children }: { children: React.ReactNode }) => {
  const depth = useDepth()
  return (
    <DepthContext.Provider value={depth + 1}>{children}</DepthContext.Provider>
  )
}

const TreeItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn('', className)} {...props} />
))
TreeItem.displayName = 'TreeItem'

const TreeBranchTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex flex-1 items-center justify-start py-2 transition-all hover:underline [&[data-state=open]>svg]:rotate-0',
        className
      )}
      {...props}
    >
      <ChevronDown className="h-3 w-3 mr-1 transition-transform duration-200 -rotate-90" />
      {children}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
TreeBranchTrigger.displayName = 'TreeBranchTrigger'

const TreeBranchContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-xs transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn('pb-0 pt-0', className)}>{children}</div>
  </AccordionPrimitive.Content>
))
TreeBranchContent.displayName = 'TreeBranchContent'

export interface TreeLeafProps {
  className?: string
  children?: React.ReactNode
}

export function TreeLeaf({ className, children }: TreeLeafProps) {
  const depth = useDepth()
  return (
    <div
      className={cn('text-xs py-2 hover:bg-input', className)}
      style={{ paddingLeft: `${(depth + 1) * 16}px` }}
    >
      {children}
    </div>
  )
}

export interface TreeBranchProps {
  className?: string
  children?: React.ReactNode
  title?: string
  value: string
}

// need a tree branch provider for depth
export function TreeBranch({
  className,
  children,
  value,
  title,
}: TreeBranchProps) {
  const depth = useDepth()
  return (
    <DepthProvider>
      <TreeItem className={cn('text-xs font-normal', className)} value={value}>
        <TreeBranchTrigger
          className="hover:bg-input"
          style={{ paddingLeft: `${depth * 16}px` }}
        >
          {title}
        </TreeBranchTrigger>
        <TreeBranchContent className="relative">{children}</TreeBranchContent>
      </TreeItem>
    </DepthProvider>
  )
}

export interface TreeProps {
  className?: string
  children?: React.ReactNode
}

export function Tree({ className, children }: TreeProps) {
  return (
    <AccordionPrimitive.Root className={cn('', className)} type="multiple">
      {children}
    </AccordionPrimitive.Root>
  )
}
