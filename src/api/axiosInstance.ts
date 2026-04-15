import axios from 'axios';
import { store } from '../store';
import { settingsSlice } from '../store/slices/settingsSlice';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:4000/api',
});

api.interceptors.request.use((config) => {
  store.dispatch(settingsSlice.actions.setLoading(true));

  const token = store.getState().user.token || localStorage.getItem('home_staff_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    store.dispatch(settingsSlice.actions.setLoading(false));
    return response;
  },
  (error) => {
    store.dispatch(settingsSlice.actions.setLoading(false));
    store.dispatch(
      settingsSlice.actions.setError(error.response?.data?.message || error.message || 'Request failed.'),
    );
    return Promise.reject(error);
  },
);

export default api;
