export interface User {
  id: string;
  email: string;
  role: string;
  phone?: string;
  address?: string;
  interests?: string[];
}

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
  user: User;
}

export interface UpdateProfilePayload {
  phone: string;
  address: string;
}

export interface PatchInterestsPayload {
  interests: string[];
}
