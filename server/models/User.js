const { database } = require("../config/mongodb");

class User {
    static async getUserAll() {
        const users = database.collection('users');
        const result = await users.find().toArray();
        return result;
    }

    static async addUser(user) {
        const users = database.collection('users');
        const insertUser = await users.insertOne(user);
        const result = await users.findOne({ _id: insertUser.insertedId });
        return result;
    }

    static async getUserToAdd(email, username) {
        return await database.collection('users').findOne({
            $or: [{ email }, { username }],
        });
    }
}

module.exports = User;