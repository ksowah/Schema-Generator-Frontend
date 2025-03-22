import config from "@/config";
import { clearAuth, currentTokenVar } from "@/worker/auth";
import { ApolloLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const authMiddleware = new ApolloLink((operation, forward) => {
  // check if token has been cached
  const authorization = currentTokenVar();
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      ...(authorization ? { authorization: authorization } : {}),
      "koshe-client": config.apollo.name,
    },
  }));

  return forward(operation);
});

const resetAuthMiddleware = onError(({ networkError }) => {
  if (networkError) {
    if (networkError.name === "ServerError") {
      (networkError as any)?.result?.errors?.forEach(
        (error: { extensions: { code: string } }) => {
          if (error?.extensions?.code === "UNAUTHENTICATED") {
            clearAuth();
            return;
          }
        }
      );
    }
  }
});

export default authMiddleware.concat(resetAuthMiddleware);
