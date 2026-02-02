import { io, Socket } from 'socket.io-client';
import { SOCKET_URL } from '@env';

let socket: Socket | null = null;

export const createSocket = (token: string) => {
  if (socket) {
    return socket;
  }

  socket = io(SOCKET_URL, {
    transports: ['websocket'],
    auth: {
      token,
    },
    autoConnect: false,
  });

  return socket;
};

export const getSocket = () => socket;
export const listenForMessages = (onMessage: (msg: any) => void) => {
  const socket = getSocket();
  if (!socket) return;

  socket.on('message', onMessage);
};
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const sendMessage = (message: any) => {
  const socket = getSocket();
  if (!socket) return;

  socket.emit('message', message);
};
