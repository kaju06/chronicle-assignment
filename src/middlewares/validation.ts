import Values from '../constants/values';
import { Request, Response, NextFunction } from 'express';
import { ValidationError, header } from 'express-validator';
import { validateRequest } from '../utils/validation.util';

export const checkIfUserEmailExistsInHeader = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors: Array<ValidationError> = await validateRequest(
    [
      header('email')
        .exists()
        .notEmpty()
        .withMessage(Values.MISSING_REQUEST_PARAM),
    ],
    req
  );
  if (!errors.length) {
    return next();
  }
  res.status(400).json(errors);
};
