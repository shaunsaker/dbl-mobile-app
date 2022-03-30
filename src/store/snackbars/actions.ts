import { createStandardAction } from 'typesafe-actions';
import { SnackbarType } from './models';

export const showSnackbar = createStandardAction('SNACKBARS/showSnackbar')<{
  type: SnackbarType;
  title: string;
  description: string;
}>();
