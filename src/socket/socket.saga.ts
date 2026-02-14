import { eventChannel } from 'redux-saga';
import { call, fork, put, take, takeLatest } from 'redux-saga/effects';
import { socketConnect, socketDisconnect } from './socket.events';
import { createSocket, disconnectSocket, getSocket } from './socket';
import { tokenStorage } from '../utils/token.storage';
import {
  messageReceived,
  typingStarted,
  typingStopped,
} from '../chat/chat.slice';
import { joinPrivateRoom } from './socket.events';
import { leavePrivateRoom } from './socket.events';

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
function createTypingChannel() {
  function* watchTyping(): Generator {
    const channel: any = yield call(createTypingChannel);

    while (true) {
      const { isTyping } = yield take(channel);

      if (isTyping) {
        yield put(typingStarted());
      } else {
        yield put(typingStopped());
      }
    }
  }

  return eventChannel(emit => {
    const socket = getSocket();
    if (!socket) return () => {};

    const handler = (payload: any) => {
      emit(payload);
    };

    socket.on('chat:typing', handler);

    return () => socket.off('chat:typing', handler);
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
    console.log('🟢 socket CONNECTED');
  });

  socket.connect();

  yield fork(watchMessages);
  yield fork(watchTyping);
}

function* handleSocketDisconnect(): Generator {
  yield call(disconnectSocket);
}

function* handleJoinPrivateRoom(
  action: ReturnType<typeof joinPrivateRoom>,
): Generator {
  const socket = getSocket();
  if (!socket) return;

  // wait until socket connected
  while (!socket.connected) {
    yield call(() => new Promise<void>(res => setTimeout(res, 100)));
  }

  const { myUserId, otherUserId } = action.payload;
  const roomId = getPrivateRoomId(myUserId, otherUserId);

  socket.emit('chat:join', roomId);
  console.log('🏠 joined room', roomId);
}

function* handleLeavePrivateRoom(
  action: ReturnType<typeof leavePrivateRoom>,
): Generator {
  const socket = getSocket();
  if (!socket) return;

  const { myUserId, otherUserId } = action.payload;
  const roomId = getPrivateRoomId(myUserId, otherUserId);

  socket.emit('chat:leave', roomId);
  console.log('🚪 left room', roomId);
}

function* watchTyping(): Generator {
  const channel: any = yield call(createTypingChannel);

  while (true) {
    const { isTyping } = yield take(channel);

    if (isTyping) {
      yield put(typingStarted());
    } else {
      yield put(typingStopped());
    }
  }
}

export default function* socketSaga(): Generator {
  yield takeLatest(socketConnect.type, handleSocketConnect);
  yield takeLatest(socketDisconnect.type, handleSocketDisconnect);
  yield takeLatest(joinPrivateRoom.type, handleJoinPrivateRoom);
  yield takeLatest(leavePrivateRoom.type, handleLeavePrivateRoom);
}
