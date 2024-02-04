// UserCard.js
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useMutation, gql } from '@apollo/client';

const FOLLOW_USER_MUTATION = gql`
  mutation Follow($userId: ID!) {
    follow(userId: $userId) {
      _id
      followingId
      followerId
      createdAt
      updatedAt
    }
  }
`;

const UNFOLLOW_USER_MUTATION = gql`
  mutation Unfollow($userId: ID) {
    unfollow(userId: $userId) {
      _id
      followingId
      followerId
      createdAt
      updatedAt
    }
  }
`;

const UserCard = ({ user }) => {
    const [isFollowing, setIsFollowing] = useState(false);
    const [followUser] = useMutation(FOLLOW_USER_MUTATION);
    const [unfollowUser] = useMutation(UNFOLLOW_USER_MUTATION);

    const handleFollowPress = async () => {
        try {
            if (isFollowing) {
                // If already following, unfollow
                await unfollowUser({ variables: { userId: user._id } });
            } else {
                // If not following, follow
                await followUser({ variables: { userId: user._id } });
            }
            setIsFollowing(!isFollowing);
        } catch (error) {
            console.error('Error following/unfollowing user:', error);
        }
    };

    return (
        <View style={styles.cardContainer}>
            <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
            <View style={styles.userInfo}>
                <Text style={styles.username}>{user.username}</Text>
                <Text style={styles.email}>{user.email}</Text>
            </View>
            <TouchableOpacity
                style={[styles.followButton, { backgroundColor: isFollowing ? '#ccc' : 'blue' }]}
                onPress={handleFollowPress}
            >
                <Text style={styles.followButtonText}>
                    {isFollowing ? 'Following' : 'Follow'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 16,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16,
    },
    userInfo: {
        flex: 1,
    },
    username: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    email: {
        color: 'gray',
    },
    followButton: {
        padding: 8,
        borderRadius: 5,
        marginLeft: 8,
    },
    followButtonText: {
        color: 'white',
    },
});

export default UserCard;
