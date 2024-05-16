import React, { Component, FunctionComponent } from 'react'
import { isFunction } from 'lodash'

function withDefaultProps<Props>(
  BaseComponent: typeof Component<Props>,
  defaultProps: Partial<Props> | ((props: Props) => Partial<Props>)
): FunctionComponent<Props>
function withDefaultProps<Props extends object>(
  BaseComponent: FunctionComponent<Props>,
  defaultProps: Partial<Props> | ((props: Props) => Partial<Props>)
): FunctionComponent<Props>
function withDefaultProps<Props extends object>(
  BaseComponent: FunctionComponent<Props> | typeof Component<Props>,
  defaultProps: Partial<Props> | ((props: Props) => Partial<Props>)
): FunctionComponent<Props> {
  return (props: Props) => {
    const computedDefaultProps = React.useMemo(
      () => (isFunction(defaultProps) ? defaultProps(props) : defaultProps),
      [props]
    )
    return <BaseComponent {...props} {...computedDefaultProps} />
  }
}

export default withDefaultProps
