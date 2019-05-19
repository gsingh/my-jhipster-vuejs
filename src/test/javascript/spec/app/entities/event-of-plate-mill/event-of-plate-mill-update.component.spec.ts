/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import axios from 'axios';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import EventOfPlateMillUpdateComponent from '@/entities/event-of-plate-mill/event-of-plate-mill-update.vue';
import EventOfPlateMillClass from '@/entities/event-of-plate-mill/event-of-plate-mill-update.component';
import EventOfPlateMillService from '@/entities/event-of-plate-mill/event-of-plate-mill.service';

import PictureOfEventService from '@/entities/picture-of-event/picture-of-event.service';

import VideoOfEventService from '@/entities/video-of-event/video-of-event.service';

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
  describe('EventOfPlateMill Management Update Component', () => {
    let wrapper: Wrapper<EventOfPlateMillClass>;
    let comp: EventOfPlateMillClass;

    beforeEach(() => {
      mockedAxios.post.mockReturnValue(Promise.resolve());
      mockedAxios.put.mockReturnValue(Promise.resolve());

      wrapper = shallowMount<EventOfPlateMillClass>(EventOfPlateMillUpdateComponent, {
        store,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          eventOfPlateMillService: () => new EventOfPlateMillService(),

          pictureOfEventService: () => new PictureOfEventService(),

          videoOfEventService: () => new VideoOfEventService()
        }
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.eventOfPlateMill = entity;
        mockedAxios.put.mockReturnValue(Promise.resolve({ data: {} }));

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(mockedAxios.put).toHaveBeenCalledWith('api/event-of-plate-mills', entity);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.eventOfPlateMill = entity;
        mockedAxios.post.mockReturnValue(Promise.resolve({ data: {} }));

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(mockedAxios.post).toHaveBeenCalledWith('api/event-of-plate-mills', entity);
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
