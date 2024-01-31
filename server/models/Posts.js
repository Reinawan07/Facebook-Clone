const { ObjectId } = require("mongodb");
const { database } = require("../config/mongodb");

class Post {
    // getAll
    static async getPostAll() {
        const posts = database.collection('posts');
        const result = await posts.find().toArray();
        return result;
    }

    // getById
    static async getPostrById(id) {
        const posts = database.collection('posts');
        const result = await posts.findOne({ _id: new ObjectId(id) });
        return result;
    }

    // add
    static async addPost(post) {
		const date = new Date();
		const posts = database.collection('posts');
		const response = await posts.insertOne({
			...post,
			comments: [],
			likes: [],
			createdAt: date,
			updatedAt: date,
		});
		const result = await posts.findOne({ _id: response.insertedId });
		return result;
	}
}

module.exports = Post;