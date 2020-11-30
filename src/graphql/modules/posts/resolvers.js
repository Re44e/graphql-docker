import Post from '../../../models/post'
import User from '../../../models/user'

export default {
  Post: {
    author: (post) => User.findById(post.author) 
  },
  Query: {
    posts: () => Post.find(),
    post: (_, {id}) => Post.findById(id),
  },
  Mutation: {
    createPost: (_, {data}) => Post.create(data),
    updatePost: (_, {id, data }) => Post.findOneAndUpdate(id, data, {new: true}),
    deletePost: async (_, {id}) => {
      const deleted = await Post.findOneAndDelete(id);
      return !!deleted /* Garante que a função retornará um valor do tipo boolean */
    }
  }
}