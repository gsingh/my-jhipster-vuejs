import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import ShiftManagerService from '../shift-manager/shift-manager.service';
import { IShiftManager } from '@/shared/model/shift-manager.model';

import AlertService from '@/shared/alert/alert.service';
import { IHeavyPlateFinished, HeavyPlateFinished } from '@/shared/model/heavy-plate-finished.model';
import HeavyPlateFinishedService from './heavy-plate-finished.service';

const validations: any = {
  heavyPlateFinished: {
    hPFinishedDate: {
      required
    },
    shift: {
      required
    },
    noOfPlates: {},
    hPFinishedTonnage: {}
  }
};

@Component({
  validations
})
export default class HeavyPlateFinishedUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('heavyPlateFinishedService') private heavyPlateFinishedService: () => HeavyPlateFinishedService;
  public heavyPlateFinished: IHeavyPlateFinished = new HeavyPlateFinished();

  @Inject('shiftManagerService') private shiftManagerService: () => ShiftManagerService;

  public shiftManagers: IShiftManager[] = [];
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.heavyPlateFinishedId) {
        vm.retrieveHeavyPlateFinished(to.params.heavyPlateFinishedId);
      }
      vm.initRelationships();
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.heavyPlateFinished.id) {
      this.heavyPlateFinishedService()
        .update(this.heavyPlateFinished)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A HeavyPlateFinished is updated with identifier ' + param.id;
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.heavyPlateFinishedService()
        .create(this.heavyPlateFinished)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A HeavyPlateFinished is created with identifier ' + param.id;
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveHeavyPlateFinished(heavyPlateFinishedId): void {
    this.heavyPlateFinishedService()
      .find(heavyPlateFinishedId)
      .then(res => {
        this.heavyPlateFinished = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.shiftManagerService()
      .retrieve()
      .then(res => {
        this.shiftManagers = res.data;
      });
  }
}
