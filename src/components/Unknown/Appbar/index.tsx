import React, { useContext, useState } from 'react';
import {
  AppBar,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useUser } from 'reactfire';
import getUserInitials from '../HomeScreen/getUserInitials';
import { UIContext } from '../UIContext';
import { auth } from '../../../common/firebaseApp';
import clearFirestoreCache from '../../../common/clearFirestoreCache';
import { createErrorAlert } from '../UIContext/alertCreators';

const Navbar: React.FC = () => {
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
  );
};

export default Navbar;
