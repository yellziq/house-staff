'use client';

import { makeAutoObservable } from 'mobx';
import { toApiError } from '@shared/api/client';
import { UiStore } from '@shared/store/stores/uiStore';
import { CartStore } from '@shared/store/stores/cartStore';
import { CatalogStore } from '@shared/store/stores/catalogStore';
import { DashboardStore } from '@shared/store/stores/dashboardStore';
import { OrdersStore } from '@shared/store/stores/ordersStore';
import { UserStore } from '@shared/store/stores/userStore';

export class RootStore {
  userStore: UserStore;
  catalogStore: CatalogStore;
  cartStore: CartStore;
  ordersStore: OrdersStore;
  dashboardStore: DashboardStore;
  uiStore: UiStore;

  constructor() {
    this.userStore = new UserStore();
    this.catalogStore = new CatalogStore();
    this.cartStore = new CartStore();
    this.ordersStore = new OrdersStore();
    this.dashboardStore = new DashboardStore();
    this.uiStore = new UiStore();
    makeAutoObservable(this, {}, { autoBind: true });
  }

  handleUnknownError(error: unknown): void {
    this.uiStore.setError(toApiError(error).message);
  }
}

export const rootStore = new RootStore();
