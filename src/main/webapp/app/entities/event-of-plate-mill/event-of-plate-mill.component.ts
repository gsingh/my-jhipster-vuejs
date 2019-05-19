import { mixins } from 'vue-class-component';
import { Component, Inject, Vue } from 'vue-property-decorator';
import { IEventOfPlateMill } from '@/shared/model/event-of-plate-mill.model';
import AlertService from '@/shared/alert/alert.service';

import EventOfPlateMillService from './event-of-plate-mill.service';

@Component
export default class EventOfPlateMill extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('eventOfPlateMillService') private eventOfPlateMillService: () => EventOfPlateMillService;
  public currentSearch = '';
  private removeId: string = null;
  public itemsPerPage = 20;
  public queryCount: number = null;
  public page = 1;
  public previousPage: number = null;
  public propOrder = 'id';
  public reverse = false;
  public totalItems = 0;
  public eventOfPlateMills: IEventOfPlateMill[] = [];

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
    this.retrieveAllEventOfPlateMills();
  }

  public search(query): void {
    if (!query) {
      return this.clear();
    }
    this.currentSearch = query;
    this.retrieveAllEventOfPlateMills();
  }

  public clear(): void {
    this.currentSearch = '';
    this.page = 1;
    this.retrieveAllEventOfPlateMills();
  }

  public retrieveAllEventOfPlateMills(): void {
    const paginationQuery = {
      page: this.page - 1,
      size: this.itemsPerPage,
      sort: this.sort()
    };
    if (this.currentSearch) {
      this.eventOfPlateMillService()
        .search(this.currentSearch, paginationQuery)
        .then(res => {
          this.eventOfPlateMills = res.data;
          this.totalItems = Number(res.headers['x-total-count']);
          this.queryCount = this.totalItems;
        });
      return;
    }
    this.eventOfPlateMillService()
      .retrieve(paginationQuery)
      .then(res => {
        this.eventOfPlateMills = res.data;
        this.totalItems = Number(res.headers['x-total-count']);
        this.queryCount = this.totalItems;
      });
  }

  public prepareRemove(instance): void {
    this.removeId = instance.id;
  }

  public removeEventOfPlateMill(): void {
    this.eventOfPlateMillService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A EventOfPlateMill is deleted with identifier ' + this.removeId;
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = null;
        this.retrieveAllEventOfPlateMills();
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
    this.retrieveAllEventOfPlateMills();
  }

  public changeOrder(propOrder): void {
    this.propOrder = propOrder;
    this.reverse = !this.reverse;
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
