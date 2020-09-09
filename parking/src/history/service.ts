import { Slot } from '../models/slot';

class HistoryServiceImpl {
  history: any[] = [];
  record = (evt: any) => {
    console.log(evt);
    this.history.push(evt);
  };

  getForVehicleNumber = (vehiceNumber: string): any[] => {
    return this.history.filter(e => e.vehicleNumber === vehiceNumber);
  };
}

export const HistoryService = new HistoryServiceImpl();
