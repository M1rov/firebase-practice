import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import {
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { RemoveRedEye } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import { Formik } from 'formik';
import heroImage from '../hero.jpg';
import { UIContext } from '../../Unknown/UIContext';
import {
  createErrorAlert,
  createWelcomeAlert,
} from '../../Unknown/UIContext/alertCreators';
import { auth } from '../../../common/firebaseApp';
import { ReactComponent as VoypostLogo } from '../logo.svg';
import validationSchema from './validationSchema';

const SignUpScreen: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const { setAlert } = useContext(UIContext);

  const handleSignUp = React.useCallback(
    async ({ email, name, password }) => {
      try {
        const userCredential = await auth.createUserWithEmailAndPassword(
          email,
          password,
        );
        if (userCredential.user) {
          await userCredential.user.updateProfile({
            displayName: name,
          });
        } else {
          setAlert(createErrorAlert('Server Error! Please, try later!'));
          return;
        }
        setAlert(createWelcomeAlert('Welcome on board 🚀'));
      } catch (err) {
        setAlert(createErrorAlert(err.message));
      }
    },
    [setAlert],
  );

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
            <Grid item xs={12} textAlign="center" marginBottom={7}>
              <VoypostLogo />
            </Grid>
            <Grid item xs={12} textAlign="center" marginBottom={7}>
              <Typography variant="h3" fontWeight="600">
                Register
              </Typography>
            </Grid>
            <Formik
              initialValues={{
                email: '',
                name: '',
                password: '',
                confirmPassword: '',
              }}
              onSubmit={handleSignUp}
              validationSchema={validationSchema}
            >
              {({
                errors,
                handleSubmit,
                touched,
                handleBlur,
                handleChange,
                dirty,
                isSubmitting,
                isValid,
              }) => (
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                  <Grid item xs={12} marginBottom={4}>
                    <TextField
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!errors.email && touched.email}
                      helperText={
                        errors.email && touched.email ? errors.email : ' '
                      }
                      fullWidth
                      variant="filled"
                      label="Email"
                    />
                  </Grid>
                  <Grid item xs={12} marginBottom={4}>
                    <TextField
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!errors.name && touched.name}
                      helperText={
                        errors.name && touched.name ? errors.name : ' '
                      }
                      fullWidth
                      variant="filled"
                      label="Full name"
                    />
                  </Grid>
                  <Grid item xs={12} marginBottom={4}>
                    <TextField
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!errors.password && touched.password}
                      helperText={
                        errors.password && touched.password
                          ? errors.password
                          : ' '
                      }
                      fullWidth
                      variant="filled"
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                      InputProps={{
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
                    />
                  </Grid>
                  <Grid item xs={12} marginBottom={4}>
                    <TextField
                      name="confirmPassword"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        !!errors.confirmPassword && touched.confirmPassword
                      }
                      helperText={
                        errors.confirmPassword && touched.confirmPassword
                          ? errors.confirmPassword
                          : ' '
                      }
                      fullWidth
                      variant="filled"
                      label="Repeat password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">
                            <IconButton
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                            >
                              <RemoveRedEye />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      disabled={!isValid || !dirty || isSubmitting}
                      type="submit"
                      variant="contained"
                    >
                      Register
                    </Button>
                  </Grid>
                </form>
              )}
            </Formik>
          </Grid>
        </Container>
        <Container fixed maxWidth="xs">
          <Grid container fontWeight="600">
            <Grid item xs={12} textAlign="center" marginBottom={3}>
              Already have account?
            </Grid>
            <Grid item xs={12} textAlign="center">
              <Button component={RouterLink} to="/login" fullWidth>
                LOGIN
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Grid>
  );
};

export default SignUpScreen;
