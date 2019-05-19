import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import ShiftManagerService from '../shift-manager/shift-manager.service';
import { IShiftManager } from '@/shared/model/shift-manager.model';

import AlertService from '@/shared/alert/alert.service';
import { IShipping, Shipping } from '@/shared/model/shipping.model';
import ShippingService from './shipping.service';

const validations: any = {
  shipping: {
    shippingDate: {
      required
    },
    shift: {
      required
    },
    noOfWagons: {},
    noOfTrailers: {},
    shippedTonnage: {}
  }
};

@Component({
  validations
})
export default class ShippingUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('shippingService') private shippingService: () => ShippingService;
  public shipping: IShipping = new Shipping();

  @Inject('shiftManagerService') private shiftManagerService: () => ShiftManagerService;

  public shiftManagers: IShiftManager[] = [];
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.shippingId) {
        vm.retrieveShipping(to.params.shippingId);
      }
      vm.initRelationships();
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.shipping.id) {
      this.shippingService()
        .update(this.shipping)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Shipping is updated with identifier ' + param.id;
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.shippingService()
        .create(this.shipping)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Shipping is created with identifier ' + param.id;
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveShipping(shippingId): void {
    this.shippingService()
      .find(shippingId)
      .then(res => {
        this.shipping = res;
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
