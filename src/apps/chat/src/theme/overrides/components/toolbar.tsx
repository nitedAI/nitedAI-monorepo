import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export function toolbar(theme: Theme) {
  return {
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: '48px',
        },
      },
    },
  };
}
