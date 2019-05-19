import { IEventOfPlateMill } from '@/shared/model/event-of-plate-mill.model';

export interface IVideoOfEvent {
  id?: number;
  videoDate?: Date;
  videoFileContentType?: string;
  videoFile?: any;
  eventPM?: IEventOfPlateMill;
}

export class VideoOfEvent implements IVideoOfEvent {
  constructor(
    public id?: number,
    public videoDate?: Date,
    public videoFileContentType?: string,
    public videoFile?: any,
    public eventPM?: IEventOfPlateMill
  ) {}
}
