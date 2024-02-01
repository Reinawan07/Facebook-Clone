import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

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

];

function Home() {
    return (
        <ScrollView style={styles.container}>
            {posts.map((post) => (
                <View key={post.id} style={styles.postContainer}>
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
                            <Text style={styles.commentCount}>{post.comments} comments</Text>
                        </View>
                        <View style={styles.likeCommentButtons}>
                            <TouchableOpacity style={styles.button} onPress={() => console.log('Like')}>
                                <Text style={styles.buttonText}>Like</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.button} onPress={() => console.log('Comment')}>
                                <Text style={styles.buttonText}>Comment</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f2f5',
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

export default Home;
