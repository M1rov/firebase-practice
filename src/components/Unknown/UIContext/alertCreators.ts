import { AlertProps } from './index';

const createErrorAlert = (message: string): AlertProps => {
  return {
    show: true,
    severity: 'error',
    message,
  };
};

export default createErrorAlert;
