/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import axios from 'axios';

import * as config from '@/shared/config/config';
import ShiftManagerDetailComponent from '@/entities/shift-manager/shift-manager-details.vue';
import ShiftManagerClass from '@/entities/shift-manager/shift-manager-details.component';
import ShiftManagerService from '@/entities/shift-manager/shift-manager.service';

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
  describe('ShiftManager Management Detail Component', () => {
    let wrapper: Wrapper<ShiftManagerClass>;
    let comp: ShiftManagerClass;

    beforeEach(() => {
      mockedAxios.get.mockReset();
      mockedAxios.get.mockReturnValue(Promise.resolve({}));

      wrapper = shallowMount<ShiftManagerClass>(ShiftManagerDetailComponent, {
        store,
        localVue,
        provide: { shiftManagerService: () => new ShiftManagerService() }
      });
      comp = wrapper.vm;
    });

    describe('OnInit', async () => {
      it('Should call load all on init', async () => {
        // GIVEN
        mockedAxios.get.mockReturnValue(Promise.resolve({ data: { id: 123 } }));

        // WHEN
        comp.retrieveShiftManager(123);
        await comp.$nextTick();

        // THEN
        expect(comp.shiftManager).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
