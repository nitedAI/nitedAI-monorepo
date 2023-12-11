import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { useMockedUser } from 'src/hooks/use-mocked-user';

import Scrollbar from 'src/components/scrollbar';
import { NavSectionVertical } from 'src/components/nav-section';

import { NAV, HEADER } from '../config-layout';
import { useNavData } from './config-navigation';

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
      <Box
        sx={{
          height: { xs: 1, lg: HEADER.H_DESKTOP },
          position: { lg: 'sticky' },
          top: { lg: 0 },
          display: { xs: 'none', lg: 'flex' },
          alignItems: 'center',
          borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
          paddingLeft: 3,
          color: 'text.primary',
          fontWeight: 'fontWeightBold',
        }}
      >
        Channel Name
      </Box>
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
        backgroundColor: '#212B36',
      }}
    >
      <Stack
        sx={{
          height: 1,
          position: 'fixed',
          width: NAV.W_VERTICAL,
        }}
      >
        {renderContent}
      </Stack>
    </Box>
  );
}
