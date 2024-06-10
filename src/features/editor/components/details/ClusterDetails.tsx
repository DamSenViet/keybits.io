import { forwardRef } from 'react'

export interface ClusterDetailsProps {}

const ClusterDetails = forwardRef<HTMLDivElement, ClusterDetailsProps>(
  function (props, ref) {
    return <div ref={ref}></div>
  }
)

export default ClusterDetails
