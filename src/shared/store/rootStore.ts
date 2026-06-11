'use client';

import { toApiError } from '@shared/api/client';
import { UiStore, uiStore } from '@shared/store/stores/uiStore';
import { CartStore, cartStore } from '@shared/store/stores/cartStore';
import { CatalogStore, catalogStore } from '@shared/store/stores/catalogStore';
import { DashboardStore, dashboardStore } from '@shared/store/stores/dashboardStore';
import { OrdersStore, ordersStore } from '@shared/store/stores/ordersStore';
import { UserStore, userStore } from '@shared/store/stores/userStore';

export class RootStore {
  userStore: UserStore;
  catalogStore: CatalogStore;
  cartStore: CartStore;
  ordersStore: OrdersStore;
  dashboardStore: DashboardStore;
  uiStore: UiStore;

  constructor(
    userStore: UserStore,
    catalogStore: CatalogStore,
    cartStore: CartStore,
    ordersStore: OrdersStore,
    dashboardStore: DashboardStore,
    uiStore: UiStore,
  ) {
    this.userStore = userStore;
    this.catalogStore = catalogStore;
    this.cartStore = cartStore;
    this.ordersStore = ordersStore;
    this.dashboardStore = dashboardStore;
    this.uiStore = uiStore;
  }

  handleUnknownError(error: unknown): void {
    this.uiStore.sync.setError(toApiError(error).message);
  }
}

export const rootStore = new RootStore(
  userStore,
  catalogStore,
  cartStore,
  ordersStore,
  dashboardStore,
  uiStore,
);
