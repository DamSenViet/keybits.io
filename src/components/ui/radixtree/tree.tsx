'use client'

import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { cn } from '@/lib/utils'

export const TreeItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, children, ...props }, ref) => {
  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn('text-xs font-normal', className)}
      {...props}
    >
      {children}
    </AccordionPrimitive.Item>
  )
})

export const TreeContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      'relative overflow-hidden text-xs transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
      className
    )}
    {...props}
  >
    {children}
  </AccordionPrimitive.Content>
))
TreeContent.displayName = 'TreeContent'

export type TreeHeaderProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Header
>

export const TreeHeader = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Header>,
  TreeHeaderProps
>(({ className, children, ...props }, ref) => {
  return (
    <AccordionPrimitive.Header
      ref={ref}
      className={cn('flex', className)}
      {...props}
    >
      {children}
    </AccordionPrimitive.Header>
  )
})
TreeHeader.displayName = 'TreeHeader'

export type TreeTriggerProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Trigger
>

export const TreeTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  TreeTriggerProps
>(({ className, children, ...props }, ref) => {
  return (
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn('py-2', className)}
      {...props}
    >
      {children}
    </AccordionPrimitive.Trigger>
  )
})

export type TreeRootProps = Omit<
  AccordionPrimitive.AccordionMultipleProps,
  'type'
>

export const Tree = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  TreeRootProps
>(({ className, ...props }, ref) => {
  return (
    <AccordionPrimitive.Root
      ref={ref}
      className={cn('', className)}
      type={'multiple'}
      {...props}
    />
  )
})
