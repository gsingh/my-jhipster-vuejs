import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import ProductionService from '../production/production.service';
import { IProduction } from '@/shared/model/production.model';

import HeavyPlateFinishedService from '../heavy-plate-finished/heavy-plate-finished.service';
import { IHeavyPlateFinished } from '@/shared/model/heavy-plate-finished.model';

import NormalisingService from '../normalising/normalising.service';
import { INormalising } from '@/shared/model/normalising.model';

import ShippingService from '../shipping/shipping.service';
import { IShipping } from '@/shared/model/shipping.model';

import AlertService from '@/shared/alert/alert.service';
import { IShiftManager, ShiftManager } from '@/shared/model/shift-manager.model';
import ShiftManagerService from './shift-manager.service';

const validations: any = {
  shiftManager: {
    name: {
      required
    },
    designation: {
      required
    },
    mobileNumber: {
      required
    }
  }
};

@Component({
  validations
})
export default class ShiftManagerUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('shiftManagerService') private shiftManagerService: () => ShiftManagerService;
  public shiftManager: IShiftManager = new ShiftManager();

  @Inject('productionService') private productionService: () => ProductionService;

  public productions: IProduction[] = [];

  @Inject('heavyPlateFinishedService') private heavyPlateFinishedService: () => HeavyPlateFinishedService;

  public heavyPlateFinisheds: IHeavyPlateFinished[] = [];

  @Inject('normalisingService') private normalisingService: () => NormalisingService;

  public normalisings: INormalising[] = [];

  @Inject('shippingService') private shippingService: () => ShippingService;

  public shippings: IShipping[] = [];
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.shiftManagerId) {
        vm.retrieveShiftManager(to.params.shiftManagerId);
      }
      vm.initRelationships();
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.shiftManager.id) {
      this.shiftManagerService()
        .update(this.shiftManager)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A ShiftManager is updated with identifier ' + param.id;
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.shiftManagerService()
        .create(this.shiftManager)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A ShiftManager is created with identifier ' + param.id;
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveShiftManager(shiftManagerId): void {
    this.shiftManagerService()
      .find(shiftManagerId)
      .then(res => {
        this.shiftManager = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.productionService()
      .retrieve()
      .then(res => {
        this.productions = res.data;
      });
    this.heavyPlateFinishedService()
      .retrieve()
      .then(res => {
        this.heavyPlateFinisheds = res.data;
      });
    this.normalisingService()
      .retrieve()
      .then(res => {
        this.normalisings = res.data;
      });
    this.shippingService()
      .retrieve()
      .then(res => {
        this.shippings = res.data;
      });
  }
}
