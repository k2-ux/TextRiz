import { call, put, takeLatest } from 'redux-saga/effects';
import { loginApi, registerApi } from '../api/auth.api';
import { tokenStorage } from '../utils/token.storage';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  rehydrateSuccess,
  rehydrateRequest,
  registerFailure,
  registerRequest,
} from './auth.slice';
import { socketConnect, socketDisconnect } from '../socket/socket.events';
function* handleRegister(
  action: ReturnType<typeof registerRequest>,
): Generator {
  try {
    const response: any = yield call(registerApi, action.payload);

    const { user, accessToken, refreshToken } = response.data;

    yield call(tokenStorage.setTokens, accessToken, refreshToken);
    yield put(loginSuccess(user));
    yield put(socketConnect());
  } catch (e: any) {
    yield put(registerFailure(e?.message || 'Registration failed'));
  }
}

// ===== Login flow =====
function* handleLogin(action: ReturnType<typeof loginRequest>): Generator {
  try {
    const response: any = yield call(loginApi, action.payload);

    const { user, accessToken, refreshToken } = response.data;

    yield call(tokenStorage.setTokens, accessToken, refreshToken);
    yield put(loginSuccess(user));
    console.log('✅ loginSuccess, dispatching socketConnect');

    yield put(socketConnect());
  } catch (error: any) {
    const message =
      error?.response?.data?.message || error?.message || 'Login failed';

    yield put(loginFailure(message));
  }
}

// ===== Rehydration helpers =====
function decodeUserFromToken(_token: string) {
  return {
    id: 'unknown',
    name: 'User',
    email: 'unknown',
  };
}

function* handleRehydrate(): Generator {
  try {
    const accessToken: any = yield call(tokenStorage.getAccessToken);

    if (!accessToken) {
      return;
    }

    const user = decodeUserFromToken(accessToken);
    yield put(rehydrateSuccess(user));
  } catch {
    yield put(logout());
    yield put(socketDisconnect());
  }
}
function* handleLogout(): Generator {
  try {
    // 1. Clear tokens
    yield call(tokenStorage.clearTokens);

    // 2. (Later) disconnect socket here
    // socket disconnect will be handled in socket saga
  } catch {
    // even if storage fails, continue logout
  }
}
// ===== Root auth saga =====
export default function* authSaga(): Generator {
  yield takeLatest(loginRequest, handleLogin);
  yield takeLatest(rehydrateRequest, handleRehydrate);
  yield takeLatest(logout, handleLogout);
  yield takeLatest(registerRequest.type, handleRegister);
}
