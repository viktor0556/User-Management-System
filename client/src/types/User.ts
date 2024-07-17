export interface UserInterface {
  id: number;
  name: string;
  email: string;
  created_at: string;
  role: string;
}

export interface LoginResponse {
  token: string;
  redirectTo: string;
  name: string;
}

export interface MyJwtPayload {
  id: number;
  email: string;
  role: string;
}