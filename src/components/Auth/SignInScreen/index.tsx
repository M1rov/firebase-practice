import React, { useContext, useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { RemoveRedEye } from '@mui/icons-material';
import { UIContext } from '../../Unknown/UIContext';
import heroImage from '../../../assets/images/hero.jpg';
import logo from '../../../assets/images/logo.svg';
import { auth } from '../../../common/firebaseApp';
import createErrorAlert from '../../Unknown/UIContext/alertCreators';

const SignInScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { setAlert } = useContext(UIContext);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignIn = React.useCallback(() => {
    setLoading(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        setAlert(createErrorAlert(err.message));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [setAlert, email, password]);

  return (
    <Grid container>
      <Box height="100vh">
        <img
          src={heroImage}
          alt="office"
          height="100%"
          style={{ display: 'block' }}
        />
      </Box>
      <Box
        height="100vh"
        display="flex"
        flex="1"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="center"
        paddingTop="150px"
      >
        <Container fixed maxWidth="sm">
          <Grid container justifyContent="center">
            <Grid item xs={12} textAlign="center" sx={{ mb: 3 }}>
              <img src={logo} alt="logo" />
            </Grid>
            <Grid item xs={12} textAlign="center" sx={{ mb: 5 }}>
              <Typography variant="h1">Login</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!email}
                helperText={!email ? 'Email is required!' : ' '}
                fullWidth
                variant="filled"
                InputProps={{
                  disableUnderline: true,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                label="Email"
                sx={{
                  mb: 5,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!password}
                helperText={!password ? 'Password is required!' : ' '}
                fullWidth
                variant="filled"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  disableUnderline: true,
                  endAdornment: (
                    <InputAdornment position="start">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <RemoveRedEye />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{
                  mb: 5,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                disabled={!(password && email) || loading}
                fullWidth
                type="button"
                variant="contained"
                sx={{
                  textAlign: 'center',
                  p: 1,
                }}
                onClick={handleSignIn}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Grid>
  );
};

export default SignInScreen;
