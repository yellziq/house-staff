'use client';

import { makeAutoObservable } from 'mobx';
import type { UiError, UiMessage } from '../types';

export class UiState {
  message: UiMessage = null;
  error: UiError = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
}

export type UiStateStore = UiState;
