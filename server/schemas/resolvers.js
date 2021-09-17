const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if(context.user) {
          const userData = await User.findOne({ _id: context.user._id })
              .select('-__v -password')
              .populate('savedBooks');
          return userData
      }
      throw new AuthenticationError('Not logged in')
    }
  },

  Mutation: {
    createUser: async (parent, args) => {
      const user = User.create(args);
      console.log('user', user);
      const token = signToken(user);
      console.log('token', token)
      return { token, user }
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if(!user) {
          throw new AuthenticationError('Incorrect credentials')
      }

      const correctPw = await user.isCorrectPassword(password);

      if(!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user)
      return { token, user };
    },
    saveBook: async (parent, { input }, context) => {
      console.log(context.user)
      console.log(input)
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $addToSet: { savedBooks: input } },
          { new: true }
        )
          .populate('books');
        return updatedUser
      }
      throw new AuthenticationError("You need to be logged in to save a book to your list")
    },
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $pull: { savedBooks: bookId } },
          { new: true }
        )
          .populate('books');
        return updatedUser
      }
      throw new AuthenticationError("You need to be logged in to remove a book from your list")
    }
  }
};

module.exports = resolvers;