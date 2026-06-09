'use client';

import { makeAutoObservable } from 'mobx';
import { homeStaffApi } from '@shared/api/homeStaffApi';
import type { CatalogStateStore } from './catalogState';
import type { CatalogSyncStore } from './catalogSync';

export class CatalogAsync {
  constructor(
    private readonly state: CatalogStateStore,
    private readonly sync: CatalogSyncStore,
  ) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async loadStaff(): Promise<void> {
    if (this.state.isLoaded) {
      return;
    }

    const staff = await homeStaffApi.getStaff();
    this.sync.setStaff(staff);
    this.sync.setIsLoaded(true);
  }
}

export type CatalogAsyncStore = CatalogAsync;
