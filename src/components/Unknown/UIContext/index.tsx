import React, { createContext, useState } from 'react';
import MuiAlert, { AlertColor } from '@mui/lab/Alert';
import { Snackbar, SnackbarOrigin } from '@mui/material';

export const UIContext = createContext<UIContextProps>({} as UIContextProps);

interface UIContextProps {
  setAlert: React.Dispatch<React.SetStateAction<AlertProps>>;
}

export interface AlertProps {
  show: boolean;
  severity?: AlertColor;
  position?: SnackbarOrigin;
  message?: string;
  icon?: boolean;
  color?: string;
  backgroundColor?: string;
}

export const UIContextProvider: React.FC = ({ children }) => {
  const [alert, setAlert] = useState<AlertProps>({
    show: false,
    position: { vertical: 'bottom', horizontal: 'left' },
    severity: 'info',
    message: '',
  });

  const handleClose = () =>
    setAlert({
      show: false,
    });

  return (
    <UIContext.Provider value={{ setAlert }}>
      {children}
      <Snackbar
        anchorOrigin={alert.position}
        open={alert.show}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <MuiAlert
          sx={{
            backgroundColor: alert.backgroundColor,
          }}
          icon={alert.icon}
          elevation={6}
          variant="filled"
          severity={alert.severity}
        >
          {alert.message}
        </MuiAlert>
      </Snackbar>
    </UIContext.Provider>
  );
};
