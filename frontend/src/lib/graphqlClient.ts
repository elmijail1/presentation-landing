import { GraphQLClient } from "graphql-request";

const graphqlUrl = import.meta.env.VITE_GRAPHQL_URL;
if (!graphqlUrl) {
  throw new Error("VITE_GRAPHQL_URL is not set");
}
export const graphqlClient = new GraphQLClient(graphqlUrl);
