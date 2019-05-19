import { IPictureOfEvent } from '@/shared/model/picture-of-event.model';
import { IVideoOfEvent } from '@/shared/model/video-of-event.model';

export interface IEventOfPlateMill {
  id?: number;
  eventDate?: Date;
  eventName?: string;
  pictureOfEvents?: IPictureOfEvent[];
  videoOfEvents?: IVideoOfEvent[];
}

export class EventOfPlateMill implements IEventOfPlateMill {
  constructor(
    public id?: number,
    public eventDate?: Date,
    public eventName?: string,
    public pictureOfEvents?: IPictureOfEvent[],
    public videoOfEvents?: IVideoOfEvent[]
  ) {}
}
