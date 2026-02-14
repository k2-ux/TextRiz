import { takeLatest, call, put } from 'redux-saga/effects';
import { fetchMeApi, fetchUserByEmailApi } from '../api/users.api';
import {
  loadMeRequest,
  loadMeSuccess,
  searchUsersFailure,
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
    const { email } = action.payload;

    const response: any = yield call(fetchUserByEmailApi, email);

    // backend returns ONE user, wrap in array for FlatList
    yield put(searchUsersSuccess([response.data]));
  } catch (err: any) {
    yield put(searchUsersFailure('User not found'));
  }
}

export default function* usersSaga(): Generator {
  yield takeLatest(loadMeRequest.type, handleLoadMe);
  yield takeLatest(searchUsersRequest.type, handleSearchUsers);
}
