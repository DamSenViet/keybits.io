import { forwardRef } from 'react'

export interface RightPanelProps {}

const RightPanel = forwardRef<HTMLDivElement, RightPanelProps>(
  function (props, ref) {
    return <div ref={ref} className="min-w-28 p-4"></div>
  }
)

export default RightPanel
