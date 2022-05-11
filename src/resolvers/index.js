import { mutation } from './mutation.js';
import { query } from './query.js';

export const resolvers = {
  Query: {
    ...query,
  },

  Mutation: {
    ...mutation,
  },
};
