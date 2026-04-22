import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { DashboardResponse } from '../../api/homeStaffApi';

type DashboardSummary = DashboardResponse['summary'];

interface DashboardState {
  summary: DashboardSummary;
  isLoaded: boolean;
}

const initialState: DashboardState = {
  summary: {
    activeOrders: 0,
    favoriteCategory: 'Няни и домработницы',
    responseTime: '24 часа',
  },
  isLoaded: false,
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setSummary: (state, action: PayloadAction<DashboardSummary>) => {
      state.summary = action.payload;
      state.isLoaded = true;
    },
    decrementActiveOrders: (state) => {
      state.summary.activeOrders = Math.max(0, state.summary.activeOrders - 1);
    },
    resetDashboard: (state) => {
      state.summary = initialState.summary;
      state.isLoaded = false;
    },
  },
});
