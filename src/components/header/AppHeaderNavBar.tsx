import * as React from 'react'
import { styled } from '@mui/material/styles'
import Link from '@mui/material/Link'
import routes from '@/routes'

const navLinks = [routes.editor, routes.studio, routes.labs]

const Ul = styled('ul')(() => ({
  padding: 0,
  margin: 0,
  listStyle: 'none',
  display: 'flex',
}))

const Li = styled('li')(({ theme }) => ({}))

const Nav = styled('nav')(({ theme }) => [
  {
    '& li': {
      color: theme.palette.text.primary,
      ...theme.typography.body2,
      fontWeight: theme.typography.fontWeightMedium,
      '& > a, & > div': {
        display: 'inline-block',
        color: 'inherit',
        textDecoration: 'none',
        padding: theme.spacing('8px', 1),
        borderRadius: theme.shape.borderRadius,
        '&:hover': {
          color: theme.palette.grey[700],
          backgroundColor: theme.palette.grey[50],
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor: 'initial',
          },
        },
        '&:focus-visible': {
          color: theme.palette.grey[700],
          outline: 0,
          backgroundColor: theme.palette.grey[100],
        },
      },
      '& > div': {
        cursor: 'default',
      },
    },
  },
])

/**
 * The header navigation as a horizontal list of elements.
 */
export default function AppHeaderNavBar() {
  return (
    <>
      <Nav>
        <Ul role="menubar">
          {navLinks.map((navLink, i) => (
            <li key={i}>
              <Link href={navLink.href}>{navLink.label.toUpperCase()}</Link>
            </li>
          ))}
        </Ul>
      </Nav>
    </>
  )
}
