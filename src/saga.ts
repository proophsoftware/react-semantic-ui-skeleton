import { takeEvery, all } from 'redux-saga/effects'
import {SEND_HTTP_REQUEST} from "./api/constants";
import { sendHttpRequestFlow } from './api/WebData';
import {ActionType, isOfType} from "typesafe-actions";
import {sendHttpRequest} from "./api/actions";

// Here we use `redux-saga` to trigger actions asynchronously. `redux-saga` uses something called a
// "generator function", which you can read about here:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
export default function* rootSaga() {
  console.log('root saga started');
  yield all([
      takeEvery([SEND_HTTP_REQUEST], sendHttpRequestFlow),
  ]);
}
