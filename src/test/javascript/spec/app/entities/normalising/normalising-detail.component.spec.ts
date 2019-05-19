/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import axios from 'axios';

import * as config from '@/shared/config/config';
import NormalisingDetailComponent from '@/entities/normalising/normalising-details.vue';
import NormalisingClass from '@/entities/normalising/normalising-details.component';
import NormalisingService from '@/entities/normalising/normalising.service';

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
  describe('Normalising Management Detail Component', () => {
    let wrapper: Wrapper<NormalisingClass>;
    let comp: NormalisingClass;

    beforeEach(() => {
      mockedAxios.get.mockReset();
      mockedAxios.get.mockReturnValue(Promise.resolve({}));

      wrapper = shallowMount<NormalisingClass>(NormalisingDetailComponent, {
        store,
        localVue,
        provide: { normalisingService: () => new NormalisingService() }
      });
      comp = wrapper.vm;
    });

    describe('OnInit', async () => {
      it('Should call load all on init', async () => {
        // GIVEN
        mockedAxios.get.mockReturnValue(Promise.resolve({ data: { id: 123 } }));

        // WHEN
        comp.retrieveNormalising(123);
        await comp.$nextTick();

        // THEN
        expect(comp.normalising).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
