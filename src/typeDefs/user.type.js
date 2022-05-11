import { gql } from 'apollo-server';

export const userTypeDefs = gql`
  type User {
    id: ID
    email: String
    firstName: String
    lastName: String
    token: String
  }

  input UserInput {
    email: String!
    password: String!
  }

  extend type Query {
    logIn(input: UserInput!): User

    user(email: String!): User

    users: [User]
  }

  extend type Mutation {
    signUp(input: UserInput!): User
  }
`;
