import {fromJS} from "immutable";
import { combineReducers } from 'redux-immutable';
import {ActionType} from "typesafe-actions";
import * as Commands from "../actions/commands";
import * as Events from "../actions/events";
import { applyReducer, MessagesState } from './applyNotify';

export type NotificationsAction = ActionType<typeof Commands> | ActionType<typeof Events>;

export interface NotificationSystemState {
    messages: MessagesState
}

export const NotificationSystemReducer = combineReducers<NotificationSystemState, NotificationsAction>({
    messages: applyReducer
}, () => fromJS({messages: undefined}));

