/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import axios from 'axios';

import * as config from '@/shared/config/config';
import HeavyPlateFinishedDetailComponent from '@/entities/heavy-plate-finished/heavy-plate-finished-details.vue';
import HeavyPlateFinishedClass from '@/entities/heavy-plate-finished/heavy-plate-finished-details.component';
import HeavyPlateFinishedService from '@/entities/heavy-plate-finished/heavy-plate-finished.service';

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
  describe('HeavyPlateFinished Management Detail Component', () => {
    let wrapper: Wrapper<HeavyPlateFinishedClass>;
    let comp: HeavyPlateFinishedClass;

    beforeEach(() => {
      mockedAxios.get.mockReset();
      mockedAxios.get.mockReturnValue(Promise.resolve({}));

      wrapper = shallowMount<HeavyPlateFinishedClass>(HeavyPlateFinishedDetailComponent, {
        store,
        localVue,
        provide: { heavyPlateFinishedService: () => new HeavyPlateFinishedService() }
      });
      comp = wrapper.vm;
    });

    describe('OnInit', async () => {
      it('Should call load all on init', async () => {
        // GIVEN
        mockedAxios.get.mockReturnValue(Promise.resolve({ data: { id: 123 } }));

        // WHEN
        comp.retrieveHeavyPlateFinished(123);
        await comp.$nextTick();

        // THEN
        expect(comp.heavyPlateFinished).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
