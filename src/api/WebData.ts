import { call, put } from 'redux-saga/effects';
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Action } from 'redux';
import configuredAxios from './ConfiguredAxios';
import { GRAPHQL_URL } from './ConfiguredAxios';
// import { Action as Notify } from '../NotificationSystem';

export const AT_SEND_HTTP_REQUEST = 'AT_SEND_HTTP_REQUEST';
export const AT_SEND_GRAPHQL_QUERY = 'AT_SEND_GRAPHQL_QUERY';
export const AT_RESET_WEB_DATA = 'AT_RESET_WEB_DATA';

// export interface WebDataNotAsked {type: 'notAsked'; data?: undefined; msg?: undefined; }
// export interface WebDataLoading {type: 'loading'; data?: undefined; msg?: undefined; }
// export interface WebDataFailure {type: 'error'; data?: undefined; msg: string; }
// export interface WebDataSuccess<D> {type: 'success'; data: D; msg?: undefined; }
//
// export type WebData<D> = WebDataNotAsked | WebDataLoading | WebDataFailure | WebDataSuccess<D>;
//
// export interface WebDataAction<D, TMeta> extends Action {webData: WebData<D>; metadata: TMeta; }
//
// export interface SendHttpRequest<TMeta> extends Action {request: AxiosRequestConfig; responseAction: string; metadata?: TMeta; }
//
// export function sendHttpRequest<TMeta> (request: AxiosRequestConfig, responseAction: string, metadata?: TMeta ): SendHttpRequest<TMeta> {
//   let action: SendHttpRequest<TMeta> = {
//     type: AT_SEND_HTTP_REQUEST,
//     request,
//     responseAction,
//   };
//
//   if (metadata) {
//     action.metadata = metadata;
//   }
//
//   return action;
// }
//
// export interface GraphQlQuery<V> {
//   query: string;
//   variables?: V;
//   operationName?: string;
// }
//
// export interface SendGraphQlQuery<TMeta> extends SendHttpRequest<TMeta> {}
//
// export function sendGraphQlQuery<TMeta, V> (query: GraphQlQuery<V>, responseAction: string, metadata?: TMeta): SendGraphQlQuery<TMeta> {
//   let request = {url: GRAPHQL_URL, data: query, method: 'POST'};
//
//   let action: SendGraphQlQuery<TMeta> = {
//     type: AT_SEND_GRAPHQL_QUERY,
//     request,
//     responseAction
//   };
//
//   if (metadata) {
//     action.metadata = metadata;
//   }
//
//   return action;
// }
//
// export const isSuccess = <D>(webData: WebData<D>): boolean => webData.type === 'success';
// export const isLoading = <D>(webData: WebData<D>): boolean => webData.type === 'loading';
// export const isError = <D>(webData: WebData<D>): boolean => webData.type === 'error';
//
// export interface ResetWebData extends Action {responseAction: string; }
// export function resetWebData ( responseAction: string ): ResetWebData  {
//   return {
//     type: AT_RESET_WEB_DATA,
//     responseAction
//   };
// }
//
// export interface ResponseAction<D, TMeta> extends Action {webData: WebData<D>; metadata: TMeta; }
// export function responseAction<D, TMeta> ( type: string, webData: WebData<D>, metadata: TMeta ): ResponseAction<D, TMeta> {
//   return {
//     type,
//     webData,
//     metadata
//   };
// }
//
// // noinspection TypeScriptValidateTypes
// export function* sendHttpRequestFlow<TMeta> ( action: SendHttpRequest<TMeta> ) {
//
//   yield put( responseAction( action.responseAction, { type: 'loading' }, action.metadata ) );
//
//   let data = {};
//
//   try {
//     if (action.type === AT_SEND_GRAPHQL_QUERY) {
//       data = yield call( fetchGraphQlStatusWrapper, action.request);
//     } else {
//       data = yield call( fetchStatusWrapper, action.request);
//     }
//
//     yield put( responseAction( action.responseAction, { type: 'success', data: data }, action.metadata ) );
//   } catch ( err ) {
//     let msg = 'Unknown Error';
//     let code = 500;
//
//     if ( typeof err === 'string' ) {
//       msg = err;
//     } else {
//       let error = err.error || { code: undefined, message: undefined };
//       msg = error.message || msg;
//       code = error.code || code;
//
//     }
//
//     yield put(Notify.Command.error('Webdata error [' + code + ']', msg));
//     yield put( responseAction( action.responseAction, { type: 'error', msg: '[' + code + '] ' + msg }, action.metadata ) );
//   }
// }
//
// export function fetchStatusWrapper ( request: AxiosRequestConfig ): AxiosPromise {
//   return configuredAxios.request(request).then(
//       response => {
//         return isSuccessResponse(response.status) ? response.data : Promise.reject(response.data);
//       },
//       function (error) {
//         if (error.response) {
//           if (error.response.data && error.response.data.error) {
//             return Promise.reject(error.response.data);
//           }
//
//           return Promise.reject({error: {
//             code: error.response.status,
//             message: error.response.data
//           }});
//         } else if (error.request) {
//           // The request was made but no response was received
//           // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
//           // http.ClientRequest in node.js
//           return Promise.reject('Failed to send request: ' + JSON.stringify(error.request));
//         } else {
//           // Something happened in setting up the request that triggered an Error
//           return Promise.reject('Error: ' + error.message);
//         }
//     }
//   );
// }
//
// export function fetchGraphQlStatusWrapper ( request: AxiosRequestConfig ): AxiosPromise {
//     return configuredAxios.request(request).then(
//         response => {
//             return isSuccessGraphQlResponse(response) ? response.data : Promise.reject(response.data.errors);
//         },
//         function (error) {
//             if (error.response) {
//                 if (error.response.data && error.response.data.errors && error.response.data.errors.length) {
//                     return Promise.reject({
//                       error: {
//                         code: error.response.status,
//                         message: error.response.data.errors[0].message,
//                       },
//                       graphQlErrors: error.response.data.errors
//                     });
//                 }
//
//                 return Promise.reject({error: {
//                     code: error.response.status,
//                     message: error.response.data
//                 }});
//             } else if (error.request) {
//                 // The request was made but no response was received
//                 // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
//                 // http.ClientRequest in node.js
//                 return Promise.reject('Failed to send request: ' + JSON.stringify(error.request));
//             } else {
//                 // Something happened in setting up the request that triggered an Error
//                 return Promise.reject('Error: ' + error.message);
//             }
//         }
//     );
// }
//
// function isSuccessResponse(status: number): boolean {
//   return status >= 200 && status < 300;
// }
//
// function isSuccessGraphQlResponse(response: AxiosResponse): boolean {
//   if (!isSuccessResponse(response.status)) {
//     return false;
//   }
//
//   if (response.data.errors) {
//     return false;
//   }
//
//   return true;
// }