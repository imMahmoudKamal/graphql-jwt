import { protectQuery } from '../utils/protectQuery.js';

export const query = {
  user: (_, { email }, context) => {
    console.log(context);
    return context.dataSources.user.getUser(email);
  },

  users: (_, __, { dataSources, user }) => {
    protectQuery(user);

    return dataSources.user.getAll();
  },

  logIn: (_, args, { dataSources: { user } }) => user.logIn(args),
};
