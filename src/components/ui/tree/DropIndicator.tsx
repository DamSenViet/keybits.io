import { forwardRef, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { TREE_INDENT_PX, CHEVRON_SPACE, ITEM_ICON_WIDTH } from './constants'
import { DropPosition } from './types/projection'

export interface DropIndicatorProps {
  position?: DropPosition
  depth?: number
}

const DropIndicator = forwardRef<HTMLDivElement, DropIndicatorProps>(
  ({ position = 'before', depth = 0 }, ref) => {
    const indent = useMemo(
      () => depth * TREE_INDENT_PX + CHEVRON_SPACE + ITEM_ICON_WIDTH / 3,
      [depth]
    )

    return (
      <div
        ref={ref}
        className={cn(
          'absolute w-full',
          position
            ? position === 'after'
              ? 'bottom-0 translate-y-1/2'
              : 'top-0 -translate-y-1/2'
            : 'top-0 -translate-y-1/2'
        )}
        style={{
          paddingLeft: indent,
        }}
      >
        <div
          className={cn(
            'h-[8px] w-[8px]',
            'rounded-full bg-white border-solid border-2 border-blue-500',
            'absolute top-1/2 -translate-y-1/2 -translate-x-1/2'
          )}
          style={{
            left: indent,
          }}
        />
        <div className="h-1 w-full  bg-blue-500" />
      </div>
    )
  }
)

export default DropIndicator
