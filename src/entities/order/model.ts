export interface CartItem {
  id: number;
  name: string;
  price: number;
}

export interface OrderItem {
  id: string;
  userId: string;
  items: CartItem[];
  createdAt: string;
}

export interface OrdersResponse {
  orders: OrderItem[];
}

export interface CreateOrderResponse {
  message: string;
  order: OrderItem;
}

export interface DeleteOrderResponse {
  message: string;
}

export interface DashboardSummary {
  activeOrders: number;
  favoriteCategory: string;
  responseTime: string;
}

export interface DashboardResponse {
  summary: DashboardSummary;
}
