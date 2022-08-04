import { validationResult } from 'express-validator';

export const validateRequest = async (validations: any, req: any) => {
  await Promise.all(validations.map((validation: any) => validation.run(req)));

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return [];
  }
  return errors.array();
};
