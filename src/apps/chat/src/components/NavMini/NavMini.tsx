import { memo } from 'react';
import { NavMiniProps } from '@ts/Nav';

import Stack from '@mui/material/Stack';

import NavMiniList from './NavMiniList';

// ----------------------------------------------------------------------

function NavMini({ data, slotProps, ...other }: NavMiniProps) {
  return (
    <Stack component="nav" id="nav-section-mini" spacing="4px" {...other}>
      {data.map((item) => (
        <NavMiniList key={item.id} data={item} slotProps={slotProps} />
      ))}
    </Stack>
  );
}

export default memo(NavMini);
