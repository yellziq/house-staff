import axios, { AxiosError, type AxiosInstance } from 'axios';

export interface ApiError {
  message: string;
  status: number;
}

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  if (typeof window === 'undefined') {
    return config;
  }

  const token = window.localStorage.getItem('home_staff_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const toApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message?: string }>;
    return {
      message: axiosError.response?.data?.message || 'Ошибка запроса к серверу.',
      status: axiosError.response?.status || 500,
    };
  }

  return {
    message: 'Неизвестная ошибка приложения.',
    status: 500,
  };
};

export default apiClient;
