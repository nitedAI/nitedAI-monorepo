import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { getSession } from '@utils/getSession';

import { hideScroll } from 'src/theme/css';

import NavMini from 'src/components/NavMini';

import { NAV, HEADER } from '../config-layout';

// ----------------------------------------------------------------------

interface Workspace {
  id: string;
  title: string;
  image: string;
  role: string;
  path: string;
}

export default function NavWorkspaces() {
  const { workspaces, user } = getSession(['workspaces', 'user']);

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_MINI },
        flexDirection: { lg: 'row' },
      }}
    >
      <Box
        sx={{
          height: { xs: 1, lg: HEADER.H_DESKTOP },
          position: { lg: 'sticky' },
          top: { lg: 0 },
          display: { xs: 'none', lg: 'flex' },
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
        }}
      >
        LOGO
      </Box>
      <Stack
        sx={{
          pt: 1,
          pb: 2,
          height: 1,
          position: 'fixed',
          backgroundColor: 'rgba(0, 0, 0, .2)',
          width: NAV.W_MINI,
          ...hideScroll.x,
        }}
      >
        <NavMini
          data={workspaces}
          slotProps={{
            currentRole: user?.role,
          }}
        />
      </Stack>
    </Box>
  );
}
