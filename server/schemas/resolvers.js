const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      return User.find({ username: context.username });
    }
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    savedBook: async (parent, { authors, description, title, bookId, image, link }, context) => {
      const user = await User.findOneAndUpdate(
        { username: context.username },
        { $addToSet: { savedBooks: { authors, description, bookId, image, link, title } } }
      );

      return user;
    },
    removeBook: async (parent, { bookId }, context) => {
      return User.findOneAndDelete();
    },
  },
};

module.exports = resolvers;
