'use client';

import { makeAutoObservable } from 'mobx';
import type { StaffMember } from '../types';

export class CatalogState {
  staff: StaffMember[] = [];
  activeCategory: string | null = null;
  isLoaded = false;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
}

export type CatalogStateStore = CatalogState;
