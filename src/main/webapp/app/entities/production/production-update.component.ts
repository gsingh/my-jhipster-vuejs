import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import ShiftManagerService from '../shift-manager/shift-manager.service';
import { IShiftManager } from '@/shared/model/shift-manager.model';

import AlertService from '@/shared/alert/alert.service';
import { IProduction, Production } from '@/shared/model/production.model';
import ProductionService from './production.service';

const validations: any = {
  production: {
    prodDate: {
      required
    },
    shift: {
      required
    },
    noOfPlates: {},
    prodTonnage: {}
  }
};

@Component({
  validations
})
export default class ProductionUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('productionService') private productionService: () => ProductionService;
  public production: IProduction = new Production();

  @Inject('shiftManagerService') private shiftManagerService: () => ShiftManagerService;

  public shiftManagers: IShiftManager[] = [];
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.productionId) {
        vm.retrieveProduction(to.params.productionId);
      }
      vm.initRelationships();
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.production.id) {
      this.productionService()
        .update(this.production)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Production is updated with identifier ' + param.id;
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.productionService()
        .create(this.production)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Production is created with identifier ' + param.id;
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveProduction(productionId): void {
    this.productionService()
      .find(productionId)
      .then(res => {
        this.production = res;
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
