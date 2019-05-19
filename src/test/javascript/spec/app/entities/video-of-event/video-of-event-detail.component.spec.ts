/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import axios from 'axios';

import * as config from '@/shared/config/config';
import VideoOfEventDetailComponent from '@/entities/video-of-event/video-of-event-details.vue';
import VideoOfEventClass from '@/entities/video-of-event/video-of-event-details.component';
import VideoOfEventService from '@/entities/video-of-event/video-of-event.service';

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
  describe('VideoOfEvent Management Detail Component', () => {
    let wrapper: Wrapper<VideoOfEventClass>;
    let comp: VideoOfEventClass;

    beforeEach(() => {
      mockedAxios.get.mockReset();
      mockedAxios.get.mockReturnValue(Promise.resolve({}));

      wrapper = shallowMount<VideoOfEventClass>(VideoOfEventDetailComponent, {
        store,
        localVue,
        provide: { videoOfEventService: () => new VideoOfEventService() }
      });
      comp = wrapper.vm;
    });

    describe('OnInit', async () => {
      it('Should call load all on init', async () => {
        // GIVEN
        mockedAxios.get.mockReturnValue(Promise.resolve({ data: { id: 123 } }));

        // WHEN
        comp.retrieveVideoOfEvent(123);
        await comp.$nextTick();

        // THEN
        expect(comp.videoOfEvent).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
