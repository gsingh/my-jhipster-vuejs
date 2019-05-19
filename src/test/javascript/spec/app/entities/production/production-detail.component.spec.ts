/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import axios from 'axios';

import * as config from '@/shared/config/config';
import ProductionDetailComponent from '@/entities/production/production-details.vue';
import ProductionClass from '@/entities/production/production-details.component';
import ProductionService from '@/entities/production/production.service';

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
  describe('Production Management Detail Component', () => {
    let wrapper: Wrapper<ProductionClass>;
    let comp: ProductionClass;

    beforeEach(() => {
      mockedAxios.get.mockReset();
      mockedAxios.get.mockReturnValue(Promise.resolve({}));

      wrapper = shallowMount<ProductionClass>(ProductionDetailComponent, {
        store,
        localVue,
        provide: { productionService: () => new ProductionService() }
      });
      comp = wrapper.vm;
    });

    describe('OnInit', async () => {
      it('Should call load all on init', async () => {
        // GIVEN
        mockedAxios.get.mockReturnValue(Promise.resolve({ data: { id: 123 } }));

        // WHEN
        comp.retrieveProduction(123);
        await comp.$nextTick();

        // THEN
        expect(comp.production).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
