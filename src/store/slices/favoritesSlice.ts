import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppDispatch } from '..';
import { ordersSlice } from './ordersSlice';
import { userSlice } from './userSlice';

interface FavoritesState {
  ids: number[];
}

const initialState: FavoritesState = {
  ids: [],
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const exists = state.ids.includes(action.payload);
      state.ids = exists
        ? state.ids.filter((id) => id !== action.payload)
        : [...state.ids, action.payload];
    },
    resetFavorites: (state) => {
      state.ids = [];
    },
  },
});

export const logoutAndResetUserData = () => (dispatch: AppDispatch) => {
  dispatch(userSlice.actions.logout());
  dispatch(favoritesSlice.actions.resetFavorites());
  dispatch(ordersSlice.actions.resetOrders());
};
