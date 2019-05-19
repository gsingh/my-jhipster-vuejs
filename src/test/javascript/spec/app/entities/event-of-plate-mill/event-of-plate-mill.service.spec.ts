/* tslint:disable max-line-length */
import axios from 'axios';
import { format } from 'date-fns';

import * as config from '@/shared/config/config';
import { DATE_FORMAT } from '@/shared/date/filters';
import EventOfPlateMillService from '@/entities/event-of-plate-mill/event-of-plate-mill.service';
import { EventOfPlateMill } from '@/shared/model/event-of-plate-mill.model';

const mockedAxios: any = axios;
jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn()
}));

describe('Service Tests', () => {
  describe('EventOfPlateMill Service', () => {
    let service: EventOfPlateMillService;
    let elemDefault;
    let currentDate: Date;
    beforeEach(() => {
      service = new EventOfPlateMillService();
      currentDate = new Date();

      elemDefault = new EventOfPlateMill(0, currentDate, 'AAAAAAA');
    });

    describe('Service methods', async () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            eventDate: format(currentDate, DATE_FORMAT)
          },
          elemDefault
        );
        mockedAxios.get.mockReturnValue(Promise.resolve({ data: returnedFromService }));

        service.find(123).then(res => {
          expect(res).toMatchObject(elemDefault);
        });
      });

      it('should create a EventOfPlateMill', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            eventDate: format(currentDate, DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            eventDate: currentDate
          },
          returnedFromService
        );

        mockedAxios.post.mockReturnValue(Promise.resolve({ data: returnedFromService }));
        service.create({}).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should update a EventOfPlateMill', async () => {
        const returnedFromService = Object.assign(
          {
            eventDate: format(currentDate, DATE_FORMAT),
            eventName: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            eventDate: currentDate
          },
          returnedFromService
        );
        mockedAxios.put.mockReturnValue(Promise.resolve({ data: returnedFromService }));

        service.update(expected).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should return a list of EventOfPlateMill', async () => {
        const returnedFromService = Object.assign(
          {
            eventDate: format(currentDate, DATE_FORMAT),
            eventName: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            eventDate: currentDate
          },
          returnedFromService
        );
        mockedAxios.get.mockReturnValue(Promise.resolve([returnedFromService]));
        service.retrieve(expected).then(res => {
          expect(res).toContainEqual(expected);
        });
      });

      it('should delete a EventOfPlateMill', async () => {
        mockedAxios.delete.mockReturnValue(Promise.resolve({ ok: true }));
        service.delete(123).then(res => {
          expect(res.ok);
        });
      });
    });
  });
});
