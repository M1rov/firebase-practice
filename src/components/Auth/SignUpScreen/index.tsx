import React, { useContext, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import {
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { RemoveRedEye } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import logo from '../../../assets/images/logo.svg';
import heroImage from '../../../assets/images/hero.jpg';
import { UIContext } from '../../Unknown/UIContext';
import {
  validateEmail,
  validateName,
  validatePassword,
} from '../../../utils/validation';
import {
  createErrorAlert,
  createWelcomeAlert,
} from '../../Unknown/UIContext/alertCreators';
import { auth } from '../../../common/firebaseApp';

const SignUpScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [repeatedPassword, setRepeatedPassword] = useState<string>('');
  const [showRepeatedPassword, setShowRepeatedPassword] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { setAlert } = useContext(UIContext);

  const handleSignUp = React.useCallback(async () => {
    setLoading(true);
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        password,
      );

      await userCredential?.user?.updateProfile({
        displayName: name,
      });

      setAlert(createWelcomeAlert('Welcome on board 🚀'));
    } catch (err) {
      setAlert(createErrorAlert(err.message));
      setLoading(false);
    }
  }, [email, password, name, setAlert]);

  const isEmailValid = useMemo(() => {
    return validateEmail(email);
  }, [email]);

  const isNameValid = useMemo(() => {
    return validateName(name);
  }, [name]);

  const isPasswordValid = useMemo(() => {
    return validatePassword(password);
  }, [password]);

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
        justifyContent="space-between"
        alignItems="center"
        paddingTop="100px"
        paddingBottom="70px"
      >
        <Container fixed maxWidth="xs">
          <Grid container justifyContent="center">
            <Grid item xs={12} textAlign="center" sx={{ mb: 7 }}>
              <img src={logo} alt="logo" />
            </Grid>
            <Grid item xs={12} textAlign="center" sx={{ mb: 7 }}>
              <Typography variant="h3" fontWeight="600">
                Register
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!isEmailValid}
                helperText={!isEmailValid ? 'Email is not valid!' : ' '}
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
                  mb: 4,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={!isNameValid}
                helperText={!isNameValid ? 'Name is not valid!' : ' '}
                fullWidth
                variant="filled"
                InputProps={{
                  disableUnderline: true,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                label="Full name"
                sx={{
                  mb: 4,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!isPasswordValid}
                helperText={
                  !isPasswordValid ? 'Password must be 12+ characters!' : ' '
                }
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
                  mb: 4,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={repeatedPassword}
                onChange={(e) => setRepeatedPassword(e.target.value)}
                error={repeatedPassword !== password}
                helperText={
                  repeatedPassword !== password
                    ? 'Passwords are not the same!'
                    : ' '
                }
                fullWidth
                variant="filled"
                label="Repeat password"
                type={showRepeatedPassword ? 'text' : 'password'}
                InputProps={{
                  disableUnderline: true,
                  endAdornment: (
                    <InputAdornment position="start">
                      <IconButton
                        onClick={() =>
                          setShowRepeatedPassword(!showRepeatedPassword)
                        }
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
                  mb: 4,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                disabled={
                  !(
                    isEmailValid &&
                    isNameValid &&
                    isPasswordValid &&
                    password === repeatedPassword
                  ) || loading
                }
                fullWidth
                type="button"
                variant="contained"
                sx={{
                  textAlign: 'center',
                  p: 1,
                }}
                onClick={handleSignUp}
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </Container>
        <Container fixed maxWidth="xs">
          <Grid container fontWeight="600">
            <Grid item xs={12} textAlign="center" sx={{ mb: 3 }}>
              Already have account?
            </Grid>
            <Grid item xs={12} textAlign="center">
              <Link component={RouterLink} to="/login" underline="none">
                LOGIN
              </Link>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Grid>
  );
};

export default SignUpScreen;
