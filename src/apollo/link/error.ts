import { onError } from "@apollo/client/link/error";
import { toast } from "react-toastify";

const errorMiddleware = onError((errors) => {
  if (errors.graphQLErrors)
    errors.graphQLErrors.forEach(
      ({ message }) => {
        toast.error(JSON.stringify({ type: "error", title: message }));
      }
    );

  if (errors.networkError) {
    console.log(
      JSON.stringify({
        type: "error",
        title: "Network Error",
        description: errors.networkError.message,
      })
    );
  }
})

export default errorMiddleware;
