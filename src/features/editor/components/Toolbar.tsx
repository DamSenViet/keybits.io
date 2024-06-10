import { forwardRef } from 'react'

export interface ToolbarProps {}

const Toolbar = forwardRef<HTMLDivElement, ToolbarProps>(function (props, ref) {
  return <div ref={ref}></div>
})

export default Toolbar
