'use client';

import { makeAutoObservable } from 'mobx';

export class UserAsync {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
}

export type UserAsyncStore = UserAsync;
