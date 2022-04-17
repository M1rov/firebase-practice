import { AlertProps } from './index';

export const createErrorAlert = (message: string): AlertProps => {
  return {
    show: true,
    severity: 'error',
    message,
  };
};

export const createWelcomeAlert = (message: string): AlertProps => {
  return {
    show: true,
    position: {
      vertical: 'bottom',
      horizontal: 'center',
    },
    message,
    icon: false,
    backgroundColor: 'rgba(0,0,0,0.9)',
  };
};
