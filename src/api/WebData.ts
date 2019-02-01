import {AxiosPromise, AxiosRequestConfig, AxiosResponse} from "axios";
import {call, put} from "redux-saga/effects";
import * as Notify from "../NotificationSystem";
import {responseAction} from "./actions";
import configuredAxios from "./ConfiguredAxios";
import {SendHttpRequestAction} from "./reducers";

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

export const isSuccess = <D>(webData: WebData<D>): boolean => webData.type === 'success';
export const isLoading = <D>(webData: WebData<D>): boolean => webData.type === 'loading';
export const isError = <D>(webData: WebData<D>): boolean => webData.type === 'error';


export function* sendHttpRequestFlow( action: SendHttpRequestAction) {

    yield put( responseAction( action.payload.responseActionType, { type: 'loading' }, action.payload.metadata ) );

    let data = {};

    try {
        data = yield call( fetchStatusWrapper, action.payload.request);

        yield put( responseAction( action.payload.responseActionType, { type: 'success', data }, action.payload.metadata ) );
    } catch ( err ) {
        let msg = 'Unknown Error';
        let code = 500;

        if ( typeof err === 'string' ) {
            msg = err;
        } else {
            const error = err.error || { code: undefined, message: undefined };
            msg = error.message || msg;
            code = error.code || code;

        }

        yield put(Notify.Action.Command.error('Webdata error [' + code + ']', msg));
        yield put( responseAction( action.payload.responseActionType, { type: 'error', msg: '[' + code + '] ' + msg }, action.payload.metadata ) );
    }
}

export function fetchStatusWrapper ( request: AxiosRequestConfig ): AxiosPromise {
  return configuredAxios.request(request).then(
      response => {
        return isSuccessResponse(response.status) ? response.data : Promise.reject(response.data);
      },
      (error) => {
        if (error.response) {
          if (error.response.data && error.response.data.error) {
            return Promise.reject(error.response.data);
          }

          return Promise.reject({error: {
            code: error.response.status,
            message: error.response.data
          }});
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          return Promise.reject('Failed to send request: ' + JSON.stringify(error.request));
        } else {
          // Something happened in setting up the request that triggered an Error
          return Promise.reject('Error: ' + error.message);
        }
    }
  );
}

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

function isSuccessResponse(status: number): boolean {
  return status >= 200 && status < 300;
}

function isSuccessGraphQlResponse(response: AxiosResponse): boolean {
  if (!isSuccessResponse(response.status)) {
    return false;
  }

  if (response.data.errors) {
    return false;
  }

  return true;
}