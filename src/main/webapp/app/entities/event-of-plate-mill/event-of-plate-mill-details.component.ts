import { Component, Vue, Inject } from 'vue-property-decorator';

import { IEventOfPlateMill } from '@/shared/model/event-of-plate-mill.model';
import EventOfPlateMillService from './event-of-plate-mill.service';

@Component
export default class EventOfPlateMillDetails extends Vue {
  @Inject('eventOfPlateMillService') private eventOfPlateMillService: () => EventOfPlateMillService;
  public eventOfPlateMill: IEventOfPlateMill = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.eventOfPlateMillId) {
        vm.retrieveEventOfPlateMill(to.params.eventOfPlateMillId);
      }
    });
  }

  public retrieveEventOfPlateMill(eventOfPlateMillId) {
    this.eventOfPlateMillService()
      .find(eventOfPlateMillId)
      .then(res => {
        this.eventOfPlateMill = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
