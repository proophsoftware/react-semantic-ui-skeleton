import { AxiosRequestConfig } from 'axios';
import { action } from 'typesafe-actions';
import {RESET_WEB_DATA, SEND_HTTP_REQUEST} from "./constants";
import {WebData} from "./WebData";

export const sendHttpRequest = <TMeta> (request: AxiosRequestConfig, responseActionType: string, metadata?: TMeta) => action(SEND_HTTP_REQUEST, {request, responseActionType, metadata});

export const responseAction = <D, TMeta> (responseActionType: string, webData: WebData<D>, metadata?: TMeta) => action(responseActionType, {webData, metadata});

export const resetWebData = (responseActionType: string) => action(RESET_WEB_DATA, {responseActionType});