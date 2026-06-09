'use client';

import { makeAutoObservable } from 'mobx';
import type { UiError, UiMessage } from '../types';
import type { UiStateStore } from './uiState';

export class UiSync {
  constructor(private readonly state: UiStateStore) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  getMessage(): UiMessage {
    return this.state.message;
  }

  getError(): UiError {
    return this.state.error;
  }

  setMessage(message: string): void {
    this.state.message = message;
    this.state.error = null;
  }

  setError(error: string): void {
    this.state.error = error;
    this.state.message = null;
  }

  clear(): void {
    this.state.message = null;
    this.state.error = null;
  }
}

export type UiSyncStore = UiSync;
