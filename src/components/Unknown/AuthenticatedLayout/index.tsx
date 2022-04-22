import { Box } from '@mui/material';
import React from 'react';
import Navbar from '../Appbar';

interface AuthenticatedLayoutProps {
  children: React.ReactElement;
}

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({
  children,
}: AuthenticatedLayoutProps) => {
  return (
    <Box
      paddingTop="56px"
      height="100vh"
      display="flex"
      justifyContent="center"
    >
      <Navbar />
      {children}
    </Box>
  );
};

export default AuthenticatedLayout;
