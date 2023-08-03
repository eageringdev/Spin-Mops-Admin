import {
  ActionReducer,
  ActionReducerMap,
  combineReducers,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store'

import * as fromAuth from './auth'

export interface State {
  auth: fromAuth.State
}

export const reducers: ActionReducerMap<State> = {
  auth: fromAuth.reducer,
}

//selectors

//auth selectors
export const selectAuthState = createFeatureSelector<fromAuth.State>('auth')
export const getCurrentUser = createSelector(
  selectAuthState,
  fromAuth.getCurrentUser,
)
