import type { CartItem, CreateOrderResponse, DashboardResponse, DashboardSummary, DeleteOrderResponse, OrderItem, OrdersResponse } from '@entities/order/model';
import type { StaffListResponse, StaffMember } from '@entities/staff/model';
import type { AuthPayload, AuthResponse, PatchInterestsPayload, RegisterPayload, UpdateProfilePayload } from '@entities/user/model';
import apiClient from '@shared/api/client';

export const homeStaffApi = {
  async getStaff(): Promise<StaffMember[]> {
    const response = await apiClient.get<StaffListResponse>('/staff');
    return response.data.items;
  },

  async getProfile(): Promise<AuthResponse> {
    const response = await apiClient.get<AuthResponse>('/profile');
    return response.data;
  },

  async login(payload: AuthPayload): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/login', payload);
    return response.data;
  },

  async register(payload: RegisterPayload): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/register', payload);
    return response.data;
  },

  async getDashboard(): Promise<DashboardSummary> {
    const response = await apiClient.get<DashboardResponse>('/dashboard');
    return response.data.summary;
  },

  async getOrders(): Promise<OrderItem[]> {
    const response = await apiClient.get<OrdersResponse>('/orders');
    return response.data.orders;
  },

  async createOrder(items: CartItem[]): Promise<CreateOrderResponse> {
    const response = await apiClient.post<CreateOrderResponse>('/orders', { items });
    return response.data;
  },

  async updateProfile(payload: UpdateProfilePayload): Promise<AuthResponse> {
    const response = await apiClient.put<AuthResponse>('/profile', payload);
    return response.data;
  },

  async patchInterests(payload: PatchInterestsPayload): Promise<AuthResponse> {
    const response = await apiClient.patch<AuthResponse>('/profile/interests', payload);
    return response.data;
  },

  async deleteOrder(orderId: string): Promise<DeleteOrderResponse> {
    const response = await apiClient.delete<DeleteOrderResponse>(`/orders/${orderId}`);
    return response.data;
  },
};
