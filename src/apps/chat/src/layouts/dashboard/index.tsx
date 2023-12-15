import Box from '@mui/material/Box';

import Main from './main';
import Header from './header';
import NavVertical from './NavVertical';
import NavWorkspaces from './NavWorkspaces';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {

  return (
    <>
      <Header />

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <NavWorkspaces />
        <NavVertical />

        <Main>{children}</Main>
      </Box>
    </>
  );
}
