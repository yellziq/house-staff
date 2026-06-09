'use client';

import { makeAutoObservable } from 'mobx';
import { UserAsync } from './models/userAsync';
import type { UserAsyncStore } from './models/userAsync';
import { UserState } from './models/userState';
import type { UserStateStore } from './models/userState';
import { UserSync } from './models/userSync';
import type { UserSyncStore } from './models/userSync';
import type { AuthResponse, User } from './types';

export class UserStore {
  state: UserStateStore;
  sync: UserSyncStore;
  async: UserAsyncStore;

  constructor() {
    this.state = new UserState();
    this.sync = new UserSync(this.state);
    this.async = new UserAsync();
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get user(): User | null {
    return this.sync.getUser();
  }

  get token(): string | null {
    return this.sync.getToken();
  }

  get hasHydrated(): boolean {
    return this.sync.getHasHydrated();
  }

  get isAuth(): boolean {
    return this.sync.getIsAuth();
  }

  hydrate(): void {
    this.sync.hydrate();
  }

  setAuth(response: AuthResponse): void {
    this.sync.setAuth(response);
  }

  logout(): void {
    this.sync.logout();
  }
}
