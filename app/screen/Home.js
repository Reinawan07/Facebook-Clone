import React, { useState, useContext } from 'react';
import { View, TextInput, ScrollView } from 'react-native';
import Card from '../components/Card';
import { gql, useQuery } from '@apollo/client';
import { AuthContext } from '../context/AuthContext';


const POSTS_QUERY = gql`
query Posts {
  posts {
    _id
    content
    tags
    imgUrl
    authorId
    comments {
      content
      username
      createdAt
      updatedAt
    }
    likes {
      username
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
    user {
      _id
      name
      username
      email
      profileImage
    }
  }
}
`;

function Home({ navigation }) {
  const authContext = useContext(AuthContext);

  const { accessToken } = authContext;

  const { loading, error, data } = useQuery(POSTS_QUERY, {
    context: {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : '',
      },
    },
    pollInterval: 5000,
  });

  const posts = data?.posts || [];



  return (
    <View style={{ flex: 1, backgroundColor: '#f0f2f5', padding: 10 }}>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 10, marginBottom: 10, padding: 10, backgroundColor: 'white' }}
        placeholder="Search"
      />

      <ScrollView style={{ flex: 1 }}>
        {posts.map(post => (
          <Card key={post._id} post={post} navigation={navigation} />
        ))}
      </ScrollView>
    </View>
  );
}

export default Home;
