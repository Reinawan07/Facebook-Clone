import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useQuery, gql } from '@apollo/client';

const USER_BY_ID_QUERY = gql`
  query UserById($userByIdId: ID!) {
  userById(id: $userByIdId) {
    _id
    name
    username
    email
    profileImage
  }
}
`;

const Profile = ({ route }) => {
  const { userByIdId } = route.params || {};
  console.log('userByIdId:', userByIdId);

  const { data, loading, error } = useQuery(USER_BY_ID_QUERY, {
    variables: { userByIdId: userByIdId || '' },
  });

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    console.error('Error fetching user data:', error);
    return <Text>Error loading user data</Text>;
  }

  const user = data.userById;

  return (
    <View style={styles.container}>
      <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
      <Text style={styles.username}>{user.username}</Text>
      <View style={styles.followCounts}>
      </View>


      <Text style={styles.additionalInfo}>Email: {user.email}</Text>
      <Text style={styles.additionalInfo}>Name: {user.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  followCounts: {
    flexDirection: 'row',
  },
  followButton: {
    backgroundColor: '#1877f2',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  followButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Profile;
