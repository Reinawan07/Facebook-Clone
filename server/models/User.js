const { ObjectId } = require("mongodb");
const { database } = require("../config/mongodb");

class User {

    // Get All
    static async getUserAll() {
        const users = database.collection('users');
        const result = await users.find().toArray();
        return result;
    }

    // Register
    static async addUser(user) {
        const users = database.collection('users');
        const insertUser = await users.insertOne(user);
        const result = await users.findOne({ _id: insertUser.insertedId });
        return result;
    }

    // Register
    static async getUserToAdd(email, username) {
        return await database.collection('users').findOne({
            $or: [{ email }, { username }],
        });
    }

    // Login
    static async getUserToLogin(username, password) {
        return await database.collection('users').findOne({
            $or: [{ username }, { password }],
        });
    }

    // GetById
    static async getUserById(id) {
        const users = database.collection('users');
    
        const result = await users.aggregate([
            {
                $match: { _id: new ObjectId(id) }
            },
            {
                $lookup: {
                    from: 'follows',
                    localField: '_id',
                    foreignField: 'followingId',
                    as: 'followers'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'followers.followerId',
                    foreignField: '_id',
                    as: 'userFollowers'
                }
            },
            {
                $lookup: {
                    from: 'follows',
                    localField: '_id',
                    foreignField: 'followerId',
                    as: 'following'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'following.followingId',
                    foreignField: '_id',
                    as: 'userFollowing'
                }
            },
            {
                $project: {
                    password: 0,
                }
            }
        ]).toArray();
    
        return result[0];
    }
    
    
    

    static async searchUsers(query) {
        const users = database.collection('users');
        const result = await users.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { username: { $regex: query, $options: 'i' } },
            ],
        }).toArray();
        return result;
    }

}

module.exports = User;