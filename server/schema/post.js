const redis = require("../config/redis");
const Post = require("../models/Posts");
const { GraphQLError } = require('graphql');


// const posts = [
//   {
//     "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     "tags": ["tag1", "tag2", "tag3"],
//     "imgUrl": "https://example.com/image.jpg",
//     "authorId": "user123",
//     "comments": [
//       {
//         "content": "Great post!",
//         "username": "commenter1",
//         "createdAt": "2024-01-29T12:30:00.000Z",
//         "updatedAt": "2024-01-29T12:30:00.000Z"
//       },
//       {
//         "content": "Interesting content!",
//         "username": "commenter2",
//         "createdAt": "2024-01-29T13:45:00.000Z",
//         "updatedAt": "2024-01-29T13:45:00.000Z"
//       }
//     ],
//     "likes": [
//       {
//         "username": "liker1",
//         "createdAt": "2024-01-29T14:00:00.000Z",
//         "updatedAt": "2024-01-29T14:00:00.000Z"
//       },
//       {
//         "username": "liker2",
//         "createdAt": "2024-01-29T14:15:00.000Z",
//         "updatedAt": "2024-01-29T14:15:00.000Z"
//       }
//     ],
//     "createdAt": "2024-01-29T10:00:00.000Z",
//     "updatedAt": "2024-01-29T14:30:00.000Z"
//   },
//   {
//     "content": "Another post with different content.",
//     "tags": ["tag4", "tag5"],
//     "imgUrl": "https://example.com/another-image.jpg",
//     "authorId": "user456",
//     "comments": [
//       {
//         "content": "Nice post!",
//         "username": "commenter3",
//         "createdAt": "2024-01-29T11:15:00.000Z",
//         "updatedAt": "2024-01-29T11:15:00.000Z"
//       }
//     ],
//     "likes": [
//       {
//         "username": "liker3",
//         "createdAt": "2024-01-29T12:00:00.000Z",
//         "updatedAt": "2024-01-29T12:00:00.000Z"
//       }
//     ],
//     "createdAt": "2024-01-29T09:45:00.000Z",
//     "updatedAt": "2024-01-29T12:30:00.000Z"
//   }
// ]

const typeDefs = `#graphql
 
 type Post {
    _id: ID
    content: String!
    tags: [String]
    imgUrl: String
    authorId: ID!
    comments: [Comment]
    likes: [Like]
    createdAt: String
    updatedAt: String
    user: User
  }

 type PostDetail {
    _id: ID
    content: String!
    tags: [String]
    imgUrl: String
    authorId: ID!
    comments: [Comment]
    likes: [Like]
    createdAt: String
    updatedAt: String
    user: User
  }

  type Comment {
    content: String!
    username: String!
    createdAt: String
    updatedAt: String
  }

  type Like {
    username: String!
    createdAt: String
    updatedAt: String
  }

  input NewPost {
    content: String!
    tags: [String]
    imgUrl: String
  }

  type Query {
    posts: [Post]
    postsById(id: ID!): PostDetail
  }

  type Mutation {
    addPost(post: NewPost!): Post
    commentPost(postId: ID!, comment: String!): String
    likePost(postId: ID!): String
    unlikePost(postId: ID!): String
  }
`;

const resolvers = {
  // (parent, args, contextValue, info)
  Query: {

    posts: async (parent, args, contextValue) => {
      try {
        await contextValue.authentication();
        const postsCache = await redis.get('post:all');

        if (postsCache) {
          console.log('from redis');
          return JSON.parse(postsCache);
        }

        console.log('from mongodb');
        const posts = await Post.getPostAll();
        await redis.set('post:all', JSON.stringify(posts), 'EX', 5);
        return posts;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    postsById: async (_, { id }, contextValue) => {
      try {
        await contextValue.authentication();
        const result = await Post.getPostById(id);
        return result;
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    addPost: async (_, { post }, contextValue) => {
      try {
        const user = await contextValue.authentication();
        const { content, tags, imgUrl } = post;

        if (!content) {
          throw new GraphQLError('Content is required', {
            extensions: { code: '400 Bad Request' },
          });
        }

        const result = await Post.addPost({
          content,
          tags,
          imgUrl,
          authorId: user.id
        })
        await redis.del('post:all');

        return result;
      } catch (error) {
        throw error;
      }
    },

    commentPost: async (parent, args, contextValue) => {
      try {
        const user = await contextValue.authentication();
        const { postId, comment } = args;
        const post = await Post.getPostById(postId);

        if (!post) {
          throw new GraphQLError('Post not found', {
            extensions: { code: '404 Not Found' },
          });
        }

        if (!comment) {
          throw new GraphQLError('Content is required', {
            extensions: { code: '400 Bad Request' },
          });
        }

        const { matchedCount } = await Post.commentPost(
          postId,
          comment,
          user.username
        );

        if (matchedCount) {
          return 'Comment added successfully';
        }

        return 'Comment not added';
      } catch (error) {
        throw error;
      }
    },

    likePost: async (parent, args, contextValue) => {
      try {
        const user = await contextValue.authentication();
        const { postId } = args;
        const post = await Post.getPostById(postId);

        if (!post) {
          throw new GraphQLError('Post not found', {
            extensions: { code: '404 Not Found' },
          });
        }

        const { matchedCount } = await Post.likePost(postId, user.username);

        if (matchedCount) {
          return 'Post liked successfully';
        }

        return 'Post not liked';
      } catch (error) {
        throw error;
      }
    },

    unlikePost: async (parent, args, contextValue) => {
      try {
        const user = await contextValue.authentication();
        const { postId } = args;
        const post = await Post.getPostById(postId);

        if (!post) {
          throw new GraphQLError('Post not found', {
            extensions: { code: '404 Not Found' },
          });
        }

        const { matchedCount } = await Post.unlikePost(postId, user.username);

        if (matchedCount) {
          return 'Post unliked successfully';
        }

        return 'Post not unliked';
      } catch (error) {
        throw error;
      }
    },
    
  }
}

module.exports = { typeDefs, resolvers }