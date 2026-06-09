'use client';

import { makeAutoObservable } from 'mobx';
import type { AuthResponse, User } from '../types';
import type { UserStateStore } from './userState';

export class UserSync {
  constructor(private readonly state: UserStateStore) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  getUser(): User | null {
    return this.state.user;
  }

  getToken(): string | null {
    return this.state.token;
  }

  getHasHydrated(): boolean {
    return this.state.hasHydrated;
  }

  getIsAuth(): boolean {
    return Boolean(this.state.user && this.state.token);
  }

  hydrate(): void {
    const token = window.localStorage.getItem('home_staff_token');
    const rawUser = window.localStorage.getItem('home_staff_user');

    if (token && rawUser) {
      this.state.token = token;
      this.state.user = JSON.parse(rawUser) as User;
    }

    this.state.hasHydrated = true;
  }

  setAuth(response: AuthResponse): void {
    this.state.user = response.user;
    this.state.token = response.token;
    window.localStorage.setItem('home_staff_token', response.token);
    window.localStorage.setItem('home_staff_user', JSON.stringify(response.user));
  }

  logout(): void {
    this.state.user = null;
    this.state.token = null;
    window.localStorage.removeItem('home_staff_token');
    window.localStorage.removeItem('home_staff_user');
  }
}

export type UserSyncStore = UserSync;
