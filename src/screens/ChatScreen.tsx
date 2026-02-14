import React, { useCallback, useEffect } from 'react';
import { View, Alert, Text, TouchableOpacity } from 'react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { useDispatch, useSelector } from 'react-redux';
import { useRoute, useNavigation } from '@react-navigation/native';

import { RootState } from '../store/root.reducer';
import { loadHistoryRequest, sendMessageRequest } from '../chat/chat.slice';
import { joinPrivateRoom, leavePrivateRoom } from '../socket/socket.events';
import { getSocket } from '../socket/socket';

type RouteParams = {
  otherUserId: string;
};

const ChatScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const { otherUserId } = route.params as RouteParams;

  const messages = useSelector((state: RootState) => state.chat.messages);
  const isTyping = useSelector((state: RootState) => state.chat.isTyping);
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
    (msgs: IMessage[] = []) => {
      const socket = getSocket();

      if (!socket || !socket.connected) {
        Alert.alert('Please wait', 'Connecting to chat server...');
        return;
      }

      const m = msgs[0];
      if (!m || !me) return;

      dispatch(
        sendMessageRequest({
          id: m._id as string,
          text: m.text,
          senderId: me.id,
          toUserId: otherUserId,
          createdAt: new Date(),
        }),
      );
    },
    [dispatch, me, otherUserId],
  );

  /* =====================
     TYPING INDICATOR
     ===================== */
  const onInputTextChanged = (text: string) => {
    const socket = getSocket();
    if (!socket || !socket.connected || !me) return;

    socket.emit('chat:typing', {
      toUserId: otherUserId,
      isTyping: text.length > 0,
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Header */}
      <View
        style={{
          height: 56,
          paddingHorizontal: 16,
          borderBottomWidth: 1,
          borderColor: '#eee',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ fontSize: 14 }}>Back</Text>
        </TouchableOpacity>

        <Text style={{ fontSize: 16, fontWeight: '500' }}>Chat</Text>

        <View style={{ width: 40 }} />
      </View>

      {/* Chat */}
      <GiftedChat
        messages={messages.map(m => ({
          _id: m.id,
          text: m.text,
          createdAt: new Date(m.createdAt),
          user: {
            _id: m.senderId, // 🔥 IMPORTANT
          },
        }))}
        onSend={onSend}
        user={{
          _id: me?.id, // 🔥 MUST be real logged-in user id
        }}
        onInputTextChanged={onInputTextChanged}
        isTyping={isTyping}
      />
    </View>
  );
};

export default ChatScreen;
