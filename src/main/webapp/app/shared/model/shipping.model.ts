import { IShiftManager } from '@/shared/model/shift-manager.model';

export const enum Shift {
  A = 'A',
  B = 'B',
  C = 'C'
}

export interface IShipping {
  id?: number;
  shippingDate?: Date;
  shift?: Shift;
  noOfWagons?: number;
  noOfTrailers?: number;
  shippedTonnage?: number;
  manager?: IShiftManager;
}

export class Shipping implements IShipping {
  constructor(
    public id?: number,
    public shippingDate?: Date,
    public shift?: Shift,
    public noOfWagons?: number,
    public noOfTrailers?: number,
    public shippedTonnage?: number,
    public manager?: IShiftManager
  ) {}
}
