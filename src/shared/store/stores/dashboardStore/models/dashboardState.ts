'use client';

import { makeAutoObservable } from 'mobx';
import type { DashboardSummary } from '../types';

const defaultSummary: DashboardSummary = {
  activeOrders: 0,
  favoriteCategory: 'Няни и домработницы',
  responseTime: '24 часа',
};

export class DashboardState {
  summary: DashboardSummary = defaultSummary;
  isLoaded = false;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
}

export type DashboardStateStore = DashboardState;
