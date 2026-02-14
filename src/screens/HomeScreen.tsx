import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/root.reducer';
import { loadMeRequest, searchUsersRequest } from '../users/users.slice';
import { logout } from '../auth/auth.slice';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const { me, results } = useSelector((state: RootState) => state.users);

  const [emailQuery, setEmailQuery] = useState('');

  useEffect(() => {
    dispatch(loadMeRequest());
  }, [dispatch]);

  const onSearch = () => {
    if (!emailQuery.trim()) return;

    dispatch(
      searchUsersRequest({
        email: emailQuery.trim().toLowerCase(),
      }),
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 16 }}>
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: '600' }}>Home</Text>

        <TouchableOpacity onPress={() => dispatch(logout())}>
          <Text style={{ color: '#d32f2f', fontSize: 14 }}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* My user ID */}
      <Text style={{ fontSize: 14, marginBottom: 6 }}>Your User ID</Text>

      <Text
        selectable
        style={{
          backgroundColor: '#f5f5f5',
          padding: 12,
          borderRadius: 6,
          fontSize: 13,
          marginBottom: 20,
        }}
      >
        {me?.id}
      </Text>

      {/* Email search */}
      <TextInput
        placeholder="Search friend by email"
        value={emailQuery}
        onChangeText={setEmailQuery}
        onSubmitEditing={onSearch}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{
          borderWidth: 1,
          borderColor: '#ddd',
          borderRadius: 8,
          padding: 12,
          fontSize: 14,
          marginBottom: 16,
        }}
      />

      {/* Results */}
      <FlatList
        data={results}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <Text
            style={{
              textAlign: 'center',
              color: '#777',
              marginTop: 32,
            }}
          >
            No users found
          </Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Chat', {
                otherUserId: item.id,
              })
            }
            style={{
              paddingVertical: 12,
              borderBottomWidth: 1,
              borderColor: '#eee',
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: '500' }}>
              {item.email}
            </Text>
            <Text style={{ fontSize: 12, color: '#666', marginTop: 2 }}>
              {item.id}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HomeScreen;
