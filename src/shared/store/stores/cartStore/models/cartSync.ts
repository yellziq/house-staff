'use client';

import { makeAutoObservable } from 'mobx';
import type { CartItem } from '../types';
import type { CartStateStore } from './cartState';

export class CartSync {
  constructor(private readonly state: CartStateStore) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  getItems(): CartItem[] {
    return this.state.items;
  }

  getTotal(): number {
    return this.state.items.reduce((sum, item) => sum + item.price, 0);
  }

  add(item: CartItem): void {
    this.state.items.push(item);
  }

  clear(): void {
    this.state.items = [];
  }
}

export type CartSyncStore = CartSync;
