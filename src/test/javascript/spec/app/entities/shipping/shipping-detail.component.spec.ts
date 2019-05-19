/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import axios from 'axios';

import * as config from '@/shared/config/config';
import ShippingDetailComponent from '@/entities/shipping/shipping-details.vue';
import ShippingClass from '@/entities/shipping/shipping-details.component';
import ShippingService from '@/entities/shipping/shipping.service';

const localVue = createLocalVue();
const mockedAxios: any = axios;

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

jest.mock('axios', () => ({
  get: jest.fn()
}));

describe('Component Tests', () => {
  describe('Shipping Management Detail Component', () => {
    let wrapper: Wrapper<ShippingClass>;
    let comp: ShippingClass;

    beforeEach(() => {
      mockedAxios.get.mockReset();
      mockedAxios.get.mockReturnValue(Promise.resolve({}));

      wrapper = shallowMount<ShippingClass>(ShippingDetailComponent, {
        store,
        localVue,
        provide: { shippingService: () => new ShippingService() }
      });
      comp = wrapper.vm;
    });

    describe('OnInit', async () => {
      it('Should call load all on init', async () => {
        // GIVEN
        mockedAxios.get.mockReturnValue(Promise.resolve({ data: { id: 123 } }));

        // WHEN
        comp.retrieveShipping(123);
        await comp.$nextTick();

        // THEN
        expect(comp.shipping).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
