import { IShiftManager } from '@/shared/model/shift-manager.model';

export const enum Shift {
  A = 'A',
  B = 'B',
  C = 'C'
}

export interface INormalising {
  id?: number;
  normalisingDate?: Date;
  shift?: Shift;
  noOfPlates?: number;
  normalisedTonnage?: number;
  manager?: IShiftManager;
}

export class Normalising implements INormalising {
  constructor(
    public id?: number,
    public normalisingDate?: Date,
    public shift?: Shift,
    public noOfPlates?: number,
    public normalisedTonnage?: number,
    public manager?: IShiftManager
  ) {}
}
