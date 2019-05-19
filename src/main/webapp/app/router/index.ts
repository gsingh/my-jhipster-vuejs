import Vue from 'vue';
import Component from 'vue-class-component';
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate' // for vue-router 2.2+
]);
import Router from 'vue-router';
const Home = () => import('../core/home/home.vue');
const Error = () => import('../core/error/error.vue');
const Register = () => import('../account/register/register.vue');
const Activate = () => import('../account/activate/activate.vue');
const ResetPasswordInit = () => import('../account/reset-password/init/reset-password-init.vue');
const ResetPasswordFinish = () => import('../account/reset-password/finish/reset-password-finish.vue');
const ChangePassword = () => import('../account/change-password/change-password.vue');
const Settings = () => import('../account/settings/settings.vue');
const JhiUserManagementComponent = () => import('../admin/user-management/user-management.vue');
const JhiUserManagementViewComponent = () => import('../admin/user-management/user-management-view.vue');
const JhiUserManagementEditComponent = () => import('../admin/user-management/user-management-edit.vue');
const JhiConfigurationComponent = () => import('../admin/configuration/configuration.vue');
const JhiDocsComponent = () => import('../admin/docs/docs.vue');
const JhiHealthComponent = () => import('../admin/health/health.vue');
const JhiLogsComponent = () => import('../admin/logs/logs.vue');
const JhiAuditsComponent = () => import('../admin/audits/audits.vue');
const JhiMetricsComponent = () => import('../admin/metrics/metrics.vue');
/* tslint:disable */
// prettier-ignore
const Production = () => import('../entities/production/production.vue');
// prettier-ignore
const ProductionUpdate = () => import('../entities/production/production-update.vue');
// prettier-ignore
const ProductionDetails = () => import('../entities/production/production-details.vue');
// prettier-ignore
const EventOfPlateMill = () => import('../entities/event-of-plate-mill/event-of-plate-mill.vue');
// prettier-ignore
const EventOfPlateMillUpdate = () => import('../entities/event-of-plate-mill/event-of-plate-mill-update.vue');
// prettier-ignore
const EventOfPlateMillDetails = () => import('../entities/event-of-plate-mill/event-of-plate-mill-details.vue');
// prettier-ignore
const PictureOfEvent = () => import('../entities/picture-of-event/picture-of-event.vue');
// prettier-ignore
const PictureOfEventUpdate = () => import('../entities/picture-of-event/picture-of-event-update.vue');
// prettier-ignore
const PictureOfEventDetails = () => import('../entities/picture-of-event/picture-of-event-details.vue');
// prettier-ignore
const ShiftManager = () => import('../entities/shift-manager/shift-manager.vue');
// prettier-ignore
const ShiftManagerUpdate = () => import('../entities/shift-manager/shift-manager-update.vue');
// prettier-ignore
const ShiftManagerDetails = () => import('../entities/shift-manager/shift-manager-details.vue');
// prettier-ignore
const HeavyPlateFinished = () => import('../entities/heavy-plate-finished/heavy-plate-finished.vue');
// prettier-ignore
const HeavyPlateFinishedUpdate = () => import('../entities/heavy-plate-finished/heavy-plate-finished-update.vue');
// prettier-ignore
const HeavyPlateFinishedDetails = () => import('../entities/heavy-plate-finished/heavy-plate-finished-details.vue');
// prettier-ignore
const Normalising = () => import('../entities/normalising/normalising.vue');
// prettier-ignore
const NormalisingUpdate = () => import('../entities/normalising/normalising-update.vue');
// prettier-ignore
const NormalisingDetails = () => import('../entities/normalising/normalising-details.vue');
// prettier-ignore
const Shipping = () => import('../entities/shipping/shipping.vue');
// prettier-ignore
const ShippingUpdate = () => import('../entities/shipping/shipping-update.vue');
// prettier-ignore
const ShippingDetails = () => import('../entities/shipping/shipping-details.vue');
// prettier-ignore
const VideoOfEvent = () => import('../entities/video-of-event/video-of-event.vue');
// prettier-ignore
const VideoOfEventUpdate = () => import('../entities/video-of-event/video-of-event-update.vue');
// prettier-ignore
const VideoOfEventDetails = () => import('../entities/video-of-event/video-of-event-details.vue');
// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

Vue.use(Router);

