const { ObjectId } = require("mongodb");
const { database } = require("../config/mongodb");

class Post {
    // getAll
    static async getPostAll() {
        const posts = database.collection('posts');
        const result = await posts.aggregate([
          {
            $sort: { createdAt: -1 },
          },
          {
            $lookup: {
              from: 'users',
              foreignField: '_id',
              localField: 'authorId',
              as: 'user',
              pipeline: [
                {
                  $project: { password: 0 },
                },
              ],
            },
          },
          {
            $unwind: '$user',
          },
        ]).toArray();
        // console.log(result);
        return result;
      }
      

    // getById
    static async getPostById(id) {
        const posts = database.collection('posts');
    
        const result = await posts.aggregate([
            {
                $match: { _id: new ObjectId(id) }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'authorId',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $unwind: '$user'
            },
            {
                $project: {
                    _id: 1,
                    content: 1,
                    tags: 1,
                    imgUrl: 1,
                    authorId: 1,
                    comments: {
                        $map: {
                            input: '$comments',
                            as: 'comment',
                            in: {
                                content: '$$comment.content',
                                username: { $ifNull: ['$$comment.username', 'Unknown User'] },
                                createdAt: '$$comment.createdAt',
                                updatedAt: '$$comment.updatedAt',
                                user: '$user'
                            }
                        }
                    },
                    likes: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    user: '$user'
                }
            }
        ]).toArray();
    
        return result[0];
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