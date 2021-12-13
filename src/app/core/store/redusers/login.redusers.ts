import { Action, createReducer, on } from '@ngrx/store';
import { LoginStateInteface } from 'src/app/shared/interfaces/login-state.interface';
import {
  loginAction,
  loginFailureAction,
  loginSuccessAction,
  logoutAction,
} from '../actions/auth.action';
import { loginInitialState } from '../state/auth-state';

const loginReduser = createReducer(
  loginInitialState,
  on(
    loginAction,
    (state): LoginStateInteface => ({
      ...state,
      isSubmitting: true,
    })
  ),
  on(
    loginSuccessAction,
    (state, action): LoginStateInteface => ({
      ...state,
      isSubmitting: false,
      isLogin: true,
      userRole: action.userRole,
      userId: action.userId,
      AccessToken: action.AccessToken,
      name: action.name,
      phone: action.phone,
      email: action.email,
      errors: null,
    })
  ),
  on(
    loginFailureAction,
    (state, action): LoginStateInteface => ({
      ...state,
      isSubmitting: false,
      isLogin: false,
      errors: action.errors,
    })
  ),
  on(
    logoutAction,
    (state): LoginStateInteface => ({
      ...state,
      isLogin: false,
    })
  )
);

export function reducersForLogin(state: LoginStateInteface, action: Action) {
  return loginReduser(state, action);
}
