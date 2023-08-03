import { Action } from '@ngrx/store'
import { User } from 'src/models/user.model'

export const SET_CURRENT_USER = '[AUTH] SET_CURRENT_USER'

export class setCurrentUserAction implements Action {
  readonly type = SET_CURRENT_USER
  constructor(public payload: User) {}
}

export type Actions = setCurrentUserAction
