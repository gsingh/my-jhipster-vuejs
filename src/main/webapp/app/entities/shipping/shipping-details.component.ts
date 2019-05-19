import { Component, Vue, Inject } from 'vue-property-decorator';

import { IShipping } from '@/shared/model/shipping.model';
import ShippingService from './shipping.service';

@Component
export default class ShippingDetails extends Vue {
  @Inject('shippingService') private shippingService: () => ShippingService;
  public shipping: IShipping = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.shippingId) {
        vm.retrieveShipping(to.params.shippingId);
      }
    });
  }

  public retrieveShipping(shippingId) {
    this.shippingService()
      .find(shippingId)
      .then(res => {
        this.shipping = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
