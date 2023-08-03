import { User } from 'src/models/user.model'

import * as auth from '../actions/auth'

export interface State {
  currentUser: User | null
}

export const initialState: State = {
  currentUser: null,
}

export function reducer(state = initialState, action: auth.Actions): State {
  switch (action.type) {
    case auth.SET_CURRENT_USER: {
      // console.log(action.payload)
      return {
        ...state,
        currentUser: action.payload,
      }
    }
    default:
      return state
  }
}

export const getCurrentUser = (state: State) => state.currentUser
