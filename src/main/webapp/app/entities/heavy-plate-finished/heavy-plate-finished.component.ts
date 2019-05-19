import { mixins } from 'vue-class-component';
import { Component, Inject, Vue } from 'vue-property-decorator';
import { IHeavyPlateFinished } from '@/shared/model/heavy-plate-finished.model';
import AlertService from '@/shared/alert/alert.service';

import HeavyPlateFinishedService from './heavy-plate-finished.service';

@Component
export default class HeavyPlateFinished extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('heavyPlateFinishedService') private heavyPlateFinishedService: () => HeavyPlateFinishedService;
  public currentSearch = '';
  private removeId: string = null;
  public itemsPerPage = 20;
  public queryCount: number = null;
  public page = 1;
  public previousPage: number = null;
  public propOrder = 'id';
  public reverse = true;
  public totalItems = 0;
  public heavyPlateFinisheds: IHeavyPlateFinished[] = [];

  public dismissCountDown: number = this.$store.getters.dismissCountDown;
  public dismissSecs: number = this.$store.getters.dismissSecs;
  public alertType: string = this.$store.getters.alertType;
  public alertMessage: any = this.$store.getters.alertMessage;

  public getAlertFromStore() {
    this.dismissCountDown = this.$store.getters.dismissCountDown;
    this.dismissSecs = this.$store.getters.dismissSecs;
    this.alertType = this.$store.getters.alertType;
    this.alertMessage = this.$store.getters.alertMessage;
  }

  public countDownChanged(dismissCountDown: number) {
    this.alertService().countDownChanged(dismissCountDown);
    this.getAlertFromStore();
  }

  public mounted(): void {
    this.retrieveAllHeavyPlateFinisheds();
  }

  public search(query): void {
    if (!query) {
      return this.clear();
    }
    this.currentSearch = query;
    this.retrieveAllHeavyPlateFinisheds();
  }

  public clear(): void {
    this.currentSearch = '';
    this.page = 1;
    this.retrieveAllHeavyPlateFinisheds();
  }

  public retrieveAllHeavyPlateFinisheds(): void {
    const paginationQuery = {
      page: this.page - 1,
      size: this.itemsPerPage,
      sort: this.sort()
    };
    if (this.currentSearch) {
      this.heavyPlateFinishedService()
        .search(this.currentSearch, paginationQuery)
        .then(res => {
          this.heavyPlateFinisheds = res.data;
          this.totalItems = Number(res.headers['x-total-count']);
          this.queryCount = this.totalItems;
        });
      return;
    }
    this.heavyPlateFinishedService()
      .retrieve(paginationQuery)
      .then(res => {
        this.heavyPlateFinisheds = res.data;
        this.totalItems = Number(res.headers['x-total-count']);
        this.queryCount = this.totalItems;
      });
  }

  public prepareRemove(instance): void {
    this.removeId = instance.id;
  }

  public removeHeavyPlateFinished(): void {
    this.heavyPlateFinishedService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A HeavyPlateFinished is deleted with identifier ' + this.removeId;
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = null;
        this.retrieveAllHeavyPlateFinisheds();
        this.closeDialog();
      });
  }

  public sort(): Array<any> {
    const result = [this.propOrder + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.propOrder !== 'id') {
      result.push('id');
    }
    return result;
  }

  public loadPage(page: number): void {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  public transition(): void {
    this.retrieveAllHeavyPlateFinisheds();
  }

  public changeOrder(propOrder): void {
    this.propOrder = propOrder;
    this.reverse = !this.reverse;
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
