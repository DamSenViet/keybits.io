import { forwardRef } from 'react'

export interface KeyboardDetailsProps {}

const KeyboardDetails = forwardRef<HTMLDivElement, KeyboardDetailsProps>(
  function (props, ref) {
    return <div ref={ref}></div>
  }
)

export default KeyboardDetails
