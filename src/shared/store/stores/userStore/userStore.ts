'use client';

import { UserAsync } from './models/userAsync';
import type { UserAsyncStore } from './models/userAsync';
import { UserState } from './models/userState';
import type { UserStateStore } from './models/userState';
import { UserSync } from './models/userSync';
import type { UserSyncStore } from './models/userSync';

export class UserStore {
  public state: UserStateStore;
  public sync: UserSyncStore;
  public async: UserAsyncStore;

  constructor() {
    this.state = new UserState();
    this.sync = new UserSync(this.state);
    this.async = new UserAsync();
  }
}

export const userStore = new UserStore();
