import { eventChannel } from 'redux-saga';
import { call, fork, put, take, takeLatest } from 'redux-saga/effects';
import { socketConnect, socketDisconnect } from './socket.events';
import { createSocket, disconnectSocket, getSocket } from './socket';
import { tokenStorage } from '../utils/token.storage';
import { messageReceived } from '../chat/chat.slice';

const myUserId = '698101b89afe0491b50a7477';
const otherUserId = '6980f2c849cc236f93afa9cd';

export const getPrivateRoomId = (userId1: string, userId2: string) => {
  return [userId1, userId2].sort().join(':');
};

function createMessageChannel() {
  return eventChannel(emit => {
    const socket = getSocket();
    if (!socket) return () => {};

    const handler = (msg: any) => {
      emit(msg);
    };

    socket.on('chat:private-message', handler);

    return () => socket.off('chat:private-message', handler);
  });
}

function* watchMessages(): Generator {
  const channel: any = yield call(createMessageChannel);

  while (true) {
    const msg: any = yield take(channel);

    yield put(
      messageReceived({
        id: `${msg.from}-${msg.timestamp}`,
        text: msg.text,
        senderId: msg.from,
        createdAt: new Date(msg.timestamp),
      }),
    );
  }
}

function* handleSocketConnect(): Generator {
  const token: any = yield call(tokenStorage.getAccessToken);
  if (!token) return;

  const socket = createSocket(token);

  socket.on('connect', () => {
    console.log('🟢 socket CONNECTED, starting message watcher');
  });

  socket.connect();
  const roomId = getPrivateRoomId(myUserId, otherUserId);

  // 👇 IMPORTANT: wait until connected
  while (!socket.connected) {
    yield call(() => new Promise(res => setTimeout(res, 100)));
  }
  socket.emit('chat:join', roomId);
  console.log('🏠 joined room', roomId);
  yield fork(watchMessages);
}

function* handleSocketDisconnect(): Generator {
  yield call(disconnectSocket);
}

export default function* socketSaga(): Generator {
  yield takeLatest(socketConnect.type, handleSocketConnect);
  yield takeLatest(socketDisconnect.type, handleSocketDisconnect);
}
