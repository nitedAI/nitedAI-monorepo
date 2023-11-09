import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { useMockedUser } from 'src/hooks/use-mocked-user';

import { hideScroll } from 'src/theme/css';

import NavMini from 'src/components/NavMini';

import { NAV } from '../config-layout';

// ----------------------------------------------------------------------

interface Workspace {
  id: string;
  name: string;
  image: string;
}

export default function NavWorkspaces() {
  const sessionWorkspaces = sessionStorage.getItem('workspaces');
  const workspaces = sessionWorkspaces ? JSON.parse(sessionWorkspaces) : [];
  const user = sessionStorage.getItem('user');

  const navData = workspaces.map((w: Workspace) => {
    return {
      id: w.id,
      title: w.name,
      path: '/dashboard',
      image: w.image,
      info: '0',
    }
  });

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_MINI },
      }}
    >
      <Stack
        sx={{
          pt: 1,
          pb: 2,
          height: 1,
          position: 'fixed',
          backgroundColor: 'rgba(0, 0, 0, .2)',
          width: NAV.W_MINI,
          borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          ...hideScroll.x,
        }}
      >
        <NavMini
          data={navData}
          slotProps={{
            currentRole: user?.role,
          }}
        />
      </Stack>
    </Box>
  );
}
