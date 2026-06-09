'use client';

import { makeAutoObservable } from 'mobx';
import type { User } from '../types';

export class UserState {
  user: User | null = null;
  token: string | null = null;
  hasHydrated = false;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
}

export type UserStateStore = UserState;
