import {ActionType} from "typesafe-actions";
import * as actions from './actions';
import {sendHttpRequest} from "./actions";

export type ApiAction = ActionType<typeof actions>;
export type SendHttpRequestAction = ActionType<typeof sendHttpRequest>;