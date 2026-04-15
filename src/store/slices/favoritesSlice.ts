import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
