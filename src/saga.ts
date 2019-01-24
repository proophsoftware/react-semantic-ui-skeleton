import { all, fork, takeEvery } from 'redux-saga/effects'
// import { AT_SEND_GRAPHQL_QUERY, AT_SEND_HTTP_REQUEST, sendHttpRequestFlow } from './api/WebData';

export default function* rootSaga() {
  console.log('root saga started');
  yield all([]);
  // yield all([fork(heroesSaga), fork(teamsSaga)])
  // yield [
  //   takeEvery([AT_SEND_HTTP_REQUEST, AT_SEND_GRAPHQL_QUERY], sendHttpRequestFlow as any),
  // ];
}
