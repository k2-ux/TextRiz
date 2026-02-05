import { createAction } from '@reduxjs/toolkit';

export const socketConnect = createAction('socket/connect');
export const socketDisconnect = createAction('socket/disconnect');
export const socketConnected = createAction('socket/connected');
export const socketDisconnected = createAction('socket/disconnected');
export const joinPrivateRoom = createAction<{
  myUserId: string;
  otherUserId: string;
}>('socket/joinPrivateRoom');
export const leavePrivateRoom = createAction<{
  myUserId: string;
  otherUserId: string;
}>('socket/leavePrivateRoom');
