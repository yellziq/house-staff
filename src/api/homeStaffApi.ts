import api from './axiosInstance';
import type { CartItem } from '../store/slices/cartSlice';
import type { OrderItem } from '../store/slices/ordersSlice';
import type { StaffMember } from '../data/staffCatalog';

export interface AuthPayload {
  email: string;
  password: string;
}

export interface RegisterPayload extends AuthPayload {
  phone: string;
  address: string;
  interests: string[];
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    role: string;
    phone?: string;
    address?: string;
    interests?: string[];
  };
}

export interface DashboardResponse {
  summary: {
    activeOrders: number;
    favoriteCategory: string;
    responseTime: string;
  };
}

export interface UpdateProfilePayload {
  phone: string;
  address: string;
}

export interface PatchInterestsPayload {
  interests: string[];
}

export const homeStaffApi = {
  async getStaff() {
    const response = await api.get<{ items: StaffMember[] }>('/staff');
    return response.data.items;
  },

  async getProfile() {
    const response = await api.get<AuthResponse>('/profile');
    return response.data;
  },

  async login(payload: AuthPayload) {
    const response = await api.post<AuthResponse>('/login', payload);
    return response.data;
  },

  async register(payload: RegisterPayload) {
    const response = await api.post<AuthResponse>('/register', payload);
    return response.data;
  },

  async getDashboard() {
    const response = await api.get<DashboardResponse>('/dashboard');
    return response.data.summary;
  },

  async getOrders() {
    const response = await api.get<{ orders: OrderItem[] }>('/orders');
    return response.data.orders;
  },

  async createOrder(items: CartItem[]) {
    const response = await api.post<{ message: string; order: OrderItem }>('/orders', { items });
    return response.data;
  },

  async updateProfile(payload: UpdateProfilePayload) {
    const response = await api.put<AuthResponse>('/profile', payload);
    return response.data;
  },

  async patchInterests(payload: PatchInterestsPayload) {
    const response = await api.patch<AuthResponse>('/profile/interests', payload);
    return response.data;
  },

  async deleteOrder(orderId: string) {
    const response = await api.delete<{ message: string }>(`/orders/${orderId}`);
    return response.data;
  },
};
