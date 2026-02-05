import React, { useCallback, useEffect } from 'react';
import { View, Alert } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { useDispatch, useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';

import { RootState } from '../store/root.reducer';
import { loadHistoryRequest, sendMessageRequest } from '../chat/chat.slice';
import { joinPrivateRoom, leavePrivateRoom } from '../socket/socket.events';
import { getSocket } from '../socket/socket';

type RouteParams = {
  otherUserId: string;
};

const ChatScreen = () => {
  const dispatch = useDispatch();
  const route = useRoute<any>();
  const { otherUserId } = route.params as RouteParams;

  const messages = useSelector((state: RootState) => state.chat.messages);
  const me = useSelector((state: RootState) => state.users.me);

  /* =====================
     JOIN ROOM + LOAD HISTORY
     ===================== */
  useEffect(() => {
    if (!me) return;

    dispatch(
      joinPrivateRoom({
        myUserId: me.id,
        otherUserId,
      }),
    );

    dispatch(loadHistoryRequest({ otherUserId }));
    return () => {
      dispatch(
        leavePrivateRoom({
          myUserId: me.id,
          otherUserId,
        }),
      );
    };
  }, [dispatch, me, otherUserId]);

  /* =====================
     SEND MESSAGE
     ===================== */
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
          senderId: me?.id || 'me',
          toUserId: otherUserId,
          createdAt: new Date(),
        }),
      );
    },
    [dispatch, otherUserId, me],
  );

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        messages={messages.map(m => ({
          _id: m.id,
          text: m.text,
          createdAt: m.createdAt,
          user: { _id: m.senderId },
        }))}
        onSend={() => onSend()}
        user={{ _id: me?.id || 'me' }}
      />
    </View>
  );
};

export default ChatScreen;
