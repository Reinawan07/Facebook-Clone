import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import UserCard from '../components/UserCard';

const GET_USERS = gql`
  query Users {
    users {
      _id
      name
      username
      email
      profileImage
    }
  }
`;

const SEARCH_USERS = gql`
  query SearchUsers($query: String!) {
    searchUsers(query: $query) {
      _id
      name
      username
      email
      profileImage
    }
  }
`;

const AllUsers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { loading, data } = useQuery(searchQuery ? SEARCH_USERS : GET_USERS, {
    variables: { query: searchQuery },
  });

  const users = data ? (searchQuery ? data.searchUsers : data.users) : [];

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search users..."
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
        />
        <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={users}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <UserCard user={item} />} // assuming you have a Card component for individual users
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
  },
  clearButton: {
    marginLeft: 8,
    padding: 8,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
  clearButtonText: {
    color: 'white',
  },
});

export default AllUsers;
