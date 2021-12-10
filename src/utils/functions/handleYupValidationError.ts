import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { getValidationErrors } from '~/utils/functions';

export default function handleYupValidationError(error: Error): void {
  if (error instanceof Yup.ValidationError) {
    const errors = getValidationErrors(error);

    Object.values(errors).forEach((value) => {
      toast.error(`${value as string}`);
    });
  } else {
    toast.error(`${error.message}`);
  }
}
