import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const post = {
    id: 1,
    username: 'John Doe',
    timeAgo: '2 hours ago',
    postText: 'This is a sample post. #ReactNative #FacebookClone',
    imageUrl: 'https://placekitten.com/300/200',
    likes: 15,
    comments: [
        { id: 1, username: 'Alice', text: 'Nice post!' },
        { id: 2, username: 'Bob', text: 'Great content!' },
        { id: 3, username: 'Alice', text: 'Nice post!' },
        { id: 4, username: 'Bob', text: 'Great content!' },
        { id: 5, username: 'Alice', text: 'Nice post!' },
        { id: 6, username: 'Bob', text: 'Great content!' },
        { id: 7, username: 'Alice', text: 'Nice post!' },
        { id: 8, username: 'Bob', text: 'Great content!' },
        { id: 9, username: 'Alice', text: 'Nice post!' },
        { id: 10, username: 'Bob', text: 'Great content!' },
    ],
};

function DetailPost() {
    const [newComment, setNewComment] = useState('');
    const scrollViewRef = useRef();

    const handleCommentSubmit = () => {

        console.log('Comment submitted:', newComment);

        setNewComment('');
        scrollViewRef.current.scrollToEnd({ animated: true });
    };

    return (
        <KeyboardAvoidingView style={styles.container}>

            <ScrollView
                ref={scrollViewRef} style={styles.contentContainer}>

                <View style={styles.postContainer}>
                    <View style={styles.postHeader}>
                        <Image source={{ uri: 'https://cdn.icon-icons.com/icons2/832/PNG/512/fb_icon-icons.com_66689.png' }} style={styles.profileImage} />
                        <View>
                            <Text style={styles.username}>{post.username}</Text>
                            <Text style={styles.timeAgo}>{post.timeAgo}</Text>
                        </View>
                    </View>

                    <Text style={styles.postText}>{post.postText}</Text>
                    {post.imageUrl && (
                        <Image source={{ uri: post.imageUrl }} style={styles.postImage} />
                    )}

                    <View style={styles.likeCommentContainer}>
                        <View style={styles.likeCommentCounts}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <AntDesign name="like1" size={17} color="#1877f2" style={styles.iconLike} />
                                <Text style={styles.likeCount}>{post.likes} likes</Text>
                            </View>
                            <Text style={styles.commentCount}>{post.comments.length} comments</Text>
                        </View>
                    </View>

                    <View style={styles.commentsContainer}>
                        <Text style={styles.commentsTitle}>Comments</Text>
                        {post.comments.map(comment => (
                            <View key={comment.id} style={styles.commentContainer}>
                                <Text style={styles.commentUsername}>{comment.username}</Text>
                                <Text style={styles.commentText}>{comment.text}</Text>
                            </View>
                        ))}
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
                <TouchableOpacity style={styles.commentButton} onPress={handleCommentSubmit}>
                    <Text style={styles.commentButtonText}>Post</Text>
                </TouchableOpacity>
            </View>
            
        </KeyboardAvoidingView>
    );
}

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
});

export default DetailPost;
