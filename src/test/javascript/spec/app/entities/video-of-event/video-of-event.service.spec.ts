/* tslint:disable max-line-length */
import axios from 'axios';
import { format } from 'date-fns';

import * as config from '@/shared/config/config';
import { DATE_FORMAT } from '@/shared/date/filters';
import VideoOfEventService from '@/entities/video-of-event/video-of-event.service';
import { VideoOfEvent } from '@/shared/model/video-of-event.model';

const mockedAxios: any = axios;
jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn()
}));

describe('Service Tests', () => {
  describe('VideoOfEvent Service', () => {
    let service: VideoOfEventService;
    let elemDefault;
    let currentDate: Date;
    beforeEach(() => {
      service = new VideoOfEventService();
      currentDate = new Date();

      elemDefault = new VideoOfEvent(0, currentDate, 'image/png', 'AAAAAAA');
    });

    describe('Service methods', async () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            videoDate: format(currentDate, DATE_FORMAT)
          },
          elemDefault
        );
        mockedAxios.get.mockReturnValue(Promise.resolve({ data: returnedFromService }));

        service.find(123).then(res => {
          expect(res).toMatchObject(elemDefault);
        });
      });

      it('should create a VideoOfEvent', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            videoDate: format(currentDate, DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            videoDate: currentDate
          },
          returnedFromService
        );

        mockedAxios.post.mockReturnValue(Promise.resolve({ data: returnedFromService }));
        service.create({}).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should update a VideoOfEvent', async () => {
        const returnedFromService = Object.assign(
          {
            videoDate: format(currentDate, DATE_FORMAT),
            videoFile: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            videoDate: currentDate
          },
          returnedFromService
        );
        mockedAxios.put.mockReturnValue(Promise.resolve({ data: returnedFromService }));

        service.update(expected).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should return a list of VideoOfEvent', async () => {
        const returnedFromService = Object.assign(
          {
            videoDate: format(currentDate, DATE_FORMAT),
            videoFile: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            videoDate: currentDate
          },
          returnedFromService
        );
        mockedAxios.get.mockReturnValue(Promise.resolve([returnedFromService]));
        service.retrieve().then(res => {
          expect(res).toContainEqual(expected);
        });
      });

      it('should delete a VideoOfEvent', async () => {
        mockedAxios.delete.mockReturnValue(Promise.resolve({ ok: true }));
        service.delete(123).then(res => {
          expect(res.ok);
        });
      });
    });
  });
});
