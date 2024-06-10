import { forwardRef } from 'react'

export interface KeyDetailsProps {}

const KeyDetails = forwardRef<HTMLDivElement, KeyDetailsProps>(
  function (props, ref) {
    return <div ref={ref}></div>
  }
)

export default KeyDetails
