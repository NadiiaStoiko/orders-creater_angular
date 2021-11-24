export interface LoginRequestInteface {
  email: string;
  password: string;
}
export interface LoginResponseInteface {
  AccessToken: string;
  userRole: string;
  name: string;
  phone: number | null;
}
export interface LoginErrorResponseInteface {
  message: string;
}
export interface LoginStateInteface {
  isSubmitting: boolean;
  userRole: string;
  AccessToken: string;
  isLogin: boolean | null;
  name: string;
  phone: number | null;
  errors: string | null;
}
