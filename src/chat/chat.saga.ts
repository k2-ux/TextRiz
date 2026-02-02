import { takeLatest, call } from 'redux-saga/effects';
import { sendMessage } from '../socket/socket';
import { sendMessageRequest } from './chat.slice';

function* handleSendMessage(
  action: ReturnType<typeof sendMessageRequest>,
): Generator {
  try {
    yield call(sendMessage, action.payload);
  } catch (e) {
    // ignore for now
  }
}

export default function* chatSaga(): Generator {
  yield takeLatest(sendMessageRequest, handleSendMessage);
}
