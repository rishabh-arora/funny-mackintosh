import { Request, Response, NextFunction } from 'express';
import { ash } from '../../../dev';
import { LotService } from './service';
import { Slot } from '../models/slot';

export const acquire = ash(async (req: Request, res: Response, next: NextFunction) => {
  const { vehicleNumber, type } = req.body;
  if (!type || !vehicleNumber) {
    return res.status(400).json({ error: 'missing vehicleNumber or type' });
  }
  try {
    const sl: Slot = LotService.acquire(vehicleNumber, type);
    return res.status(200).json(sl);
  } catch (err) {
    next(err);
    switch (err.message) {
      case 'not enough slots':
        return res.status(409).json({ error: 'capacity reached' });
      default:
        return res.status(500).json({ error: 'whaaa..?' });
    }
  }
});

export const release = ash(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const sl: { slot: Slot; price: number } = LotService.release(+id);
    return res.status(200).json(sl);
  } catch (err) {
    next(err);
    switch (err.message) {
      case '404':
        return res.status(404).json({ error: 'slot does not exist' });
      default:
        return res.status(500).json({ error: 'whaaa..?' });
    }
  }
});
