'use client';

import { makeAutoObservable } from 'mobx';
import { CatalogAsync } from './models/catalogAsync';
import type { CatalogAsyncStore } from './models/catalogAsync';
import { CatalogState } from './models/catalogState';
import type { CatalogStateStore } from './models/catalogState';
import { CatalogSync } from './models/catalogSync';
import type { CatalogSyncStore } from './models/catalogSync';
import type { StaffMember } from './types';

export class CatalogStore {
  state: CatalogStateStore;
  sync: CatalogSyncStore;
  async: CatalogAsyncStore;

  constructor() {
    this.state = new CatalogState();
    this.sync = new CatalogSync(this.state);
    this.async = new CatalogAsync(this.state, this.sync);
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get staff(): StaffMember[] {
    return this.sync.getStaff();
  }

  get activeCategory(): string | null {
    return this.sync.getActiveCategory();
  }

  get isLoaded(): boolean {
    return this.sync.getIsLoaded();
  }

  get filteredStaff(): StaffMember[] {
    return this.sync.getFilteredStaff();
  }

  loadStaff(): Promise<void> {
    return this.async.loadStaff();
  }

  setActiveCategory(category: string | null): void {
    this.sync.setActiveCategory(category);
  }
}
