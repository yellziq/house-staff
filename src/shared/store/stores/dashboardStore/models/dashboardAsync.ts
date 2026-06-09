'use client';

import { makeAutoObservable } from 'mobx';
import { homeStaffApi } from '@shared/api/homeStaffApi';
import type { DashboardStateStore } from './dashboardState';
import type { DashboardSyncStore } from './dashboardSync';

export class DashboardAsync {
  constructor(
    private readonly state: DashboardStateStore,
    private readonly sync: DashboardSyncStore,
  ) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async loadDashboard(): Promise<void> {
    if (this.state.isLoaded) {
      return;
    }

    const summary = await homeStaffApi.getDashboard();
    this.sync.setSummary(summary);
    this.sync.setIsLoaded(true);
  }
}

export type DashboardAsyncStore = DashboardAsync;
