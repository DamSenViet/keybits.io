import { forwardRef } from 'react'
import { Hammer, ZoomInIcon } from 'lucide-react'

export interface ToolbarProps {}

const Toolbar = forwardRef<HTMLDivElement, ToolbarProps>(function (props, ref) {
  return (
    <div
      ref={ref}
      className="h-12 border-b border-border flex justify-start items-center"
    >
      <div className="px-4">
        <Hammer className="stroke-1" />
      </div>
      <div className="font-bold text-sm ml-auto mr-auto">{'Keyboard Name'}</div>
      <div>
        <ZoomInIcon className="px-4" />
      </div>
    </div>
  )
})

export default Toolbar
