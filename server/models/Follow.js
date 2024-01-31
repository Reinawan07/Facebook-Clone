const { ObjectId } = require("mongodb");
const { database } = require("../config/mongodb");

class Follow {
    // add follow
    static async followUser(userId, follower) {
        try {
            const date = new Date();
            const follows = database.collection('follows');
            const result = await follows.insertOne({
                followingId: new ObjectId(userId),
                followerId: follower,
                createdAt: date,
                updatedAt: date,
            });
             return await follows.findOne({ _id: result.insertedId });
        } catch (error) {
            throw error; 
        }
    }
    
    // get follow
    static async getFollow(followingId, followerId) {
        return await database.collection('follows').findOne({
            followingId: new ObjectId(followingId),
            followerId,
        });
    }

    // unfollow
    static async unfollowUser(userId, follower) {
        try {
            const follows = database.collection('follows');
            const result = await follows.deleteOne({
                followingId: new ObjectId(userId),
                followerId: follower,
            });

            if (result.deletedCount > 0) {
                return { success: true, message: 'Unfollow successful' };
            } else {
                return { success: false, message: 'User not found in followers list' };
            }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Follow