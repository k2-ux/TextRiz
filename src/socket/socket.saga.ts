import { call, put, takeLatest } from 'redux-saga/effects';
import {
  socketConnect,
  socketDisconnect,
  socketConnected,
  socketDisconnected,
} from './socket.events';
import { createSocket, disconnectSocket } from './socket';
import { tokenStorage } from '../utils/token.storage';
import { listenForMessages } from './socket';
import { messageReceived } from '../chat/chat.slice';

function* handleSocketConnect(): Generator {
  try {
    const token: any = yield call(tokenStorage.getAccessToken);
    if (!token) return;

    const socket = createSocket(token);

    socket.connect();

    yield put(socketConnected());
    yield call(handleIncomingMessages);
  } catch (e) {
    // fail silently for now
  }
}

function* handleIncomingMessages(): Generator {
  yield call(listenForMessages, function (message: any) {
    // socket → redux
    put(messageReceived(message));
  });
}

function* handleSocketDisconnect(): Generator {
  try {
    yield call(disconnectSocket);
  } finally {
    yield put(socketDisconnected());
  }
}

export default function* socketSaga(): Generator {
  yield takeLatest(socketConnect, handleSocketConnect);
  yield takeLatest(socketDisconnect, handleSocketDisconnect);
}
