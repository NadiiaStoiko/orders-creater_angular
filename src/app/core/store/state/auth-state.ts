import { RegisterStateInteface } from 'src/app/shared/interfaces/register-state.interface ';
import { LoginStateInteface } from 'src/app/shared/interfaces/login-state.interface';

export const registerInitialState: RegisterStateInteface = {
  isSubmitting: false,
  response: '',
  isRegistred: null,
  errors: null,
};

export const loginInitialState: LoginStateInteface = {
  isSubmitting: false,
  userRole: '',
  AccessToken: '',
  isLogin: false,
  name: '',
  phone: null,
  email: '',
  userId: null,
  errors: null,
};
