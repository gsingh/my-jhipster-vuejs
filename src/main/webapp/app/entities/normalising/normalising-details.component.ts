import { Component, Vue, Inject } from 'vue-property-decorator';

import { INormalising } from '@/shared/model/normalising.model';
import NormalisingService from './normalising.service';

@Component
export default class NormalisingDetails extends Vue {
  @Inject('normalisingService') private normalisingService: () => NormalisingService;
  public normalising: INormalising = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.normalisingId) {
        vm.retrieveNormalising(to.params.normalisingId);
      }
    });
  }

  public retrieveNormalising(normalisingId) {
    this.normalisingService()
      .find(normalisingId)
      .then(res => {
        this.normalising = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
