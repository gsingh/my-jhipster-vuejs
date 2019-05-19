/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import axios from 'axios';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import PictureOfEventUpdateComponent from '@/entities/picture-of-event/picture-of-event-update.vue';
import PictureOfEventClass from '@/entities/picture-of-event/picture-of-event-update.component';
import PictureOfEventService from '@/entities/picture-of-event/picture-of-event.service';

import EventOfPlateMillService from '@/entities/event-of-plate-mill/event-of-plate-mill.service';

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
  describe('PictureOfEvent Management Update Component', () => {
    let wrapper: Wrapper<PictureOfEventClass>;
    let comp: PictureOfEventClass;

    beforeEach(() => {
      mockedAxios.post.mockReturnValue(Promise.resolve());
      mockedAxios.put.mockReturnValue(Promise.resolve());

      wrapper = shallowMount<PictureOfEventClass>(PictureOfEventUpdateComponent, {
        store,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          pictureOfEventService: () => new PictureOfEventService(),

          eventOfPlateMillService: () => new EventOfPlateMillService()
        }
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.pictureOfEvent = entity;
        mockedAxios.put.mockReturnValue(Promise.resolve({ data: {} }));

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(mockedAxios.put).toHaveBeenCalledWith('api/picture-of-events', entity);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.pictureOfEvent = entity;
        mockedAxios.post.mockReturnValue(Promise.resolve({ data: {} }));

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(mockedAxios.post).toHaveBeenCalledWith('api/picture-of-events', entity);
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
