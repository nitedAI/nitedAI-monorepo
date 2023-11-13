import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { useMockedUser } from 'src/hooks/use-mocked-user';

import Scrollbar from 'src/components/scrollbar';
import { NavSectionVertical } from 'src/components/nav-section';

import { NAV } from '../config-layout';
import { useNavData } from './config-navigation';
import { cp } from 'fs';

// ----------------------------------------------------------------------

export default function NavVertical() {
  const { user } = useMockedUser();
  const navData = useNavData();

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >

      <NavSectionVertical
        data={navData}
        slotProps={{
          currentRole: user?.role,
        }}
      />
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_VERTICAL },
        backgroundColor: 'rgba(0, 0, 0, .1)',
      }}
    >
      <Stack
        sx={{
          height: 1,
          position: 'fixed',
          width: NAV.W_VERTICAL,
          borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
        }}
      >
        {renderContent}
      </Stack>
    </Box>
  );
}
