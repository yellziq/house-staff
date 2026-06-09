'use client';

import { makeAutoObservable } from 'mobx';
import { OrdersAsync } from './models/ordersAsync';
import type { OrdersAsyncStore } from './models/ordersAsync';
import { OrdersState } from './models/ordersState';
import type { OrdersStateStore } from './models/ordersState';
import { OrdersSync } from './models/ordersSync';
import type { OrdersSyncStore } from './models/ordersSync';
import type { OrderItem } from './types';

export class OrdersStore {
  state: OrdersStateStore;
  sync: OrdersSyncStore;
  async: OrdersAsyncStore;

  constructor() {
    this.state = new OrdersState();
    this.sync = new OrdersSync(this.state);
    this.async = new OrdersAsync(this.state, this.sync);
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get orders(): OrderItem[] {
    return this.sync.getOrders();
  }

  get isLoaded(): boolean {
    return this.sync.getIsLoaded();
  }

  loadOrders(): Promise<void> {
    return this.async.loadOrders();
  }

  addOrder(order: OrderItem): void {
    this.sync.addOrder(order);
  }

  removeOrder(orderId: string): void {
    this.sync.removeOrder(orderId);
  }
}
