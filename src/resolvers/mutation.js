export const mutation = {
  signUp: (_, args, { dataSources: { user } }) => {
    return user.create(args);
  },
};
