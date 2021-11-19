import { Action, createReducer, on } from '@ngrx/store';
import { LoginStateInteface } from 'src/app/shared/interfaces/login-state.interface';
import {
  loginAction,
  loginFailureAction,
  loginSuccessAction,
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
      AccessToken: action.AccessToken,
    })
  ),
  on(
    loginFailureAction,
    (state): LoginStateInteface => ({
      ...state,
      isSubmitting: false,
    })
  )
);

export function reducersForLogin(state: LoginStateInteface, action: Action) {
  return loginReduser(state, action);
}
