/* tslint:disable max-line-length */
import axios from 'axios';
import { format } from 'date-fns';

import * as config from '@/shared/config/config';
import { DATE_FORMAT } from '@/shared/date/filters';
import HeavyPlateFinishedService from '@/entities/heavy-plate-finished/heavy-plate-finished.service';
import { HeavyPlateFinished, Shift } from '@/shared/model/heavy-plate-finished.model';

const mockedAxios: any = axios;
jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn()
}));

describe('Service Tests', () => {
  describe('HeavyPlateFinished Service', () => {
    let service: HeavyPlateFinishedService;
    let elemDefault;
    let currentDate: Date;
    beforeEach(() => {
      service = new HeavyPlateFinishedService();
      currentDate = new Date();

      elemDefault = new HeavyPlateFinished(0, currentDate, Shift.A, 0, 0);
    });

    describe('Service methods', async () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            hPFinishedDate: format(currentDate, DATE_FORMAT)
          },
          elemDefault
        );
        mockedAxios.get.mockReturnValue(Promise.resolve({ data: returnedFromService }));

        service.find(123).then(res => {
          expect(res).toMatchObject(elemDefault);
        });
      });

      it('should create a HeavyPlateFinished', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            hPFinishedDate: format(currentDate, DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            hPFinishedDate: currentDate
          },
          returnedFromService
        );

        mockedAxios.post.mockReturnValue(Promise.resolve({ data: returnedFromService }));
        service.create({}).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should update a HeavyPlateFinished', async () => {
        const returnedFromService = Object.assign(
          {
            hPFinishedDate: format(currentDate, DATE_FORMAT),
            shift: 'BBBBBB',
            noOfPlates: 1,
            hPFinishedTonnage: 1
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            hPFinishedDate: currentDate
          },
          returnedFromService
        );
        mockedAxios.put.mockReturnValue(Promise.resolve({ data: returnedFromService }));

        service.update(expected).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should return a list of HeavyPlateFinished', async () => {
        const returnedFromService = Object.assign(
          {
            hPFinishedDate: format(currentDate, DATE_FORMAT),
            shift: 'BBBBBB',
            noOfPlates: 1,
            hPFinishedTonnage: 1
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            hPFinishedDate: currentDate
          },
          returnedFromService
        );
        mockedAxios.get.mockReturnValue(Promise.resolve([returnedFromService]));
        service.retrieve(expected).then(res => {
          expect(res).toContainEqual(expected);
        });
      });

      it('should delete a HeavyPlateFinished', async () => {
        mockedAxios.delete.mockReturnValue(Promise.resolve({ ok: true }));
        service.delete(123).then(res => {
          expect(res.ok);
        });
      });
    });
  });
});
