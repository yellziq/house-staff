'use client';

import { makeAutoObservable } from 'mobx';

export class UiAsync {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
}

export type UiAsyncStore = UiAsync;
