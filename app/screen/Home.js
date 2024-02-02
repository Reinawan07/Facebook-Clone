import React, { useState } from 'react';
import { View, TextInput, ScrollView } from 'react-native';
import Card from '../components/Card';

const posts = [
  {
    id: 1,
    username: 'John Doe',
    timeAgo: '2 hours ago',
    postText: 'This is a sample post. #ReactNative #FacebookClone',
    imageUrl: 'https://placekitten.com/300/200',
    likes: 15,
    comments: 5,
  },
  {
    id: 2,
    username: 'Alex',
    timeAgo: '2 hours ago',
    postText: 'This is a sample post. #ReactNative #FacebookClone',
    imageUrl: 'https://placekitten.com/300/200',
    likes: 15,
    comments: 5,
  },
  {
    id: 3,
    username: 'Joko',
    timeAgo: '2 hours ago',
    postText: 'This is a sample post. #ReactNative #FacebookClone',
    imageUrl: 'https://placekitten.com/300/200',
    likes: 15,
    comments: 5,
  },
];

function Home({ navigation }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = posts.filter(post =>
    post.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#f0f2f5', padding: 10 }}>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 5, marginBottom: 10, padding: 10, backgroundColor: 'white' }}
        placeholder="Search"
        value={searchTerm}
        onChangeText={text => setSearchTerm(text)}
      />

      <ScrollView style={{ flex: 1 }}>
        {filteredPosts.map(post => (
          <Card key={post.id} post={post} navigation={navigation} />
        ))}
      </ScrollView>
    </View>
  );
}

export default Home;
