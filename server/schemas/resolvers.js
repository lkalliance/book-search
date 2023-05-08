const { AuthenticationError } = require("apollo-server-express");
const { User, bookSchema } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, _, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user.id }).populate("savedBooks");
      }
      throw new AuthenticationError("You need to be logged in");
    },
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
        throw new AuthenticationError("No user found with this email address");
      }

      const passwordGood = await user.isCorrectPassword(password);

      if (!passwordGood) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    saveBook: async (parent, book, context) => {
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context._id },
          { $addToSet: { savedBooks: book } },
          { new: true, runValidators: true }
        );
        return res.json(updatedUser);
      } catch (err) {
        console.log(err);
        return res.status(400).json(err);
      }
    },
    removeBook: async (parent, { bookId }, context) => {
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
        return res.json(updatedUser);
      } catch (err) {
        console.log(err);
        return res.status(400).json(err);
      }
    },
  },
};

export { resolvers };
