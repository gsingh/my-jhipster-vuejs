import { Component, Inject } from 'vue-property-decorator';

import { mixins } from 'vue-class-component';
import JhiDataUtils from '@/shared/data/data-utils.service';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import EventOfPlateMillService from '../event-of-plate-mill/event-of-plate-mill.service';
import { IEventOfPlateMill } from '@/shared/model/event-of-plate-mill.model';

import AlertService from '@/shared/alert/alert.service';
import { IVideoOfEvent, VideoOfEvent } from '@/shared/model/video-of-event.model';
import VideoOfEventService from './video-of-event.service';

const validations: any = {
  videoOfEvent: {
    videoDate: {},
    videoFile: {
      required
    }
  }
};

@Component({
  validations
})
export default class VideoOfEventUpdate extends mixins(JhiDataUtils) {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('videoOfEventService') private videoOfEventService: () => VideoOfEventService;
  public videoOfEvent: IVideoOfEvent = new VideoOfEvent();

  @Inject('eventOfPlateMillService') private eventOfPlateMillService: () => EventOfPlateMillService;

  public eventOfPlateMills: IEventOfPlateMill[] = [];
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.videoOfEventId) {
        vm.retrieveVideoOfEvent(to.params.videoOfEventId);
      }
      vm.initRelationships();
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.videoOfEvent.id) {
      this.videoOfEventService()
        .update(this.videoOfEvent)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A VideoOfEvent is updated with identifier ' + param.id;
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.videoOfEventService()
        .create(this.videoOfEvent)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A VideoOfEvent is created with identifier ' + param.id;
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveVideoOfEvent(videoOfEventId): void {
    this.videoOfEventService()
      .find(videoOfEventId)
      .then(res => {
        this.videoOfEvent = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.eventOfPlateMillService()
      .retrieve()
      .then(res => {
        this.eventOfPlateMills = res.data;
      });
  }
}
