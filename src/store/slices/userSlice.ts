import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserData {
  id: string;
  email: string;
  role: string;
  phone?: string;
  address?: string;
  interests?: string[];
}

interface UserState {
  data: UserData | null;
  isAuth: boolean;
  token: string | null;
}

const savedToken = localStorage.getItem('home_staff_token');
const savedUser = localStorage.getItem('home_staff_user');

const initialState: UserState = {
  data: savedUser ? JSON.parse(savedUser) : null,
  isAuth: Boolean(savedToken && savedUser),
  token: savedToken,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: UserData; token: string }>) => {
      state.data = action.payload.user;
      state.token = action.payload.token;
      state.isAuth = true;
      localStorage.setItem('home_staff_token', action.payload.token);
      localStorage.setItem('home_staff_user', JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.data = null;
      state.token = null;
      state.isAuth = false;
      localStorage.removeItem('home_staff_token');
      localStorage.removeItem('home_staff_user');
    },
  },
});
