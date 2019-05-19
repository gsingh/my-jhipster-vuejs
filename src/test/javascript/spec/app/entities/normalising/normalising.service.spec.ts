/* tslint:disable max-line-length */
import axios from 'axios';
import { format } from 'date-fns';

import * as config from '@/shared/config/config';
import { DATE_FORMAT } from '@/shared/date/filters';
import NormalisingService from '@/entities/normalising/normalising.service';
import { Normalising, Shift } from '@/shared/model/normalising.model';

const mockedAxios: any = axios;
jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn()
}));

describe('Service Tests', () => {
  describe('Normalising Service', () => {
    let service: NormalisingService;
    let elemDefault;
    let currentDate: Date;
    beforeEach(() => {
      service = new NormalisingService();
      currentDate = new Date();

      elemDefault = new Normalising(0, currentDate, Shift.A, 0, 0);
    });

    describe('Service methods', async () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            normalisingDate: format(currentDate, DATE_FORMAT)
          },
          elemDefault
        );
        mockedAxios.get.mockReturnValue(Promise.resolve({ data: returnedFromService }));

        service.find(123).then(res => {
          expect(res).toMatchObject(elemDefault);
        });
      });

      it('should create a Normalising', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            normalisingDate: format(currentDate, DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            normalisingDate: currentDate
          },
          returnedFromService
        );

        mockedAxios.post.mockReturnValue(Promise.resolve({ data: returnedFromService }));
        service.create({}).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should update a Normalising', async () => {
        const returnedFromService = Object.assign(
          {
            normalisingDate: format(currentDate, DATE_FORMAT),
            shift: 'BBBBBB',
            noOfPlates: 1,
            normalisedTonnage: 1
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            normalisingDate: currentDate
          },
          returnedFromService
        );
        mockedAxios.put.mockReturnValue(Promise.resolve({ data: returnedFromService }));

        service.update(expected).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should return a list of Normalising', async () => {
        const returnedFromService = Object.assign(
          {
            normalisingDate: format(currentDate, DATE_FORMAT),
            shift: 'BBBBBB',
            noOfPlates: 1,
            normalisedTonnage: 1
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            normalisingDate: currentDate
          },
          returnedFromService
        );
        mockedAxios.get.mockReturnValue(Promise.resolve([returnedFromService]));
        service.retrieve(expected).then(res => {
          expect(res).toContainEqual(expected);
        });
      });

      it('should delete a Normalising', async () => {
        mockedAxios.delete.mockReturnValue(Promise.resolve({ ok: true }));
        service.delete(123).then(res => {
          expect(res.ok);
        });
      });
    });
  });
});
