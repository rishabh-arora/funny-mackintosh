export interface Lot {
  id: number;
  capacity: number;
}

export interface Slot {
  id: number;
  status: string;
  vehicleNumber?: string;
  type: string;
  occupiedAt?: Date;
  releasedAt?: Date;
}

export enum SlotStatus {
  ACQUIRED = 'ACQUIRED',
  AVAILABLE = 'AVAILABLE',
}
