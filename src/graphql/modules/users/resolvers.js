import User from '../../../models/user'
import { USER_ADDED } from './channels'

export default {
  User: {
    fullName: (user) => `${user.firstName} ${user.lastName}`
  },
  Query: {
    users: () => User.find(),
    user: (_, {id}) => User.findById(id),
  },
  Mutation: {
    createUser: async(_, {data}, { pubsub }) => {
      const user = await User.create(data);

      /* Instância responsável por enviar os eventos */
      pubsub.publish(USER_ADDED, {
        userAdded: user
      })
      return user;
    },
    updateUser: (_, {id, data }) => User.findOneAndUpdate(id, data, {new: true}),
    deleteUser: async (_, {id}) => {
      const deleted = await User.findOneAndDelete(id);
      return !!deleted /* Garante que a função retornará um valor do tipo boolean */
    }
  },
  Subscription:{
    userAdded: {
      subscribe: (obj, args, {pubsub}) => pubsub.asyncIterator(USER_ADDED) 
    }
  }
}