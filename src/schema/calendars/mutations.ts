import { gql } from "apollo-server-express";
import logger from "../../util/logger";
import { calendar } from "googleapis/build/src/apis/calendar";

export const typeDef = gql`
  # Mutations
  extend type Mutation {
    setOAuthCode(code: String!): JSONObject
  }
`;

export const resolvers = {
  Mutation: {
    setOAuthCode: async (root, { code }, { services: { calendars } }) => {
      return calendars.setOAuthCode(code);
    }
  }
};
