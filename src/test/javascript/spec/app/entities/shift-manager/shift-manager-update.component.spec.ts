/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import axios from 'axios';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import ShiftManagerUpdateComponent from '@/entities/shift-manager/shift-manager-update.vue';
import ShiftManagerClass from '@/entities/shift-manager/shift-manager-update.component';
import ShiftManagerService from '@/entities/shift-manager/shift-manager.service';

import ProductionService from '@/entities/production/production.service';

import HeavyPlateFinishedService from '@/entities/heavy-plate-finished/heavy-plate-finished.service';

import NormalisingService from '@/entities/normalising/normalising.service';

import ShippingService from '@/entities/shipping/shipping.service';

const localVue = createLocalVue();
const mockedAxios: any = axios;

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

jest.mock('axios', () => ({
  post: jest.fn(),
  put: jest.fn()
}));

describe('Component Tests', () => {
  describe('ShiftManager Management Update Component', () => {
    let wrapper: Wrapper<ShiftManagerClass>;
    let comp: ShiftManagerClass;

    beforeEach(() => {
      mockedAxios.post.mockReturnValue(Promise.resolve());
      mockedAxios.put.mockReturnValue(Promise.resolve());

      wrapper = shallowMount<ShiftManagerClass>(ShiftManagerUpdateComponent, {
        store,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          shiftManagerService: () => new ShiftManagerService(),

          productionService: () => new ProductionService(),

          heavyPlateFinishedService: () => new HeavyPlateFinishedService(),

          normalisingService: () => new NormalisingService(),

          shippingService: () => new ShippingService()
        }
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.shiftManager = entity;
        mockedAxios.put.mockReturnValue(Promise.resolve({ data: {} }));

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(mockedAxios.put).toHaveBeenCalledWith('api/shift-managers', entity);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.shiftManager = entity;
        mockedAxios.post.mockReturnValue(Promise.resolve({ data: {} }));

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(mockedAxios.post).toHaveBeenCalledWith('api/shift-managers', entity);
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
