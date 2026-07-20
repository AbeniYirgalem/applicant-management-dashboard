export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  role: string;
}
export interface LoginCredentials {
  email: string;
  password: string;
}
export interface LoginResponse {
  accessToken: string;
  tokenType: "Bearer";
  expiresIn: number;
  user: AuthUser;
}
export interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: (reason?: "manual" | "expired") => void;
}
