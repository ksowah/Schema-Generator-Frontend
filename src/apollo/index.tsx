"use client"

import {
    ApolloClient,
    ApolloProvider as Provider,
    InMemoryCache
  } from "@apollo/client";
  import type { FC, PropsWithChildren } from "react";
  import link from "./link";
import config from "@/config";
  
  export const client = new ApolloClient({
    link,
    name: config.apollo.name,
    version: config.apollo.version,
    headers: {
      'client-name': config.apollo.name,
      'client-version': config.apollo.version,
    },
    cache: new InMemoryCache({
      addTypename: true,
      resultCaching: true,
      possibleTypes: {
      },
      typePolicies: {
        Query: {
          fields: {
            // Add other policies here
            // entities: entitiesPolicy,
          }
        },
      }
    }),
    connectToDevTools: config.env === "development"
  });
  
  const ApolloProvider: FC<PropsWithChildren> = ({children}) => {
  
    return (
      <Provider client={client}>
        {children}
      </Provider>
    )
  }
  
  export default ApolloProvider