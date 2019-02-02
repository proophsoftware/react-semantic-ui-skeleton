import {fromJS} from "immutable";
import { Action, AnyAction, Dispatch } from 'redux';
import { combineReducers } from 'redux-immutable';
import {ActionType} from "typesafe-actions";
import {NotificationSystemReducer, NotificationSystemState} from './NotificationSystem/reducers';

export interface ApplicationState {
    notificationSystem: NotificationSystemState,
}

// Additional props for connected React components. This prop is passed by default with `connect()`
export interface ConnectedReduxProps<A extends Action = AnyAction> {
    dispatch: Dispatch<A>
}

// Whenever an action is dispatched, Redux will update each top-level application state property
// using the reducer with the matching name. It's important that the names match exactly, and that
// the reducer acts on the corresponding ApplicationState property type.
export const rootReducer = combineReducers<{notificationSystem: NotificationSystemState}, ActionType<any>>(
    {
        notificationSystem: NotificationSystemReducer
    },
    () => fromJS({notificationSystem: undefined})
);