import { Box } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@mui/material/Button';

const HomeScreen: React.FC = () => {
  return (
    <Box>
      <Button
        component={RouterLink}
        to="/flats"
        variant="contained"
        sx={{ marginTop: 5 }}
      >
        EXPLORE FLATS
      </Button>
    </Box>
  );
};

export default HomeScreen;
