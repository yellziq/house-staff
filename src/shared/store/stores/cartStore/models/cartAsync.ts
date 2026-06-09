'use client';

import { makeAutoObservable } from 'mobx';

export class CartAsync {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
}

export type CartAsyncStore = CartAsync;
