// Use `const enum`s for better autocompletion of action type names. These will
// be compiled away leaving only the final value in your compiled code.
//
// Define however naming conventions you'd like for your action types, but
// personally, I use the `@@context/ACTION_TYPE` convention, to follow the convention
// of Redux's `@@INIT` action.
import { AxiosRequestConfig } from 'axios';
import { Action } from 'redux';
import { action } from 'typesafe-actions';

export interface WebDataNotAsked {
    type: 'notAsked';
    data?: undefined;
    msg?: undefined;
}

export interface WebDataLoading {
    type: 'loading';
    data?: undefined;
    msg?: undefined;
}

export interface WebDataFailure {
    type: 'error';
    data?: undefined;
    msg: string;
}

export interface WebDataSuccess<D> {
    type: 'success';
    data: D;
    msg?: undefined;
}

export type WebData<D> = WebDataNotAsked | WebDataLoading | WebDataFailure | WebDataSuccess<D>;

export interface WebDataAction<D, TMeta> extends Action {
    webData: WebData<D>;
    metadata: TMeta;
}

export const enum ApiActions {
    SEND_HTTP_REQUEST = '@@api/SEND_HTTP_REQUEST',
    SEND_GRAPHQL_QUERY = '@@api/SEND_GRAPHQL_QUERY',
}

export interface SendHttpRequest {
    request: AxiosRequestConfig;
    responseAction: string;
}

export interface SendHttpRequestAction extends SendHttpRequest{
    type: ApiActions.SEND_HTTP_REQUEST,
}

export interface SendGraphQlQueryAction extends SendHttpRequest {
    type: ApiActions.SEND_GRAPHQL_QUERY,
    test: string;
}

export type ApiActionTypes = SendHttpRequestAction | SendGraphQlQueryAction;

export const sendHttpRequest = <TMeta> (request: AxiosRequestConfig, responseAction: string, metadata?: TMeta  ) => action<string, SendHttpRequest, TMeta | undefined>(ApiActions.SEND_HTTP_REQUEST, {request, responseAction}, metadata);
