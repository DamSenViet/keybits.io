import * as React from 'react'
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon'
import { styled } from '@mui/material/styles'
import colors from '@/theme/colors'

export type SvgHamburgerMenu = SvgIconProps & { open?: boolean }

const Rect = styled('rect')({
  transformOrigin: 'center',
  transition: '0.2s',
})

export default function SvgHamburgerMenu({
  open = false,
  ...props
}: SvgHamburgerMenu) {
  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <Rect
        x={1}
        y={5}
        width={14}
        height={1.5}
        rx={1}
        fill={colors.blackRussian}
        sx={{
          ...(open && {
            transform: 'translate(1.5px, 1.6px) rotateZ(-45deg)',
          }),
        }}
      />
      <Rect
        x={1}
        y={9}
        width={14}
        height={1.5}
        rx={1}
        fill={colors.blackRussian}
        sx={{
          ...(open && {
            transform: 'translate(1.5px, -1.2px) rotateZ(45deg)',
          }),
        }}
      />
    </SvgIcon>
  )
}
