/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import axios from 'axios';

import * as config from '@/shared/config/config';
import EventOfPlateMillDetailComponent from '@/entities/event-of-plate-mill/event-of-plate-mill-details.vue';
import EventOfPlateMillClass from '@/entities/event-of-plate-mill/event-of-plate-mill-details.component';
import EventOfPlateMillService from '@/entities/event-of-plate-mill/event-of-plate-mill.service';

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
  describe('EventOfPlateMill Management Detail Component', () => {
    let wrapper: Wrapper<EventOfPlateMillClass>;
    let comp: EventOfPlateMillClass;

    beforeEach(() => {
      mockedAxios.get.mockReset();
      mockedAxios.get.mockReturnValue(Promise.resolve({}));

      wrapper = shallowMount<EventOfPlateMillClass>(EventOfPlateMillDetailComponent, {
        store,
        localVue,
        provide: { eventOfPlateMillService: () => new EventOfPlateMillService() }
      });
      comp = wrapper.vm;
    });

    describe('OnInit', async () => {
      it('Should call load all on init', async () => {
        // GIVEN
        mockedAxios.get.mockReturnValue(Promise.resolve({ data: { id: 123 } }));

        // WHEN
        comp.retrieveEventOfPlateMill(123);
        await comp.$nextTick();

        // THEN
        expect(comp.eventOfPlateMill).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
