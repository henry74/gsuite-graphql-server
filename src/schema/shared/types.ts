import { gql } from "apollo-server-express";
import { GraphQLJSON, GraphQLJSONObject } from "graphql-type-json";

export const typeDef = gql`
  scalar JSON
  scalar JSONObject
`;

export const resolvers = {
  JSON: GraphQLJSON,
  JSONObject: GraphQLJSONObject
};
