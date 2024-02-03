import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const formatDate = (timestamp) => {
  const options = { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', options);
};

const Card = ({ post, navigation }) => {
  
  const handleCommentPress = () => {
    navigation.navigate('DetailPost', {
      postsByIdId: post._id,
    });
  };

  return (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <Image source={{ uri: post.user.profileImage }} style={styles.profileImage} />
        <View>
          <Text style={styles.username}>{post.user.username}</Text>
          <Text style={styles.timeAgo}>{formatDate(post.createdAt)}</Text>
        </View>
      </View>
      <Text style={styles.postText}>{post.content}</Text>
      {post.imgUrl && (
        <Image source={{ uri: post.imgUrl }} style={styles.postImage} />
      )}
      <View style={styles.likeCommentContainer}>
        <View style={styles.likeCommentCounts}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AntDesign name="like1" size={17} color="#1877f2" style={styles.iconLike} />
            <Text style={styles.likeCount}>{post.likes.length} likes</Text>
          </View>
          <Text style={styles.commentCount}>{post.comments.length} comments</Text>
        </View>
        <View style={styles.likeCommentButtons}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Like</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleCommentPress}>
            <Text style={styles.buttonText}>Comment</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 10,
    padding: 15,
    elevation: 3,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  timeAgo: {
    color: 'gray',
  },
  postText: {
    fontSize: 16,
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: 250,
    borderRadius: 10,
  },
  likeCommentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  likeCommentCounts: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconLike: {
    width: 20,
    height: 20,
    borderRadius: 20,
    marginRight: 2,
  },
  likeCount: {
    marginRight: 10,
  },
  commentCount: {
    color: 'gray',
  },
  likeCommentButtons: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: 'transparent',
    borderColor: '#1877f2',
    borderWidth: 1,
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
    marginLeft: 10,
  },
  buttonText: {
    color: '#1877f2',
  },
});

export default Card;
