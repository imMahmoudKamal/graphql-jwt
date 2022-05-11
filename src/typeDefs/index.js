import { gql } from 'apollo-server';
import { userTypeDefs } from './user.type.js';

// for global types
const baseTypeDefs = gql`
  type Query

  type Mutation
`;

export const typeDefs = [baseTypeDefs, userTypeDefs];
