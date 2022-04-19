import { alpha, createTheme } from '@mui/material';
import { pink } from '@mui/material/colors';

const defaultTheme = createTheme({
  palette: {
    primary: pink,
    info: {
      main: alpha('#000', 0.9),
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          width: '100%',
          padding: '10px',
          fontWeight: 500,
        },
      },
    },
  },
});

export default defaultTheme;
