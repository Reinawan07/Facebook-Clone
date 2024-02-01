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
    static async getPostById(id) {
        const posts = database.collection('posts');
        const result = await posts.findOne({ _id: new ObjectId(id) });
        return result;
    }

    // addPost
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

    // addComment
    static async commentPost(postId, comment, username) {
        const date = new Date();
        return await database.collection('posts').updateOne(
            { _id: new ObjectId(postId) },
            {
                $push: {
                    comments: {
                        content: comment,
                        username,
                        createdAt: date,
                        updatedAt: date,
                    },
                },
            }
        );
    }

    static async likePost(postId, username) {
        const date = new Date();
        return await database.collection('posts').updateOne(
            { _id: new ObjectId(postId) },
            {
                $push: {
                    likes: {
                        username,
                        createdAt: date,
                        updatedAt: date,
                    },
                },
            }
        );
    }

}

module.exports = Post;