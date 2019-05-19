/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import axios from 'axios';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import HeavyPlateFinishedUpdateComponent from '@/entities/heavy-plate-finished/heavy-plate-finished-update.vue';
import HeavyPlateFinishedClass from '@/entities/heavy-plate-finished/heavy-plate-finished-update.component';
import HeavyPlateFinishedService from '@/entities/heavy-plate-finished/heavy-plate-finished.service';

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
  describe('HeavyPlateFinished Management Update Component', () => {
    let wrapper: Wrapper<HeavyPlateFinishedClass>;
    let comp: HeavyPlateFinishedClass;

    beforeEach(() => {
      mockedAxios.post.mockReturnValue(Promise.resolve());
      mockedAxios.put.mockReturnValue(Promise.resolve());

      wrapper = shallowMount<HeavyPlateFinishedClass>(HeavyPlateFinishedUpdateComponent, {
        store,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          heavyPlateFinishedService: () => new HeavyPlateFinishedService(),

          shiftManagerService: () => new ShiftManagerService()
        }
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.heavyPlateFinished = entity;
        mockedAxios.put.mockReturnValue(Promise.resolve({ data: {} }));

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(mockedAxios.put).toHaveBeenCalledWith('api/heavy-plate-finisheds', entity);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.heavyPlateFinished = entity;
        mockedAxios.post.mockReturnValue(Promise.resolve({ data: {} }));

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(mockedAxios.post).toHaveBeenCalledWith('api/heavy-plate-finisheds', entity);
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
