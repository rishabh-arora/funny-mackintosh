import { Request, Response, NextFunction } from 'express';
import { ash } from '../../../dev';

export const echo = ash(async (req: Request, res: Response, next: NextFunction) => {
  let response: any = {};
  if (req.query.what) {
    response.what = req.query.what;
  }
  return res.status(200).json(response);
});
