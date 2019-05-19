import { IEventOfPlateMill } from '@/shared/model/event-of-plate-mill.model';

export interface IPictureOfEvent {
  id?: number;
  picDate?: Date;
  imgFileContentType?: string;
  imgFile?: any;
  eventPM?: IEventOfPlateMill;
}

export class PictureOfEvent implements IPictureOfEvent {
  constructor(
    public id?: number,
    public picDate?: Date,
    public imgFileContentType?: string,
    public imgFile?: any,
    public eventPM?: IEventOfPlateMill
  ) {}
}
