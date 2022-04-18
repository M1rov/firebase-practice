import React, { useContext, useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { RemoveRedEye } from '@mui/icons-material';
import * as yup from 'yup';
import { Formik } from 'formik';
import { UIContext } from '../../Unknown/UIContext';
import heroImage from '../hero.jpg';
import { auth } from '../../../common/firebaseApp';
import { createErrorAlert } from '../../Unknown/UIContext/alertCreators';
import VoypostLogo from '../VoypostLogo';

const SignInScreen: React.FC = () => {
  const { setAlert } = useContext(UIContext);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSignIn = React.useCallback(
    async ({ email, password }) => {
      try {
        await auth.signInWithEmailAndPassword(email, password);
      } catch (err) {
        setAlert(createErrorAlert(err.message));
      }
    },
    [setAlert],
  );

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Email is incorrect!')
      .required('Email is required!'),
    password: yup.string().min(12).required('Password is required!'),
  });

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
              <VoypostLogo />
            </Grid>
            <Grid item xs={12} textAlign="center" sx={{ mb: 7 }}>
              <Typography variant="h3" fontWeight="600">
                Login
              </Typography>
            </Grid>
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              onSubmit={handleSignIn}
              validationSchema={validationSchema}
            >
              {({
                errors,
                handleChange,
                isValid,
                isSubmitting,
                dirty,
                handleSubmit,
                handleBlur,
                touched,
              }) => (
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                  <Grid item xs={12}>
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
                    <Button
                      disabled={!isValid || !dirty || isSubmitting}
                      fullWidth
                      type="submit"
                      variant="contained"
                      sx={{
                        textAlign: 'center',
                        p: 1,
                      }}
                    >
                      Login
                    </Button>
                  </Grid>
                </form>
              )}
            </Formik>
          </Grid>
        </Container>
        <Container fixed maxWidth="xs">
          <Grid container fontWeight="600">
            <Grid item xs={12} textAlign="center" sx={{ mb: 3 }}>
              Don&apos;t have an account?
            </Grid>
            <Grid item xs={12} textAlign="center">
              <Link component={RouterLink} to="/register" underline="none">
                REGISTER
              </Link>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Grid>
  );
};

export default SignInScreen;
