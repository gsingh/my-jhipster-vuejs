/* tslint:disable max-line-length */
import axios from 'axios';
import { format } from 'date-fns';

import * as config from '@/shared/config/config';
import { DATE_FORMAT } from '@/shared/date/filters';
import ProductionService from '@/entities/production/production.service';
import { Production, Shift } from '@/shared/model/production.model';

const mockedAxios: any = axios;
jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn()
}));

describe('Service Tests', () => {
  describe('Production Service', () => {
    let service: ProductionService;
    let elemDefault;
    let currentDate: Date;
    beforeEach(() => {
      service = new ProductionService();
      currentDate = new Date();

      elemDefault = new Production(0, currentDate, Shift.A, 0, 0);
    });

    describe('Service methods', async () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            prodDate: format(currentDate, DATE_FORMAT)
          },
          elemDefault
        );
        mockedAxios.get.mockReturnValue(Promise.resolve({ data: returnedFromService }));

        service.find(123).then(res => {
          expect(res).toMatchObject(elemDefault);
        });
      });

      it('should create a Production', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            prodDate: format(currentDate, DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            prodDate: currentDate
          },
          returnedFromService
        );

        mockedAxios.post.mockReturnValue(Promise.resolve({ data: returnedFromService }));
        service.create({}).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should update a Production', async () => {
        const returnedFromService = Object.assign(
          {
            prodDate: format(currentDate, DATE_FORMAT),
            shift: 'BBBBBB',
            noOfPlates: 1,
            prodTonnage: 1
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            prodDate: currentDate
          },
          returnedFromService
        );
        mockedAxios.put.mockReturnValue(Promise.resolve({ data: returnedFromService }));

        service.update(expected).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should return a list of Production', async () => {
        const returnedFromService = Object.assign(
          {
            prodDate: format(currentDate, DATE_FORMAT),
            shift: 'BBBBBB',
            noOfPlates: 1,
            prodTonnage: 1
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            prodDate: currentDate
          },
          returnedFromService
        );
        mockedAxios.get.mockReturnValue(Promise.resolve([returnedFromService]));
        service.retrieve(expected).then(res => {
          expect(res).toContainEqual(expected);
        });
      });

      it('should delete a Production', async () => {
        mockedAxios.delete.mockReturnValue(Promise.resolve({ ok: true }));
        service.delete(123).then(res => {
          expect(res.ok);
        });
      });
    });
  });
});
