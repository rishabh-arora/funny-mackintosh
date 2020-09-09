import { Slot, SlotStatus } from '../models/slot';

export class LotRepository {
  slots: Slot[] = [
    { id: 1, status: 'AVAILABLE', type: '2' },
    { id: 2, status: 'AVAILABLE', type: '2' },
    { id: 3, status: 'AVAILABLE', type: '4' },
    { id: 4, status: 'AVAILABLE', type: '4' },
  ];

  nextAvailable = (type: string): Slot | undefined => {
    return this.slots.find(s => s.type === type && s.status === 'AVAILABLE');
  };

  acquire = (vehicleNumber: string, type: string): Slot => {
    const next = this.nextAvailable(type);
    if (next) {
      next.status = SlotStatus.ACQUIRED;
      next.vehicleNumber = vehicleNumber;
      next.occupiedAt = new Date();
      next.releasedAt = undefined;
      return next;
    }
    throw new Error('not enough slots');
  };

  release = (slot: number): Slot => {
    const s: Slot | undefined = this.slots.find(s => s.id === slot);
    if (!s) throw new Error('404');
    s.status = SlotStatus.AVAILABLE;
    s.vehicleNumber = undefined;
    s.occupiedAt = undefined;
    s.releasedAt = new Date();
    return s;
  };
}

export const LotRepo = new LotRepository();
Object.seal(LotRepo);
