'use client';

import { makeAutoObservable } from 'mobx';
import type { OrderItem } from '../types';
import type { OrdersStateStore } from './ordersState';

export class OrdersSync {
  constructor(private readonly state: OrdersStateStore) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  getOrders(): OrderItem[] {
    return this.state.orders;
  }

  getIsLoaded(): boolean {
    return this.state.isLoaded;
  }

  setOrders(orders: OrderItem[]): void {
    this.state.orders = orders;
  }

  setIsLoaded(isLoaded: boolean): void {
    this.state.isLoaded = isLoaded;
  }

  addOrder(order: OrderItem): void {
    this.state.orders = [order, ...this.state.orders];
    this.state.isLoaded = true;
  }

  removeOrder(orderId: string): void {
    this.state.orders = this.state.orders.filter((order) => order.id !== orderId);
  }
}

export type OrdersSyncStore = OrdersSync;
