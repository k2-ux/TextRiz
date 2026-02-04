import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/root.reducer';
// import { sendMessageRequest } from '../chat/chat.slice';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { useEffect } from 'react';
// import { loadHistoryRequest } from '../chat/chat.slice';
import { Alert, Button, View } from 'react-native';
import { getSocket } from '../socket/socket';
import { sendMessageRequest } from '../chat/chat.slice';
import { socketDisconnect } from '../socket/socket.events';
import { logout } from '../auth/auth.slice';
const OTHER_USER_ID = '6980f2c849cc236f93afa9cd';

const ChatScreen = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.chat.messages);
  const onLogout = () => {
    dispatch(socketDisconnect());
    dispatch(logout());
  };
  // useEffect(() => {
  //   if (messages.length === 0) {
  //     dispatch(loadHistoryRequest({ otherUserId: OTHER_USER_ID }));
  //   }
  // }, [dispatch, messages.length]);

  const onSend = useCallback(
    (msgs = []) => {
      const socket = getSocket();

      if (!socket || !socket.connected) {
        Alert.alert('Please wait', 'Connecting to chat server...');
        return;
      }

      const m = msgs[0];
      dispatch(
        sendMessageRequest({
          id: m._id,
          text: m.text,
          senderId: 'me',
          toUserId: OTHER_USER_ID, // 🔥 REQUIRED
          createdAt: new Date(),
        }),
      );
    },
    [dispatch],
  );

  return (
    <View style={{ flex: 1 }}>
      <Button title="Logout" onPress={onLogout} />

      <GiftedChat
        messages={messages.map(m => ({
          _id: m.id,
          text: m.text,
          createdAt: m.createdAt,
          user: { _id: m.senderId },
        }))}
        onSend={onSend}
        user={{ _id: 'me' }}
      />
    </View>
  );
};

export default ChatScreen;
