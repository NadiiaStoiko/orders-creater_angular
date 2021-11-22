import { ActionsType } from './auth-action-tipes';
import { createAction, props } from '@ngrx/store';
import {
  RegisterRequestInteface,
  RegisterResponseInteface,
} from 'src/app/shared/interfaces/register-state.interface ';

export const registerAction = createAction(
  ActionsType.REGISTER,
  props<{ request: RegisterRequestInteface }>()
);

export const registerSuccessAction = createAction(
  ActionsType.REGISTER_SUCCESS,
  props<{ response: RegisterResponseInteface }>()
);

export const registerFailureAction = createAction(ActionsType.REGISTER_FAILURE);

export const loginAction = createAction(
  ActionsType.LOGIN,
  props<{ request: RegisterRequestInteface }>()
);

export const loginSuccessAction = createAction(
  ActionsType.LOGIN_SUCCESS,
  props<{
    AccessToken: string;
    userRole: string;
    name: string;
    phone: number | null;
  }>()
);

export const loginFailureAction = createAction(ActionsType.LOGIN_FAILURE);
