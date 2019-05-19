import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import ShiftManagerService from '../shift-manager/shift-manager.service';
import { IShiftManager } from '@/shared/model/shift-manager.model';

import AlertService from '@/shared/alert/alert.service';
import { INormalising, Normalising } from '@/shared/model/normalising.model';
import NormalisingService from './normalising.service';

const validations: any = {
  normalising: {
    normalisingDate: {
      required
    },
    shift: {
      required
    },
    noOfPlates: {},
    normalisedTonnage: {}
  }
};

@Component({
  validations
})
export default class NormalisingUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('normalisingService') private normalisingService: () => NormalisingService;
  public normalising: INormalising = new Normalising();

  @Inject('shiftManagerService') private shiftManagerService: () => ShiftManagerService;

  public shiftManagers: IShiftManager[] = [];
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.normalisingId) {
        vm.retrieveNormalising(to.params.normalisingId);
      }
      vm.initRelationships();
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.normalising.id) {
      this.normalisingService()
        .update(this.normalising)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Normalising is updated with identifier ' + param.id;
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.normalisingService()
        .create(this.normalising)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Normalising is created with identifier ' + param.id;
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveNormalising(normalisingId): void {
    this.normalisingService()
      .find(normalisingId)
      .then(res => {
        this.normalising = res;
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
