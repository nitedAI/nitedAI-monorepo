import { forwardRef } from 'react';
import { NavItemProps, NavItemStateProps } from '@ts/Nav';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { alpha, styled } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';

import { RouterLink } from 'src/routes/components';

import NavAvatar from './NavAvatar';

// ----------------------------------------------------------------------

const NavMiniItem = forwardRef<HTMLDivElement, NavItemProps>(
  (
    {
      title,
      path,
      image,
      info,
      disabled,
      roles,
      //
      open,
      depth,
      active,
      currentRole = 'admin',
      ...other
    },
    ref
  ) => {

    const badgeVisible = Number(info) > 0;

    const renderContent = (
      <StyledNavItem
        disableGutters
        ref={ref}
        open={open}
        depth={depth}
        active={active}
        disabled={disabled}
        {...other}
      >
        <NavAvatar title={title} image={image} invisible={!badgeVisible} />

        {title && (
          <Box component="span" className="label">
            {title}
          </Box>
        )}
      </StyledNavItem>
    );

    // Hidden item by role
    if (roles && !roles.includes(`${currentRole}`)) {
      return null;
    }

    return (
      <Link
        component={disabled ? 'div' : RouterLink}
        href={path}
        color="inherit"
        underline="none"
        sx={{
          width: 1,
          ...(disabled && {
            cursor: 'default',
          }),
        }}
      >
        {renderContent}
      </Link>
    );
  }
);

export default NavMiniItem;

// ----------------------------------------------------------------------

const StyledNavItem = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'active',
})<NavItemStateProps>(({ active, open, depth, theme }) => {
  const subItem = depth !== 1;

  const opened = open && !active;

  const lightMode = theme.palette.mode === 'light';

  const noWrapStyles = {
    width: '100%',
    maxWidth: '100%',
    display: 'block',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  } as const;

  const baseStyles = {
    item: {
      borderRadius: 6,
      color: theme.palette.text.secondary,
    },
    icon: {
      width: 22,
      height: 22,
      flexShrink: 0,
    },
    label: {
      textTransform: 'capitalize',
    },
    caption: {
      color: theme.palette.text.disabled,
    },
  } as const;

  return {
    // Root item
    ...(!subItem && {
      ...baseStyles.item,
      fontSize: 10,
      minHeight: 56,
      lineHeight: '16px',
      textAlign: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: theme.spacing(0.5),
      margin: theme.spacing(0, 0.5),
      fontWeight: theme.typography.fontWeightSemiBold,
      '& .icon': {
        ...baseStyles.icon,
      },
      '& .label': {
        ...noWrapStyles,
        ...baseStyles.label,
        marginTop: theme.spacing(0.5),
      },
      '& .caption': {
        ...baseStyles.caption,
        top: 11,
        left: 6,
        position: 'absolute',
      },
      '& .arrow': {
        top: 11,
        right: 6,
        position: 'absolute',
      },
      ...(active && {
        fontWeight: theme.typography.fontWeightBold,
        backgroundColor: alpha(theme.palette.primary.main, 0.08),
        color: lightMode ? theme.palette.primary.main : theme.palette.primary.light,
        '&:hover': {
          backgroundColor: alpha(theme.palette.primary.main, 0.16),
        },
      }),
      ...(opened && {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.action.hover,
      }),
    }),

    // Sub item
    ...(subItem && {
      ...baseStyles.item,
      ...theme.typography.body2,
      minHeight: 34,
      padding: theme.spacing(0, 1),
      fontWeight: theme.typography.fontWeightMedium,
      '& .icon': {
        ...baseStyles.icon,
        marginRight: theme.spacing(1),
      },
      '& .label': {
        ...baseStyles.label,
        flexGrow: 1,
      },
      '& .caption': {
        ...baseStyles.caption,
        marginLeft: theme.spacing(0.75),
      },
      '& .info': {
        display: 'inline-flex',
        marginLeft: theme.spacing(0.75),
      },
      '& .arrow': {
        marginLeft: theme.spacing(0.75),
        marginRight: theme.spacing(-0.5),
      },
      ...(active && {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.action.selected,
        fontWeight: theme.typography.fontWeightSemiBold,
      }),
      ...(opened && {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.action.hover,
      }),
    }),
  };
});
