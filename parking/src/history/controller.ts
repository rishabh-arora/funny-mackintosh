import { Request, Response, NextFunction } from 'express';
import { ash } from '../../../dev';
import { HistoryService } from './service';

export const events = ash(async (req: Request, res: Response, next: NextFunction) => {
  if (req.query.id) {
    const id: string = req.query.id as string;
    try {
      const history = HistoryService.getForVehicleNumber(id);
      return res.status(200).json(history);
    } catch (err) {
      next(err);
    }
  }
  return res.status(500);
});
