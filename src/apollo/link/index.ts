import { from, HttpLink } from "@apollo/client";
import activityMiddleware from "./activity";
import analyticsMiddleware from "./analytics";
import authMiddleware from "./auth";
import errorMiddleware from "./error";
import retryMiddleware from "./retry";
import config from "@/config";

const httpLink = new HttpLink({ uri: config.apollo.uri });

const link = from([
  authMiddleware,
  activityMiddleware,
  analyticsMiddleware,
  errorMiddleware,
  retryMiddleware,
  httpLink,
]);

export default link;
