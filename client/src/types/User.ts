export interface UserInterface {
  id: number;
  name: string;
  email: string;
  created_at: string;
  role: string;
  cellphone?: string;
  address?: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface MyJwtPayload {
  id: number;
  email: string;
  role: string;
}