import { gql } from "apollo-server-express";

export const typeDef = gql`
  extend type Query {
    "Generate auth URL for authentication"
    authUrl: String!
  }
`;

export const resolvers = {
  Query: {
    authUrl: (root, {}, { services: { auth } }) => {
      return auth.authUrl();
    }
  }
};
