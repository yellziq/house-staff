'use client';

import { makeAutoObservable } from 'mobx';
import { CartAsync } from './models/cartAsync';
import type { CartAsyncStore } from './models/cartAsync';
import { CartState } from './models/cartState';
import type { CartStateStore } from './models/cartState';
import { CartSync } from './models/cartSync';
import type { CartSyncStore } from './models/cartSync';
import type { CartItem } from './types';

export class CartStore {
  state: CartStateStore;
  sync: CartSyncStore;
  async: CartAsyncStore;

  constructor() {
    this.state = new CartState();
    this.sync = new CartSync(this.state);
    this.async = new CartAsync();
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get items(): CartItem[] {
    return this.sync.getItems();
  }

  get total(): number {
    return this.sync.getTotal();
  }

  add(item: CartItem): void {
    this.sync.add(item);
  }

  clear(): void {
    this.sync.clear();
  }
}
