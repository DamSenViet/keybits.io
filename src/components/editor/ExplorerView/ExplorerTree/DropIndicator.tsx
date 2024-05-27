import { cn } from '@/lib/utils'

const TREE_INDENT_PX = 16

export type DropPosition = 'before' | 'after' | undefined

export interface DropIndicatorProps {
  visible: boolean
  position: DropPosition
  depth?: number
}

export default function DropIndicator({
  visible = false,
  position = 'before',
  depth = 0,
}: DropIndicatorProps) {
  return (
    <div
      className={cn(
        'absolute w-full',
        'invisible',
        position
          ? position === 'before'
            ? 'top-0 -translate-y-1/2'
            : 'bottom-0 translate-y-1/2'
          : 'bottom-0',
        visible ? 'visible' : null
      )}
      style={{ paddingLeft: depth * TREE_INDENT_PX + 24 }}
    >
      <div
        className={cn(
          'h-3 w-3 ',
          'rounded-full bg-white border-solid border-2 border-blue-500',
          'absolute top-1/2 -translate-y-1/2'
        )}
        style={{ left: depth * TREE_INDENT_PX + 24 }}
      />
      <div className="h-1 bg-blue-500 w-full" />
    </div>
  )
}
