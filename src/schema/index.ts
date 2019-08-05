import { GraphQLSchema } from "graphql";
import { makeExecutableSchema } from "graphql-tools";
import { merge } from "lodash";

/* tslint:disable:no-var-requires */
const modules = [
  require("./sheets"),
  require("./calendars"),
  require("./shared")
];

const mainDefs = [
  `
    type Query {
      unused: String
    }
    
    type Mutation {
      unused: String
    }
    
    type Subscription {
      unused: String
    }
    
    schema {
      query: Query
      mutation: Mutation
      subscription: Subscription
    }
`
];

const resolvers = merge(
  modules.map(m => {
    if (m.resolvers) {
      return m.resolvers;
    }
  })
);

const typeDefs = mainDefs.concat(
  ...modules.map(m => m.typeDef).filter(res => !!res) // flatten with ...
);

const schema: GraphQLSchema = makeExecutableSchema({
  logger: console,
  allowUndefinedInResolve: false,
  resolverValidationOptions: {
    requireResolversForNonScalar: false,
    requireResolversForArgs: true
  },
  resolvers,
  typeDefs
});

export { schema };
