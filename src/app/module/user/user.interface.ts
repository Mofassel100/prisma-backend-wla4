export interface TUser {
  name: string;
  email: string;
  phone?: string;
  password: string;
  address?: string;
  city?: string;
  role?: "CUSTOMER" | "PROVIDER" | "ADMIN";
  status?: "ACTIVE" | "SUSPENDED";
}
