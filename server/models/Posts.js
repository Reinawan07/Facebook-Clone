const { database } = require("../config/mongodb");

class Post {
    static async getPostAll() {
        const posts = database.collection('posts');
        const result = await posts.find().toArray();
        return result;
    }
}

module.exports = Post;