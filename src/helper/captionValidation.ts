import {Validations} from 'services/api.interfaces';

export const hasCaptionError = (validation: Validations | any) => {
  let error = false;
  Object.keys(validation).forEach((keyName: string) => {
    if (keyName !== 'repositext' && !validation[keyName]['valid']) {
      error = true;
    }
  });
  return error;
};
