import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const Profile = () => {

  const user = {
    id: 1,
    username: 'John Doe',
    profileImage: 'https://cdn.icon-icons.com/icons2/832/PNG/512/fb_icon-icons.com_66689.png',
    followersCount: 500,
    followingsCount: 200,
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
      <Text style={styles.username}>{user.username}</Text>
      <View style={styles.followCounts}>
        <TouchableOpacity style={styles.followButton}>
          <Text style={styles.followButtonText}>{user.followersCount} Followers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.followButton}>
          <Text style={styles.followButtonText}>{user.followingsCount} Followings</Text>
        </TouchableOpacity>
      </View>
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
