import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { StaffMember } from '../../data/staffCatalog';

interface CatalogState {
  items: StaffMember[];
  isLoaded: boolean;
  activeCategory: string | null;
}

const initialState: CatalogState = {
  items: [],
  isLoaded: false,
  activeCategory: null,
};

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setCatalog: (state, action: PayloadAction<StaffMember[]>) => {
      state.items = action.payload;
      state.isLoaded = true;
    },
    clearCatalog: (state) => {
      state.items = [];
      state.isLoaded = false;
      state.activeCategory = null;
    },
    setActiveCategory: (state, action: PayloadAction<string | null>) => {
      state.activeCategory = action.payload;
    },
  },
});
