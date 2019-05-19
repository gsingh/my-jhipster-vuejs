import { Component, Inject } from 'vue-property-decorator';

import { mixins } from 'vue-class-component';
import JhiDataUtils from '@/shared/data/data-utils.service';

import { IPictureOfEvent } from '@/shared/model/picture-of-event.model';
import PictureOfEventService from './picture-of-event.service';

@Component
export default class PictureOfEventDetails extends mixins(JhiDataUtils) {
  @Inject('pictureOfEventService') private pictureOfEventService: () => PictureOfEventService;
  public pictureOfEvent: IPictureOfEvent = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.pictureOfEventId) {
        vm.retrievePictureOfEvent(to.params.pictureOfEventId);
      }
    });
  }

  public retrievePictureOfEvent(pictureOfEventId) {
    this.pictureOfEventService()
      .find(pictureOfEventId)
      .then(res => {
        this.pictureOfEvent = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
