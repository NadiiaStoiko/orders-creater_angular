import { Action, createReducer, on } from '@ngrx/store';
import { RegisterStateInteface } from 'src/app/shared/interfaces/register-state.interface ';
import {
  registerAction,
  registerFailureAction,
  registerSuccessAction,
} from '../actions/auth.action';
import { registerInitialState } from '../state/auth-state';

const registerReduser = createReducer(
  registerInitialState,
  on(
    registerAction,
    (state): RegisterStateInteface => ({
      ...state,
      isSubmitting: true,
    })
  ),
  on(
    registerSuccessAction,
    (state, action): RegisterStateInteface => ({
      ...state,
      isSubmitting: false,
      isRegistred: true,
      response: action.response.message,
    })
  ),
  on(
    registerFailureAction,
    (state): RegisterStateInteface => ({
      ...state,
      isSubmitting: false,
    })
  )
);

export function reducersForRegister(
  state: RegisterStateInteface,
  action: Action
) {
  return registerReduser(state, action);
}
