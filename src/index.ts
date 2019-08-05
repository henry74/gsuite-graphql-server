import * as express from "express";
import * as compression from "compression";
import { ApolloServer } from "apollo-server-express";
import { schema } from "./schema";
import { context } from "./data";
import logger from "./util/logger";
import { GraphQLError } from "graphql";

const app = express();
app.use(compression());

const server = new ApolloServer({
  schema,
  context,
  introspection: true,
  formatError: error => {
    logger.error(error);
    return new GraphQLError(error.message, null, null, null, null, error);
  }
});

const port = process.env.PORT || 4000;

server.applyMiddleware({ app }); // app is from an existing express app

app.listen({ port }, () =>
  logger.info(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  )
);
