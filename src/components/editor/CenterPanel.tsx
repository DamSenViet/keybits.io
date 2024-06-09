import { forwardRef } from 'react'

export interface CenterPanelProps {}

const CenterPanel = forwardRef<HTMLDivElement, CenterPanelProps>(
  function (props, ref) {
    return <div ref={ref} className="h-full"></div>
  }
)

export default CenterPanel
