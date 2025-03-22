import { RetryLink } from "@apollo/client/link/retry";

const retryMiddleware = new RetryLink({
  delay: {
    initial: 300,
    max: Infinity,
    jitter: true
  },
  attempts: {
    max: 3,
    retryIf: (error, _operation) => !!error
  }
})

export default retryMiddleware;