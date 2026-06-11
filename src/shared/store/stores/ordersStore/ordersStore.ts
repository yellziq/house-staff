'use client';

import { OrdersAsync } from './models/ordersAsync';
import type { OrdersAsyncStore } from './models/ordersAsync';
import { OrdersState } from './models/ordersState';
import type { OrdersStateStore } from './models/ordersState';
import { OrdersSync } from './models/ordersSync';
import type { OrdersSyncStore } from './models/ordersSync';

export class OrdersStore {
  public state: OrdersStateStore;
  public sync: OrdersSyncStore;
  public async: OrdersAsyncStore;

  constructor() {
    this.state = new OrdersState();
    this.sync = new OrdersSync(this.state);
    this.async = new OrdersAsync(this.state, this.sync);
  }
}

export const ordersStore = new OrdersStore();
