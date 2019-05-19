/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import axios from 'axios';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import ShippingUpdateComponent from '@/entities/shipping/shipping-update.vue';
import ShippingClass from '@/entities/shipping/shipping-update.component';
import ShippingService from '@/entities/shipping/shipping.service';

import ShiftManagerService from '@/entities/shift-manager/shift-manager.service';

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
  describe('Shipping Management Update Component', () => {
    let wrapper: Wrapper<ShippingClass>;
    let comp: ShippingClass;

    beforeEach(() => {
      mockedAxios.post.mockReturnValue(Promise.resolve());
      mockedAxios.put.mockReturnValue(Promise.resolve());

      wrapper = shallowMount<ShippingClass>(ShippingUpdateComponent, {
        store,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          shippingService: () => new ShippingService(),

          shiftManagerService: () => new ShiftManagerService()
        }
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.shipping = entity;
        mockedAxios.put.mockReturnValue(Promise.resolve({ data: {} }));

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(mockedAxios.put).toHaveBeenCalledWith('api/shippings', entity);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.shipping = entity;
        mockedAxios.post.mockReturnValue(Promise.resolve({ data: {} }));

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(mockedAxios.post).toHaveBeenCalledWith('api/shippings', entity);
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
