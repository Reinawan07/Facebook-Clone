const { database } = require("../config/mongodb");

class User {
    static async getUserAll() {
        const users = database.collection('users');
        const result = await users.find().toArray();
        return result;
    }
}

module.exports = User;