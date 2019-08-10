import { gql } from "apollo-server-express";

export const typeDef = gql`
  extend type Query {
    "Fetch labels for Gmail"
    labels(emailAddress: String): [Label]
    "Fetch messages from Gmail"
    messages(
      emailAddress: String
      query: String
      maxResults: Int
      labelIds: [String]
      nextPageToken: String
    ): MessageList
  }
`;

export const resolvers = {
  Query: {
    labels: (root, { emailAddress }, { services: { gmail } }) => {
      return gmail.labels(emailAddress);
    },
    messages: (
      root,
      { emailAddress, query, maxResults, labelIds, nextPageToken },
      { services: { gmail } }
    ) => {
      return gmail.fetchMessages(
        emailAddress,
        query,
        maxResults,
        labelIds,
        nextPageToken
      );
    }
  }
};
