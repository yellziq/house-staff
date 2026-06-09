'use client';

import { makeAutoObservable } from 'mobx';
import type { CartItem } from '../types';

export class CartState {
  items: CartItem[] = [];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
}

export type CartStateStore = CartState;
