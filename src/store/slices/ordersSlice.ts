import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface OrderItem {
  id: string;
  createdAt: string;
  items: Array<{
    id: number;
    name: string;
    price: number;
  }>;
}

interface OrdersState {
  items: OrderItem[];
  isLoaded: boolean;
}

const initialState: OrdersState = {
  items: [],
  isLoaded: false,
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<OrderItem[]>) => {
      state.items = action.payload;
      state.isLoaded = true;
    },
    addOrder: (state, action: PayloadAction<OrderItem>) => {
      state.items = [action.payload, ...state.items];
      state.isLoaded = true;
    },
    removeOrder: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    resetOrders: (state) => {
      state.items = [];
      state.isLoaded = false;
    },
  },
});
