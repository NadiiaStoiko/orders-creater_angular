import { createSelector } from '@ngrx/store';
import { createFeatureSelector } from '@ngrx/store';
import { LoginStateInteface } from 'src/app/shared/interfaces/login-state.interface';
import { RegisterStateInteface } from 'src/app/shared/interfaces/register-state.interface ';

export const registerFeatureSelector =
  createFeatureSelector<RegisterStateInteface>('register');

export const isSubmittingSelector = createSelector(
  registerFeatureSelector,
  (registerState: RegisterStateInteface) => registerState.isSubmitting
);

export const loginFeatureSelector =
  createFeatureSelector<LoginStateInteface>('login');

export const isSubmittingLoginSelector = createSelector(
  loginFeatureSelector,
  (loginState: LoginStateInteface) => loginState.isSubmitting
);

export const userRoleSelector = createSelector(
  loginFeatureSelector,
  (loginState: LoginStateInteface) => loginState.userRole
);

export const isLogginSelector = createSelector(
  loginFeatureSelector,
  (loginState: LoginStateInteface) => loginState.isLogin
);

export const LogginErrorsSelector = createSelector(
  loginFeatureSelector,
  (loginState: LoginStateInteface) => loginState.errors
);
