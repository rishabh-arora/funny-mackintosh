import { LotRepo } from './repo';
import { Slot } from '../models/slot';
import { HistoryService } from '../history/service';
import { PricingService } from '../pricing/service';

class LotServiceImpl {
  acquire = (vehicleNumber: string, type: string): Slot => {
    /* lock here */
    const slot = LotRepo.acquire(vehicleNumber, type);
    /* ideally throw a message out to an exchange or broker */
    new Promise(() => {
      HistoryService.record(slot);
    });
    return slot;
  };

  release = (slot: number): { slot: Slot; price: number } => {
    /* lock here */
    const sl = LotRepo.release(slot);
    new Promise(() => {
      HistoryService.record(sl);
    });

    const price = PricingService.getPrice(sl.occupiedAt!, new Date());
    return { slot: sl, price };
  };
}

export const LotService = new LotServiceImpl();
