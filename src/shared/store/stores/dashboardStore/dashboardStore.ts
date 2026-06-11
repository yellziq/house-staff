'use client';

import { DashboardAsync } from './models/dashboardAsync';
import type { DashboardAsyncStore } from './models/dashboardAsync';
import { DashboardState } from './models/dashboardState';
import type { DashboardStateStore } from './models/dashboardState';
import { DashboardSync } from './models/dashboardSync';
import type { DashboardSyncStore } from './models/dashboardSync';

export class DashboardStore {
  public state: DashboardStateStore;
  public sync: DashboardSyncStore;
  public async: DashboardAsyncStore;

  constructor() {
    this.state = new DashboardState();
    this.sync = new DashboardSync(this.state);
    this.async = new DashboardAsync(this.state, this.sync);
  }
}

export const dashboardStore = new DashboardStore();
