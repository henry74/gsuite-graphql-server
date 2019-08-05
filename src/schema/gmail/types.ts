import { gql } from "apollo-server-express";

export const typeDef = gql`
  type Message {
    id: ID
    internalDate: Int
    labelIds: [String]
    payload: Payload
  }

  type Header {
    name: String
    value: String
  }

  type Payload {
    partId: String
    mimeType: String
    filename: String
    headers: [Header]
  }
`;

export const resolvers = {};
