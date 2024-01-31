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
}

module.exports = Follow