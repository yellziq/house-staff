'use client';

import { makeAutoObservable } from 'mobx';
import { DashboardAsync } from './models/dashboardAsync';
import type { DashboardAsyncStore } from './models/dashboardAsync';
import { DashboardState } from './models/dashboardState';
import type { DashboardStateStore } from './models/dashboardState';
import { DashboardSync } from './models/dashboardSync';
import type { DashboardSyncStore } from './models/dashboardSync';
import type { DashboardSummary } from './types';

export class DashboardStore {
  state: DashboardStateStore;
  sync: DashboardSyncStore;
  async: DashboardAsyncStore;

  constructor() {
    this.state = new DashboardState();
    this.sync = new DashboardSync(this.state);
    this.async = new DashboardAsync(this.state, this.sync);
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get summary(): DashboardSummary {
    return this.sync.getSummary();
  }

  get isLoaded(): boolean {
    return this.sync.getIsLoaded();
  }

  loadDashboard(): Promise<void> {
    return this.async.loadDashboard();
  }

  decrementActiveOrders(): void {
    this.sync.decrementActiveOrders();
  }
}
