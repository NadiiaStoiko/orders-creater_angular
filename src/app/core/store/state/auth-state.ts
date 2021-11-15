import { RegisterStateInteface } from 'src/app/shared/interfaces/register-state.interface ';
import { LoginStateInteface } from 'src/app/shared/interfaces/login-state.interface';

export const registerInitialState: RegisterStateInteface = {
  isSubmitting: false,
  response: '',
  isRegistred: null,
};

export const loginInitialState: LoginStateInteface = {
  isSubmitting: false,
  userRole: '',
  AccessToken: '',
  isLogin: null,
};
