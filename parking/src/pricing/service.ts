import { Slot } from '../models/slot';

class PricingServiceImpl {
  getPrice = (inTime: Date, outTime: Date): number => {
    /* Fixed mode */
    let val = Math.abs(outTime.getTime() - inTime.getTime());
    return this.roundToNearestHour(val) * 100;
    // return 100;
  };

  roundToNearestHour = (duration: number) => {
    return duration;
  };
}

export const PricingService = new PricingServiceImpl();
