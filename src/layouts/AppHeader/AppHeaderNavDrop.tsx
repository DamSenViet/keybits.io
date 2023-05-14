import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse'
import ClickAwayListener from '@mui/base/ClickAwayListener';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import SvgHamburgerMenu from '@/components/icons/SvgHamburgerMenu';
import colors from '@/theme/colors';
import routes from '@/routes';

const navLinks = [
  routes.editor,
  routes.studio,
  routes.labs,
];

const Anchor = styled('a')<{ component?: React.ElementType; noLinkStyle?: boolean }>(
  ({ theme }) => [
    {
      ...theme.typography.body2,
      fontWeight: theme.typography.fontWeightBold,
      textDecoration: 'none',
      border: 'none',
      width: '100%',
      backgroundColor: 'transparent',
      color: theme.palette.text.primary,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(1),
      borderRadius: theme.spacing(1),
      transition: theme.transitions.create('background'),
      '&:hover, &:focus-visible': {
        color: theme.palette.background.default,
        backgroundColor: colors.hanPurple,
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: colors.hanPurple,
        },
      },
    },
  ],
);

const Ul = styled('ul')({
  listStyleType: 'none',
  padding: 0,
  margin: 0,
});

/**
 * The header navigation as a dropdown list of elements.
 */
export default function AppHeaderNavDrop() {
  const [open, setOpen] = React.useState(false);
  const hambugerRef = React.useRef<HTMLButtonElement | null>(null);  
  return (
    <>
      <IconButton
        size='small'
        ref={hambugerRef}
        disableRipple
        onClick={() => setOpen(value => !value)}
        sx={{
          position: 'relative',
        }}
      >
        <SvgHamburgerMenu open={open} />
      </IconButton>
      <ClickAwayListener
        onClickAway={(event) => {
          if (
            hambugerRef.current &&
            !hambugerRef.current.contains(event.target as HTMLElement)
          )
            setOpen(false);
        }}
      >
        <Collapse
          in={open}
          sx={{
            position: 'absolute',
            top: 56,
            left: 0,
            right: 0,
            boxShadow: `0px 4px 20px rgba(170, 180, 190, 0.3)`,
          }}
        >
          <Box
            sx={(theme) => ({
              p: 2,
              bgcolor: theme.palette.background.paper,
              maxHeight: 'calc(100vh - 56px)',
              overflow: 'auto',
            })}
          >
            <Ul>
              {navLinks.map(navLink => (
                <li key={navLink.label}>
                  <Anchor>
                    {navLink.label}
                  </Anchor>
                </li>
              ))}
            </Ul>
          </Box>
        </Collapse>
      </ClickAwayListener>
    </>
  );
};