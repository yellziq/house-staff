'use client';

import { makeAutoObservable } from 'mobx';
import type { OrderItem } from '../types';

export class OrdersState {
  orders: OrderItem[] = [];
  isLoaded = false;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
}

export type OrdersStateStore = OrdersState;
