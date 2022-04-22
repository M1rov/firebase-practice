import { alpha, createTheme } from '@mui/material';
import { grey, pink } from '@mui/material/colors';

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
          padding: '5px',
          fontWeight: 500,
        },
      },
      variants: [
        {
          props: { variant: 'outlined' },
          style: { background: alpha(pink[50], 0.7) },
        },
      ],
    },
    MuiFilledInput: {
      defaultProps: {
        disableUnderline: true,
      },
    },
    MuiInputLabel: {
      defaultProps: {
        shrink: true,
      },
    },
  },
  typography: {
    subtitle1: {
      fontSize: 12,
      color: grey[500],
    },
    subtitle2: {
      fontSize: 10,
      color: grey[500],
    },
  },
});

export default defaultTheme;
