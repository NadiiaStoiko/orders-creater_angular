export interface RegisterRequestInteface {
  id?: number;
  name: string;
  email: string;
  password: string;
  phone: number;
  roles: { role: string };
}
export interface RegisterResponseInteface {
  message: string;
}

export interface RegisterStateInteface {
  isSubmitting: boolean;
  response: string;
  isRegistred: boolean | null;
  errors: string | null;
}
