export interface LoginRequestInteface {
  id?: number;
  email: string;
  password: string;
}
export interface LoginResponseInteface {
  AccessToken: string;
  RefreshToken: string;
  message: string;
  userRole: string;
}

export interface LoginStateInteface {
  isSubmitting: boolean;
  userRole: string;
  AccessToken: string;
  isLogin: boolean | null;
  name: string;
  phone: number | null;
}
