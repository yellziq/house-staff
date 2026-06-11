'use client';

import { CatalogAsync } from './models/catalogAsync';
import type { CatalogAsyncStore } from './models/catalogAsync';
import { CatalogState } from './models/catalogState';
import type { CatalogStateStore } from './models/catalogState';
import { CatalogSync } from './models/catalogSync';
import type { CatalogSyncStore } from './models/catalogSync';

export class CatalogStore {
  public state: CatalogStateStore;
  public sync: CatalogSyncStore;
  public async: CatalogAsyncStore;

  constructor() {
    this.state = new CatalogState();
    this.sync = new CatalogSync(this.state);
    this.async = new CatalogAsync(this.state, this.sync);
  }
}

export const catalogStore = new CatalogStore();