// prettier-ignore
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/forbidden',
      name: 'Forbidden',
      component: Error,
      meta: { error403: true }
    },
    {
      path: '/not-found',
      name: 'NotFound',
      component: Error,
      meta: { error404: true }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/activate',
      name: 'Activate',
      component: Activate
    },
    {
      path: '/reset/request',
      name: 'ResetPasswordInit',
      component: ResetPasswordInit
    },
    {
      path: '/reset/finish',
      name: 'ResetPasswordFinish',
      component: ResetPasswordFinish
    },
    {
      path: '/account/password',
      name: 'ChangePassword',
      component: ChangePassword,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/account/settings',
      name: 'Settings',
      component: Settings,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/admin/user-management',
      name: 'JhiUser',
      component: JhiUserManagementComponent,
      meta: { authorities: ['ROLE_ADMIN'] }
    },
    {
      path: '/admin/user-management/new',
      name: 'JhiUserCreate',
      component: JhiUserManagementEditComponent,
      meta: { authorities: ['ROLE_ADMIN'] }
    },
    {
      path: '/admin/user-management/:userId/edit',
      name: 'JhiUserEdit',
      component: JhiUserManagementEditComponent,
      meta: { authorities: ['ROLE_ADMIN'] }
    },
    {
      path: '/admin/user-management/:userId/view',
      name: 'JhiUserView',
      component: JhiUserManagementViewComponent,
      meta: { authorities: ['ROLE_ADMIN'] }
    },
    {
      path: '/admin/docs',
      name: 'JhiDocsComponent',
      component: JhiDocsComponent,
      meta: { authorities: ['ROLE_ADMIN'] }
    },
    {
      path: '/admin/audits',
      name: 'JhiAuditsComponent',
      component: JhiAuditsComponent,
      meta: { authorities: ['ROLE_ADMIN'] }
    },
    {
      path: '/admin/jhi-health',
      name: 'JhiHealthComponent',
      component: JhiHealthComponent,
      meta: { authorities: ['ROLE_ADMIN'] }
    },
    {
      path: '/admin/logs',
      name: 'JhiLogsComponent',
      component: JhiLogsComponent,
      meta: { authorities: ['ROLE_ADMIN'] }
    },
    {
      path: '/admin/jhi-metrics',
      name: 'JhiMetricsComponent',
      component: JhiMetricsComponent,
      meta: { authorities: ['ROLE_ADMIN'] }
    },
    {
      path: '/admin/jhi-configuration',
      name: 'JhiConfigurationComponent',
      component: JhiConfigurationComponent,
      meta: { authorities: ['ROLE_ADMIN'] }
    }
    ,
    {
      path: '/entity/production',
      name: 'Production',
      component: Production,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/production/new',
      name: 'ProductionCreate',
      component: ProductionUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/production/:productionId/edit',
      name: 'ProductionEdit',
      component: ProductionUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/production/:productionId/view',
      name: 'ProductionView',
      component: ProductionDetails,
      meta: { authorities: ['ROLE_USER'] }
    }
    ,
    {
      path: '/entity/event-of-plate-mill',
      name: 'EventOfPlateMill',
      component: EventOfPlateMill,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/event-of-plate-mill/new',
      name: 'EventOfPlateMillCreate',
      component: EventOfPlateMillUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/event-of-plate-mill/:eventOfPlateMillId/edit',
      name: 'EventOfPlateMillEdit',
      component: EventOfPlateMillUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/event-of-plate-mill/:eventOfPlateMillId/view',
      name: 'EventOfPlateMillView',
      component: EventOfPlateMillDetails,
      meta: { authorities: ['ROLE_USER'] }
    }
    ,
    {
      path: '/entity/picture-of-event',
      name: 'PictureOfEvent',
      component: PictureOfEvent,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/picture-of-event/new',
      name: 'PictureOfEventCreate',
      component: PictureOfEventUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/picture-of-event/:pictureOfEventId/edit',
      name: 'PictureOfEventEdit',
      component: PictureOfEventUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/picture-of-event/:pictureOfEventId/view',
      name: 'PictureOfEventView',
      component: PictureOfEventDetails,
      meta: { authorities: ['ROLE_USER'] }
    }
    ,
    {
      path: '/entity/shift-manager',
      name: 'ShiftManager',
      component: ShiftManager,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/shift-manager/new',
      name: 'ShiftManagerCreate',
      component: ShiftManagerUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/shift-manager/:shiftManagerId/edit',
      name: 'ShiftManagerEdit',
      component: ShiftManagerUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/shift-manager/:shiftManagerId/view',
      name: 'ShiftManagerView',
      component: ShiftManagerDetails,
      meta: { authorities: ['ROLE_USER'] }
    }
    ,
    {
      path: '/entity/heavy-plate-finished',
      name: 'HeavyPlateFinished',
      component: HeavyPlateFinished,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/heavy-plate-finished/new',
      name: 'HeavyPlateFinishedCreate',
      component: HeavyPlateFinishedUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/heavy-plate-finished/:heavyPlateFinishedId/edit',
      name: 'HeavyPlateFinishedEdit',
      component: HeavyPlateFinishedUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/heavy-plate-finished/:heavyPlateFinishedId/view',
      name: 'HeavyPlateFinishedView',
      component: HeavyPlateFinishedDetails,
      meta: { authorities: ['ROLE_USER'] }
    }
    ,
    {
      path: '/entity/normalising',
      name: 'Normalising',
      component: Normalising,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/normalising/new',
      name: 'NormalisingCreate',
      component: NormalisingUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/normalising/:normalisingId/edit',
      name: 'NormalisingEdit',
      component: NormalisingUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/normalising/:normalisingId/view',
      name: 'NormalisingView',
      component: NormalisingDetails,
      meta: { authorities: ['ROLE_USER'] }
    }
    ,
    {
      path: '/entity/shipping',
      name: 'Shipping',
      component: Shipping,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/shipping/new',
      name: 'ShippingCreate',
      component: ShippingUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/shipping/:shippingId/edit',
      name: 'ShippingEdit',
      component: ShippingUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/shipping/:shippingId/view',
      name: 'ShippingView',
      component: ShippingDetails,
      meta: { authorities: ['ROLE_USER'] }
    }
    ,
    {
      path: '/entity/video-of-event',
      name: 'VideoOfEvent',
      component: VideoOfEvent,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/video-of-event/new',
      name: 'VideoOfEventCreate',
      component: VideoOfEventUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/video-of-event/:videoOfEventId/edit',
      name: 'VideoOfEventEdit',
      component: VideoOfEventUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/video-of-event/:videoOfEventId/view',
      name: 'VideoOfEventView',
      component: VideoOfEventDetails,
      meta: { authorities: ['ROLE_USER'] }
    }
    // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
  ]
});
