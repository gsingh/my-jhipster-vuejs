import { Component, Vue, Inject } from 'vue-property-decorator';

import { IHeavyPlateFinished } from '@/shared/model/heavy-plate-finished.model';
import HeavyPlateFinishedService from './heavy-plate-finished.service';

@Component
export default class HeavyPlateFinishedDetails extends Vue {
  @Inject('heavyPlateFinishedService') private heavyPlateFinishedService: () => HeavyPlateFinishedService;
  public heavyPlateFinished: IHeavyPlateFinished = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.heavyPlateFinishedId) {
        vm.retrieveHeavyPlateFinished(to.params.heavyPlateFinishedId);
      }
    });
  }

  public retrieveHeavyPlateFinished(heavyPlateFinishedId) {
    this.heavyPlateFinishedService()
      .find(heavyPlateFinishedId)
      .then(res => {
        this.heavyPlateFinished = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
