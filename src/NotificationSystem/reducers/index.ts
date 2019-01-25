import { combineReducers } from 'redux-immutable';
import { NotificationSystemActionTypes } from '../actions/commands';
import { applyReducer, MessagesState } from './applyNotify';

export interface NotificationSystemState {
    messages: MessagesState;
}

export const NotificationSystemReducer = combineReducers<NotificationSystemState, NotificationSystemActionTypes>({
    messages: applyReducer
});

