import { takeLatest, call, put } from 'redux-saga/effects';
import { getSocket, sendMessage } from '../socket/socket';
import {
  // loadHistoryRequest,
  // loadHistorySuccess,
  sendMessageRequest,
} from './chat.slice';
import { fetchChatHistoryApi } from '../api/chat.api';

function* handleSendMessage(
  action: ReturnType<typeof sendMessageRequest>,
): Generator {
  console.log('📡 Saga got message:', action.payload);

  const socket = getSocket();
  if (!socket) {
    console.log('❌ socket is null');
    return;
  }

  socket.emit('chat:private-message', {
    toUserId: action.payload.toUserId,
    text: action.payload.text,
  });
}

// export default function* chatSaga(): Generator {
//   yield takeLatest(sendMessageRequest.type, handleSendMessage);
// }
// function* handleLoadHistory(
//   action: ReturnType<typeof loadHistoryRequest>,
// ): Generator {
//   try {
//     const { otherUserId } = action.payload;

//     const response: any = yield call(fetchChatHistoryApi, otherUserId);

//     const messages = response.data.map((m: any) => ({
//       id: m._id,
//       text: m.text,
//       senderId: m.senderId,
//       createdAt: new Date(m.createdAt),
//     }));

//     yield put(loadHistorySuccess(messages.reverse()));
//   } catch (e) {
//   }
// }

export default function* chatSaga(): Generator {
  yield takeLatest(sendMessageRequest.type, handleSendMessage);
  // yield takeLatest(loadHistoryRequest, handleLoadHistory);
}
