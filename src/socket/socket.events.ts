import { createAction } from '@reduxjs/toolkit';

export const socketConnect = createAction('socket/connect');
export const socketDisconnect = createAction('socket/disconnect');
export const socketConnected = createAction('socket/connected');
export const socketDisconnected = createAction('socket/disconnected');
