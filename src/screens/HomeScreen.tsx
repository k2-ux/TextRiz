import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Button,
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

  const [query, setQuery] = useState('');

  useEffect(() => {
    dispatch(loadMeRequest());
  }, [dispatch]);

  const onSearch = () => {
    if (!query.trim()) return;
    dispatch(searchUsersRequest(query));
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Button title="Logout" onPress={() => dispatch(logout())} />

      <Text style={{ marginVertical: 8 }}>Your User ID:</Text>
      <Text selectable style={{ fontWeight: 'bold', color: 'black' }}>
        {me?.id}
      </Text>

      <TextInput
        placeholder="Search friend by user ID"
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={onSearch}
        style={{
          borderWidth: 1,
          padding: 10,
          marginVertical: 16,
        }}
      />

      <FlatList
        data={results}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Chat', {
                otherUserId: item.id,
              })
            }
            style={{
              padding: 12,
              borderBottomWidth: 1,
            }}
          >
            <Text>{item.email}</Text>
            <Text style={{ fontSize: 12 }}>{item.id}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HomeScreen;
