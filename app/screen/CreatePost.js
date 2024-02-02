import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Image, ScrollView } from 'react-native';

const CreatePost = () => {
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [imageURL, setImageURL] = useState('');

  const handlePost = () => {
    // Implement your post creation logic here
    console.log('Post created:', { content, tags, imageURL });
    // You can navigate back to the Home screen or any other screen after creating the post
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Content:</Text>
        <TextInput
          style={styles.input}
          multiline
          numberOfLines={4}
          value={content}
          onChangeText={(text) => setContent(text)}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Tags:</Text>
        <TextInput
          style={styles.input}
          value={tags}
          onChangeText={(text) => setTags(text)}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Image URL:</Text>
        <TextInput
          style={styles.input}
          value={imageURL}
          onChangeText={(text) => setImageURL(text)}
        />
      </View>

      {imageURL !== '' && (
        <Image source={{ uri: imageURL }} style={styles.previewImage} />
      )}

      <Button title="Post" onPress={handlePost} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f2f5',
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
  },
  previewImage: {
    marginTop: 10,
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
});

export default CreatePost;
