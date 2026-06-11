'use client';

import { UiAsync } from './models/uiAsync';
import type { UiAsyncStore } from './models/uiAsync';
import { UiState } from './models/uiState';
import type { UiStateStore } from './models/uiState';
import { UiSync } from './models/uiSync';
import type { UiSyncStore } from './models/uiSync';

export class UiStore {
  public state: UiStateStore;
  public sync: UiSyncStore;
  public async: UiAsyncStore;

  constructor() {
    this.state = new UiState();
    this.sync = new UiSync(this.state);
    this.async = new UiAsync();
  }
}

export const uiStore = new UiStore();
