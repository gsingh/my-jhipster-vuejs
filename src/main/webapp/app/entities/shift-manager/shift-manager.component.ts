import { mixins } from 'vue-class-component';
import { Component, Inject, Vue } from 'vue-property-decorator';
import { IShiftManager } from '@/shared/model/shift-manager.model';
import AlertService from '@/shared/alert/alert.service';

import ShiftManagerService from './shift-manager.service';

@Component
export default class ShiftManager extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('shiftManagerService') private shiftManagerService: () => ShiftManagerService;
  public currentSearch = '';
  private removeId: string = null;
  public shiftManagers: IShiftManager[] = [];

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
    this.retrieveAllShiftManagers();
  }

  public search(query): void {
    if (!query) {
      return this.clear();
    }
    this.currentSearch = query;
    this.retrieveAllShiftManagers();
  }

  public clear(): void {
    this.currentSearch = '';
    this.retrieveAllShiftManagers();
  }

  public retrieveAllShiftManagers(): void {
    if (this.currentSearch) {
      this.shiftManagerService()
        .search(this.currentSearch)
        .then(res => {
          this.shiftManagers = res;
        });
      return;
    }
    this.shiftManagerService()
      .retrieve()
      .then(res => {
        this.shiftManagers = res.data;
      });
  }

  public prepareRemove(instance): void {
    this.removeId = instance.id;
  }

  public removeShiftManager(): void {
    this.shiftManagerService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A ShiftManager is deleted with identifier ' + this.removeId;
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = null;
        this.retrieveAllShiftManagers();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
