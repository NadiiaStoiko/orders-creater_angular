import { ActionsType } from './register-action-tipes';
import { createAction, props } from '@ngrx/store';
import { RegisterRequestInteface } from 'src/app/shared/interfaces/register-state.interface ';

export const registerAction = createAction(
  ActionsType.REGISTER,
  props<RegisterRequestInteface>()
);
