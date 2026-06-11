'use client';

import { CartAsync } from './models/cartAsync';
import type { CartAsyncStore } from './models/cartAsync';
import { CartState } from './models/cartState';
import type { CartStateStore } from './models/cartState';
import { CartSync } from './models/cartSync';
import type { CartSyncStore } from './models/cartSync';

export class CartStore {
  public state: CartStateStore;
  public sync: CartSyncStore;
  public async: CartAsyncStore;

  constructor() {
    this.state = new CartState();
    this.sync = new CartSync(this.state);
    this.async = new CartAsync();
  }
}

export const cartStore = new CartStore();
