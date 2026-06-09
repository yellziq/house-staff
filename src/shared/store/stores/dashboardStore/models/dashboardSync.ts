'use client';

import { makeAutoObservable } from 'mobx';
import type { DashboardSummary } from '../types';
import type { DashboardStateStore } from './dashboardState';

export class DashboardSync {
  constructor(private readonly state: DashboardStateStore) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  getSummary(): DashboardSummary {
    return this.state.summary;
  }

  getIsLoaded(): boolean {
    return this.state.isLoaded;
  }

  setSummary(summary: DashboardSummary): void {
    this.state.summary = summary;
  }

  setIsLoaded(isLoaded: boolean): void {
    this.state.isLoaded = isLoaded;
  }

  decrementActiveOrders(): void {
    this.state.summary = {
      ...this.state.summary,
      activeOrders: Math.max(0, this.state.summary.activeOrders - 1),
    };
  }
}

export type DashboardSyncStore = DashboardSync;
