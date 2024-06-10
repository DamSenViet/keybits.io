import { forwardRef } from 'react'
import { BookMarked, Keyboard, LayoutTemplate } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ActivityBarProps {}

const ActivityBar = forwardRef<HTMLDivElement, ActivityBarProps>(
  function (props, ref) {
    return (
      <div
        ref={ref}
        className={cn('px-2 py-2', 'flex flex-col justify-start items-center')}
      >
        {/* for editing key items */}
        <Keyboard />
        {/* for symbols */}
        <BookMarked />
        {/* for plate generator */}
        <LayoutTemplate />
      </div>
    )
  }
)

export default ActivityBar
