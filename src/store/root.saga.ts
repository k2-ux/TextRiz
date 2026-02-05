import { all, fork } from 'redux-saga/effects';

import authSaga from '../auth/auth.saga';
import chatSaga from '../chat/chat.saga';
import socketSaga from '../socket/socket.saga';
import usersSaga from '../users/users.saga';

export default function* rootSaga(): Generator {
  console.log('🚀 rootSaga started');

  yield all([
    fork(authSaga),
    fork(chatSaga),
    fork(socketSaga),
    fork(usersSaga),
  ]);
}
