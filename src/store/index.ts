import { configureStore } from '@reduxjs/toolkit';
import { catalogSlice } from './slices/catalogSlice';
import { cartSlice } from './slices/cartSlice';
import { favoritesSlice } from './slices/favoritesSlice';
import { ordersSlice } from './slices/ordersSlice';
import { settingsSlice } from './slices/settingsSlice';
import { userSlice } from './slices/userSlice';

export const store = configureStore({
  reducer: {
    catalog: catalogSlice.reducer,
    cart: cartSlice.reducer,
    favorites: favoritesSlice.reducer,
    orders: ordersSlice.reducer,
    settings: settingsSlice.reducer,
    user: userSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
