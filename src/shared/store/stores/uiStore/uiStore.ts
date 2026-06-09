'use client';

import { makeAutoObservable } from 'mobx';
import { UiAsync } from './models/uiAsync';
import type { UiAsyncStore } from './models/uiAsync';
import { UiState } from './models/uiState';
import type { UiStateStore } from './models/uiState';
import { UiSync } from './models/uiSync';
import type { UiSyncStore } from './models/uiSync';
import type { UiError, UiMessage } from './types';

export class UiStore {
  state: UiStateStore;
  sync: UiSyncStore;
  async: UiAsyncStore;

  constructor() {
    this.state = new UiState();
    this.sync = new UiSync(this.state);
    this.async = new UiAsync();
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get message(): UiMessage {
    return this.sync.getMessage();
  }

  get error(): UiError {
    return this.sync.getError();
  }

  setMessage(message: string): void {
    this.sync.setMessage(message);
  }

  setError(error: string): void {
    this.sync.setError(error);
  }

  clear(): void {
    this.sync.clear();
  }
}
