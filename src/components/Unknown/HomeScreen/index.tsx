import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useContext, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { useUser } from 'reactfire';
import { auth } from '../../../common/firebaseApp';
import getUserInitials from './getUserInitials';
import clearFirestoreCache from '../../../common/clearFirestoreCache';
import { UIContext } from '../UIContext';
import { createErrorAlert } from '../UIContext/alertCreators';

const HomeScreen: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { setAlert } = useContext(UIContext);
  const isOpen = !!anchorEl;

  const { status, data: user } = useUser();

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = React.useCallback(async () => {
    try {
      await auth.signOut();
      clearFirestoreCache();
    } catch (err) {
      setAlert(createErrorAlert(err.message));
    }
  }, [setAlert]);

  if (status === 'loading') {
    return null;
  }

  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <AppBar>
        <Toolbar variant="dense">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Voypost
          </Typography>
          <IconButton onClick={handleClick}>
            <Avatar>
              {user.displayName ? getUserInitials(user.displayName) : 'U'}
            </Avatar>
          </IconButton>
          <Menu
            color="secondary"
            open={isOpen}
            anchorEl={anchorEl}
            onClose={handleClose}
          >
            <MenuItem onClick={handleSignOut}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default HomeScreen;
