import { Component, Vue, Inject } from 'vue-property-decorator';

import { IShiftManager } from '@/shared/model/shift-manager.model';
import ShiftManagerService from './shift-manager.service';

@Component
export default class ShiftManagerDetails extends Vue {
  @Inject('shiftManagerService') private shiftManagerService: () => ShiftManagerService;
  public shiftManager: IShiftManager = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.shiftManagerId) {
        vm.retrieveShiftManager(to.params.shiftManagerId);
      }
    });
  }

  public retrieveShiftManager(shiftManagerId) {
    this.shiftManagerService()
      .find(shiftManagerId)
      .then(res => {
        this.shiftManager = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
