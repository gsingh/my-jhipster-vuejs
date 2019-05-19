import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import PictureOfEventService from '../picture-of-event/picture-of-event.service';
import { IPictureOfEvent } from '@/shared/model/picture-of-event.model';

import VideoOfEventService from '../video-of-event/video-of-event.service';
import { IVideoOfEvent } from '@/shared/model/video-of-event.model';

import AlertService from '@/shared/alert/alert.service';
import { IEventOfPlateMill, EventOfPlateMill } from '@/shared/model/event-of-plate-mill.model';
import EventOfPlateMillService from './event-of-plate-mill.service';

const validations: any = {
  eventOfPlateMill: {
    eventDate: {
      required
    },
    eventName: {
      required
    }
  }
};

@Component({
  validations
})
export default class EventOfPlateMillUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('eventOfPlateMillService') private eventOfPlateMillService: () => EventOfPlateMillService;
  public eventOfPlateMill: IEventOfPlateMill = new EventOfPlateMill();

  @Inject('pictureOfEventService') private pictureOfEventService: () => PictureOfEventService;

  public pictureOfEvents: IPictureOfEvent[] = [];

  @Inject('videoOfEventService') private videoOfEventService: () => VideoOfEventService;

  public videoOfEvents: IVideoOfEvent[] = [];
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.eventOfPlateMillId) {
        vm.retrieveEventOfPlateMill(to.params.eventOfPlateMillId);
      }
      vm.initRelationships();
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.eventOfPlateMill.id) {
      this.eventOfPlateMillService()
        .update(this.eventOfPlateMill)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A EventOfPlateMill is updated with identifier ' + param.id;
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.eventOfPlateMillService()
        .create(this.eventOfPlateMill)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A EventOfPlateMill is created with identifier ' + param.id;
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveEventOfPlateMill(eventOfPlateMillId): void {
    this.eventOfPlateMillService()
      .find(eventOfPlateMillId)
      .then(res => {
        this.eventOfPlateMill = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.pictureOfEventService()
      .retrieve()
      .then(res => {
        this.pictureOfEvents = res.data;
      });
    this.videoOfEventService()
      .retrieve()
      .then(res => {
        this.videoOfEvents = res.data;
      });
  }
}
