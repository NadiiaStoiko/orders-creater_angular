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

export const isRegistredSelector = createSelector(
  registerFeatureSelector,
  (registerState: RegisterStateInteface) => registerState.isRegistred
);

export const isRegistredErrorSelector = createSelector(
  registerFeatureSelector,
  (registerState: RegisterStateInteface) => registerState.errors
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

export const userPhoneSelector = createSelector(
  loginFeatureSelector,
  (loginState: LoginStateInteface) => loginState.phone
);
export const userEmailSelector = createSelector(
  loginFeatureSelector,
  (loginState: LoginStateInteface) => loginState.email
);

export const userIdSelector = createSelector(
  loginFeatureSelector,
  (loginState: LoginStateInteface) => loginState.userId
);

export const userNameSelector = createSelector(
  loginFeatureSelector,
  (loginState: LoginStateInteface) => loginState.name
);
