import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useMutation, useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

const POSTS_BY_ID_QUERY = gql`
  query Query($postsByIdId: ID!) {
    postsById(id: $postsByIdId) {
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
        password
      }
    }
  }
`;

const COMMENT_POST_MUTATION = gql`
  mutation CommentPost($postId: ID!, $comment: String!) {
    commentPost(postId: $postId, comment: $comment)
  }
`;

const DetailPost = ({ route }) => {
    const [newComment, setNewComment] = useState('');
    const scrollViewRef = useRef();

    const { postsByIdId } = route.params || {};
    
    const { loading, error, data } = useQuery(POSTS_BY_ID_QUERY, {
        variables: { postsByIdId: postsByIdId },
    });
    const post = data?.postsById || {};

    useEffect(() => {
        scrollViewRef.current.scrollToEnd({ animated: true });
    }, [post.comments]);

    const likesCount = post.likes ? post.likes.length : 0;
    const commentsCount = post.comments ? post.comments.length : 0;

    const [commentPost, { refetch }] = useMutation(COMMENT_POST_MUTATION, {
        onCompleted: () => {
            refetch();
        },
    });

    return (
        <KeyboardAvoidingView style={styles.container}>
            <ScrollView ref={scrollViewRef} style={styles.contentContainer}>
                <View style={styles.postContainer}>
                    <View style={styles.postHeader}>
                        {post.user ? (
                            <>
                                <Image source={{ uri: post.user.profileImage }} style={styles.profileImage} />
                                <View>
                                    <Text style={styles.username}>{post.user.username}</Text>
                                    <Text style={styles.timeAgo}>{post.timeAgo}</Text>
                                </View>
                            </>
                        ) : (
                            <Text>Loading...</Text>
                        )}
                    </View>
                    <Text style={styles.postText}>{post.content}</Text>
                    {post.imgUrl && (
                        <Image source={{ uri: post.imgUrl }} style={styles.postImage} />
                    )}
                    <View style={styles.likeCommentContainer}>
                        <View style={styles.likeCommentCounts}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <AntDesign name="like1" size={17} color="#1877f2" style={styles.iconLike} />
                                <Text style={styles.likeCount}>{likesCount} likes</Text>
                            </View>
                            <Text style={styles.commentCount}>
                                {commentsCount ? `${commentsCount} comments` : 'No comments yet.'}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.commentsContainer}>
                        <Text style={styles.commentsTitle}>Comments</Text>
                        {post.comments && post.comments.length > 0 ? (
                            post.comments.map((comment, index) => (
                                <View key={index} style={styles.chatContainer}>
                                    <View style={styles.chatImage}>
                                        <Image source={{ uri: post.user.profileImage }} style={{ flex: 1, borderRadius: 20 }} />
                                    </View>
                                    <View>
                                        <View style={styles.chatHeader}>
                                            <Text>{comment.username}</Text>
                                        </View>
                                        <View style={styles.chatBubble}>
                                            <Text>{comment.content}</Text>
                                        </View>
                                    </View>
                                </View>
                            ))
                        ) : (
                            <Text>No comments yet.</Text>
                        )}
                    </View>

                </View>
            </ScrollView>
            <View style={styles.commentInputContainer}>
                <TextInput
                    style={styles.commentInput}
                    placeholder="Add a comment..."
                    value={newComment}
                    onChangeText={(text) => setNewComment(text)}
                />
                <TouchableOpacity style={styles.commentButton}
                    onPress={() => commentPost({ variables: { postId: postsByIdId, comment: newComment } })}>
                    <Text style={styles.commentButtonText}>Post</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f2f5',
    },
    contentContainer: {
        flex: 1,
        marginBottom: 2,
    },
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
        height: 200,
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
    commentsContainer: {
        padding: 15,
    },
    commentsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    commentContainer: {
        marginBottom: 10,
    },
    commentUsername: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    commentText: {
        fontSize: 16,
    },
    commentInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        backgroundColor: 'white',
    },
    commentInput: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginRight: 10,
        paddingLeft: 10,
    },
    commentButton: {
        backgroundColor: '#1877f2',
        padding: 8,
        borderRadius: 5,
        alignItems: 'center',
    },
    commentButtonText: {
        color: 'white',
    },
    chatContainer: {
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    chatImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    chatHeader: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    chatBubble: {
        maxWidth: '100%',
        backgroundColor: '#DCF8C6',
        padding: 10,
        borderRadius: 15,
    },
    chatFooter: {
        fontSize: 12,
        opacity: 0.5,
    },
});

export default DetailPost;
