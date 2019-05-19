/* tslint:disable max-line-length */
import axios from 'axios';
import { format } from 'date-fns';

import * as config from '@/shared/config/config';
import { DATE_FORMAT } from '@/shared/date/filters';
import PictureOfEventService from '@/entities/picture-of-event/picture-of-event.service';
import { PictureOfEvent } from '@/shared/model/picture-of-event.model';

const mockedAxios: any = axios;
jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn()
}));

describe('Service Tests', () => {
  describe('PictureOfEvent Service', () => {
    let service: PictureOfEventService;
    let elemDefault;
    let currentDate: Date;
    beforeEach(() => {
      service = new PictureOfEventService();
      currentDate = new Date();

      elemDefault = new PictureOfEvent(0, currentDate, 'image/png', 'AAAAAAA');
    });

    describe('Service methods', async () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            picDate: format(currentDate, DATE_FORMAT)
          },
          elemDefault
        );
        mockedAxios.get.mockReturnValue(Promise.resolve({ data: returnedFromService }));

        service.find(123).then(res => {
          expect(res).toMatchObject(elemDefault);
        });
      });

      it('should create a PictureOfEvent', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            picDate: format(currentDate, DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            picDate: currentDate
          },
          returnedFromService
        );

        mockedAxios.post.mockReturnValue(Promise.resolve({ data: returnedFromService }));
        service.create({}).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should update a PictureOfEvent', async () => {
        const returnedFromService = Object.assign(
          {
            picDate: format(currentDate, DATE_FORMAT),
            imgFile: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            picDate: currentDate
          },
          returnedFromService
        );
        mockedAxios.put.mockReturnValue(Promise.resolve({ data: returnedFromService }));

        service.update(expected).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should return a list of PictureOfEvent', async () => {
        const returnedFromService = Object.assign(
          {
            picDate: format(currentDate, DATE_FORMAT),
            imgFile: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            picDate: currentDate
          },
          returnedFromService
        );
        mockedAxios.get.mockReturnValue(Promise.resolve([returnedFromService]));
        service.retrieve(expected).then(res => {
          expect(res).toContainEqual(expected);
        });
      });

      it('should delete a PictureOfEvent', async () => {
        mockedAxios.delete.mockReturnValue(Promise.resolve({ ok: true }));
        service.delete(123).then(res => {
          expect(res.ok);
        });
      });
    });
  });
});
