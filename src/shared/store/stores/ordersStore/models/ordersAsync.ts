'use client';

import { makeAutoObservable } from 'mobx';
import { homeStaffApi } from '@shared/api/homeStaffApi';
import type { OrdersStateStore } from './ordersState';
import type { OrdersSyncStore } from './ordersSync';

export class OrdersAsync {
  constructor(
    private readonly state: OrdersStateStore,
    private readonly sync: OrdersSyncStore,
  ) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async loadOrders(): Promise<void> {
    if (this.state.isLoaded) {
      return;
    }

    const orders = await homeStaffApi.getOrders();
    this.sync.setOrders(orders);
    this.sync.setIsLoaded(true);
  }
}

export type OrdersAsyncStore = OrdersAsync;
