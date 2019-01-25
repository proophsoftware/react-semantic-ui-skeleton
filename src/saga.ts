import { all, fork, takeEvery } from 'redux-saga/effects'
// import { AT_SEND_GRAPHQL_QUERY, AT_SEND_HTTP_REQUEST, sendHttpRequestFlow } from './api/WebData';

// Here we use `redux-saga` to trigger actions asynchronously. `redux-saga` uses something called a
// "generator function", which you can read about here:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
export default function* rootSaga() {
  console.log('root saga started');
  yield all([]);
  // yield all([fork(heroesSaga), fork(teamsSaga)])
  // yield [
  //   takeEvery([AT_SEND_HTTP_REQUEST, AT_SEND_GRAPHQL_QUERY], sendHttpRequestFlow as any),
  // ];
}
