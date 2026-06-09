export interface StaffMember {
  id: number;
  name: string;
  role: string;
  experience: string;
  schedule: string;
  price: number;
  rating: number;
  badge: string;
  description: string;
}

export interface StaffListResponse {
  items: StaffMember[];
}
