import { takeLatest, call, put } from 'redux-saga/effects';
import { getSocket } from '../socket/socket';
import {
  sendMessageRequest,
  loadHistoryRequest,
  loadHistorySuccess,
} from './chat.slice';
import { fetchChatHistoryApi } from '../api/chat.api';

/* =====================
   SEND MESSAGE
   ===================== */
function* handleSendMessage(
  action: ReturnType<typeof sendMessageRequest>,
): Generator {
  console.log('📡 Saga got message:', action.payload);

  const socket = getSocket();
  if (!socket || !socket.connected) {
    console.log('❌ socket not ready');
    return;
  }

  socket.emit('chat:private-message', {
    toUserId: action.payload.toUserId,
    text: action.payload.text,
  });
}

/* =====================
   LOAD CHAT HISTORY
   ===================== */
function* handleLoadHistory(
  action: ReturnType<typeof loadHistoryRequest>,
): Generator {
  try {
    const res: any = yield call(
      fetchChatHistoryApi,
      action.payload.otherUserId,
    );

    const messages = res.data.map((m: any) => ({
      id: m._id,
      text: m.text,
      senderId: m.from,
      createdAt: new Date(m.createdAt),
    }));

    // oldest → newest for GiftedChat
    yield put(loadHistorySuccess(messages.reverse()));
  } catch (e) {
    console.log('❌ failed to load chat history', e);
  }
}

/* =====================
   WATCHERS
   ===================== */
export default function* chatSaga(): Generator {
  yield takeLatest(sendMessageRequest.type, handleSendMessage);
  yield takeLatest(loadHistoryRequest.type, handleLoadHistory);
}
