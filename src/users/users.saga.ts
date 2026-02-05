import { takeLatest, call, put } from 'redux-saga/effects';
import { fetchMeApi, getUserByIdApi } from '../api/users.api';
import {
  loadMeRequest,
  loadMeSuccess,
  searchUsersRequest,
  searchUsersSuccess,
} from './users.slice';

function* handleLoadMe(): Generator {
  const res: any = yield call(fetchMeApi);
  yield put(loadMeSuccess(res.data));
}

function* handleSearchUsers(
  action: ReturnType<typeof searchUsersRequest>,
): Generator {
  try {
    const res: any = yield call(() => getUserByIdApi(action.payload));

    yield put(searchUsersSuccess([res.data]));
  } catch (err) {
    yield put(searchUsersSuccess([]));
  }
}

export default function* usersSaga(): Generator {
  yield takeLatest(loadMeRequest.type, handleLoadMe);
  yield takeLatest(searchUsersRequest.type, handleSearchUsers);
}
