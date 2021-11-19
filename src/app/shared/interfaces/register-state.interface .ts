export interface RegisterRequestInteface {
  id?: number;
  roles: { role: string };
  email: string;
  password: string;
}
export interface RegisterResponseInteface {
  message: string;
}

export interface RegisterStateInteface {
  isSubmitting: boolean;
  response: string;
  isRegistred: boolean | null;
}
