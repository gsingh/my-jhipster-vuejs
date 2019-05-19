/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import axios from 'axios';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import ShiftManagerComponent from '@/entities/shift-manager/shift-manager.vue';
import ShiftManagerClass from '@/entities/shift-manager/shift-manager.component';
import ShiftManagerService from '@/entities/shift-manager/shift-manager.service';

const localVue = createLocalVue();
const mockedAxios: any = axios;

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-alert', {});
localVue.component('b-badge', {});
localVue.directive('b-modal', {});
localVue.component('b-button', {});
localVue.component('router-link', {});

jest.mock('axios', () => ({
  get: jest.fn(),
  delete: jest.fn()
}));

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {}
  }
};

describe('Component Tests', () => {
  describe('ShiftManager Management Component', () => {
    let wrapper: Wrapper<ShiftManagerClass>;
    let comp: ShiftManagerClass;

    beforeEach(() => {
      mockedAxios.get.mockReset();
      mockedAxios.get.mockReturnValue(Promise.resolve({ headers: {} }));

      wrapper = shallowMount<ShiftManagerClass>(ShiftManagerComponent, {
        store,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          shiftManagerService: () => new ShiftManagerService()
        }
      });
      comp = wrapper.vm;
    });

    it('should be a Vue instance', () => {
      expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it('Should call load all on init', async () => {
      // GIVEN
      mockedAxios.get.mockReturnValue(Promise.resolve({ headers: {}, data: [{ id: 123 }] }));

      // WHEN
      comp.retrieveAllShiftManagers();
      await comp.$nextTick();

      // THEN
      expect(mockedAxios.get).toHaveBeenCalled();
      expect(comp.shiftManagers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      mockedAxios.delete.mockReturnValue(Promise.resolve({}));
      mockedAxios.get.mockReturnValue(Promise.resolve({}));

      // WHEN
      comp.prepareRemove({ id: 'test' });
      comp.removeShiftManager();
      await comp.$nextTick();

      // THEN
      expect(mockedAxios.delete).toHaveBeenCalled();
      expect(mockedAxios.get).toHaveBeenCalled();
    });
  });
});
